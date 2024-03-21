"""Generate similarity embeddings for each blog post and compare them to each other
Then, a "similar.json" file is generated for each blog post, which contains the top 3 most similar blog posts to that blog post.
"""

import os
import json
import re
from typing import Dict, List
from post_parser import get_all_posts, Post

# pip install tiktoken, openai, python-dotenv, numpy
import tiktoken
from openai import OpenAI
from dotenv import load_dotenv
from numpy import dot
from numpy.linalg import norm

CACHE_FOLDER = f"utilities.py{os.sep}cache"
SUGGESTIONS_FNAME = "similar.html"
SUGGEST_N = 3


class Embedding(List[float]):
    """A dataclass to hold an embedding and its associated string."""


def num_tokens_from_string(string: str, encoding_name: str) -> int:
    """Returns the number of tokens in a text string.
    https://platform.openai.com/docs/guides/embeddings/how-can-i-tell-how-many-tokens-a-string-has-before-i-embed-it
    """
    encoding = tiktoken.get_encoding(encoding_name)
    num_tokens = len(encoding.encode(string))
    return num_tokens


def canonicalize(text: str) -> str:
    """filename canonicalizer
    takes only trailing filename
    ./bus-sign/bus-sign.md -> bus_sign.txt
    """
    # takes only trailing filename
    text = os.path.split(text)[-1]
    # remove ".md"
    text = text.replace(".md", "")
    # remove all non-alphanumeric characters
    text = "".join([c for c in text if c.isalnum() or c == " "])
    text = text.replace(" ", "_")
    text = text.lower()
    # add ".txt"
    text += ".txt"
    return text


def get_content_from_md(lines: List[str]) -> str:
    """strips non-content from a markdown file"""
    # ignore lines that begin with "<"
    lines = [line for line in lines if not line.startswith("<")]
    # ignore lines that begin with "^\[.*?\]:"
    lines = [line for line in lines if not re.match(r"^\[.*?\]:", line)]
    text = "".join(lines)
    return text


def generate_embedding(text: str) -> list:
    """generates an embedding of text
    see https://platform.openai.com/docs/guides/embeddings/what-are-embeddings?lang=python
    """
    client = OpenAI()
    response = client.embeddings.create(input=text, model="text-embedding-ada-002")

    return response.data[0].embedding


def cosine_similarity(a: List[float], b: List[float]) -> float:
    """cosine similarity between two vectors
    from https://stackoverflow.com/questions/18424228/cosine-similarity-between-2-number-lists
    """
    return dot(a, b) / (norm(a) * norm(b))


def similarities_from_embeddings(
    embeddings: Dict[str, Embedding],
    query_embedding_label: str,
) -> Dict[str, float]:
    """Return nearest neighbors of a given embedding."""
    if query_embedding_label not in embeddings.keys():
        raise ValueError(f"query_embedding {query_embedding_label} not in embeddings")
    query_embedding = embeddings[query_embedding_label]
    # calculate cosine similarity between query and all other embeddings
    similarities = {}
    for title, embedding in embeddings.items():
        if title == query_embedding_label:
            continue
        similarity = cosine_similarity(query_embedding, embedding)
        similarities[title] = similarity

    return similarities


def load_embedding_from_file(fname: str) -> Embedding:
    """Load an embedding from a file."""
    with open(fname, "r", encoding="utf-8") as file:
        lines = file.read()
    return Embedding(json.loads(lines))


def main():
    """
    for each post
     get embedding
     (if not, generate embedding, save to cache)
     save to object

    for each post
     find most similar other posts
     save top 3 to html file in relative_url
    """
    load_dotenv()
    posts = get_all_posts()

    # generate/load embeddings
    for post in posts:
        cache_fname = os.path.join(CACHE_FOLDER, canonicalize(post.md_url))

        # from cache
        if os.path.exists(cache_fname):
            print("cache hit for ", post.title)
            embedding = load_embedding_from_file(cache_fname)
        # from api
        else:
            print("cache miss for ", post.title)
            with open(post.md_url, "r", encoding="utf-8") as file:
                lines = file.readlines()
            content = get_content_from_md(lines)
            print(
                "num_tokens: ", n_tok := num_tokens_from_string(content, "cl100k_base")
            )
            if n_tok > 8191:
                raise ValueError(
                    f"post {post.md_url} has {n_tok} tokens, which is too many"
                )
            embedding = generate_embedding(content)
            with open(cache_fname, "w", encoding="utf-8") as file:
                file.write(str(embedding))
            print(f"written embedding to {cache_fname}")

        post.embedding = embedding

    print()

    for post in posts:
        print("getting similarities for ", post.title)
        similarities = similarities_from_embeddings(
            {p.title: p.embedding for p in posts}, post.title
        )
        similarities = sorted(similarities.items(), key=lambda x: x[1], reverse=True)
        similarities = similarities[:SUGGEST_N]
        suggestions: List[Post] = []
        for title, _ in similarities:
            # find post with this title
            for p in posts:
                if p.title == title:
                    suggestions.append(p)
                    break

        # write to file
        suggestions_fname = os.path.join(post.relative_url, SUGGESTIONS_FNAME)
        with open(suggestions_fname, "w", encoding="utf-8") as file:
            for p in suggestions:
                html = p.html_with_links_level(1)
                file.write(html + "\n")
        print(f"wrote similarities to {suggestions_fname}")
    print()

    print("done")


if __name__ == "__main__":
    main()
