# notes

here is my sub-blog for notes, which is effectively the same as my blog but for shorter, less well-written posts.

unlike my blog, which is raw HTML, this uses a static site builder - eleventy - so that I can publish a note from anywhere by dropping a markdown file into the GitHub repository.

## development

develop - website files are placed in `<root>/notes/_build/_site`.

```bash
npm run dev
```

build - website files are placed in `<root>/notes`, as they are then published from there straight to the blog website

```bash
npm run build
```
