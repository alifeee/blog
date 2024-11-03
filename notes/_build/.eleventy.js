import handlebars from "handlebars";
import handlebarsPlugin from "@11ty/eleventy-plugin-handlebars";
import { EleventyHtmlBasePlugin } from "@11ty/eleventy";
import markdownIt from "markdown-it";
import markdownItAnchor from "markdown-it-anchor";

export default function (eleventyConfig) {
  eleventyConfig.setInputDirectory("..");
  eleventyConfig.ignores.add("../_build/node_modules");
  eleventyConfig.ignores.add("../_build/_site");
  eleventyConfig.watchIgnores.add("../_build/node_modules");
  eleventyConfig.watchIgnores.add("../_build/_site");

  eleventyConfig.ignores.add("../README.md");

  let copy_to;
  if (process.env.ELEVENTY_RUN_MODE == "build") {
    eleventyConfig.setOutputDirectory("..");
    copy_to = "/";
  } else {
    copy_to = "/";
    eleventyConfig.addPassthroughCopy({ "../*.md": copy_to });
  }

  eleventyConfig.addPassthroughCopy({ "../../*.css": copy_to });
  eleventyConfig.addPassthroughCopy({ "../../*.js": copy_to });
  eleventyConfig.addPassthroughCopy({ "./*.xsl": copy_to });

  const markdownLib = markdownIt({ html: true }).use(markdownItAnchor);
  eleventyConfig.setLibrary("md", markdownLib);

  eleventyConfig.addPlugin(EleventyHtmlBasePlugin);
  eleventyConfig.addPlugin(handlebarsPlugin, {
    // Override the `ejs` library instance
    eleventyLibraryOverride: handlebars,
  });

  // get h1 from markdown, i.e., find "# this is a title"
  // adapted from https://lewisdale.dev/post/detecting-markdown-titles-with-eleventy/
  eleventyConfig.addFilter("mdtitle", (raw_md) => {
    if (!raw_md) {
      raw_md = "";
    }
    const withoutFrontMatter = raw_md.replace(/^---[^]*---/, "");
    const title = withoutFrontMatter.match(/^#{1}\s(.+)/);
    return title ? title[1] : "No title detected :sad:";
  });

  eleventyConfig.addFilter("relpath", (abs_path) => {
    if (!abs_path) {
      abs_path = "";
    }
    return abs_path.replace("../", "") || abs_path;
  });

  eleventyConfig.addFilter("fmt_date", (dateObj) => {
    let date = new Date(dateObj);
    return `${date.getUTCFullYear()}-${("0" + date.getUTCMonth()).slice(-2)}-${(
      "0" + date.getUTCDate()
    ).slice(-2)}`;
  });
  // current date for rss feed
  eleventyConfig.addFilter("getNowDate", () => {
    let date = new Date();
    date.setHours(0, 0, 0, 0);
    return date.toISOString();
  });
  eleventyConfig.addFilter("isoDate", (dateObj) => {
    let date = new Date(dateObj);
    return date.toISOString();
  });

  // this is, er, a very strange way of doing this
  // it takes HTML input and increases all headings (h2 -> h3)
  // I want to do this to the markdown but I don't know how to
  //   make something that affects the markdown before it is
  //   rendered by markdown-it
  // this only works properly so long as the HTML from marked-it
  //   is pretty standard, i.e, headings are at the start and
  //   end of lines
  eleventyConfig.addFilter("increase_headings", (content) => {
    if (!content) {
      return content;
    }
    // match e.g., "<h3 ..." at the start of a line
    const r1 = (hl) => new RegExp(`\n<${hl}`, "g");
    const l1 = (hl) => `\n<${hl}`;
    // match e.g., "... </h3>" at the end of a line
    const r2 = (hl) => new RegExp(`<\/${hl}>\n`, "g");
    const l2 = (hl) => `</${hl}>\n`;

    // increase headings 5>6, 4>5, 3>4, 2>3 (order matters)
    for (let hl = 5; hl > 1; hl--) {
      let this_hl = "h" + hl;
      let upper_hl = "h" + (hl + 1);
      content = content.replaceAll(r1(this_hl), l1(upper_hl));
      content = content.replaceAll(r2(this_hl), l2(upper_hl));
    }
    return content;
  });

  eleventyConfig.addFilter("reverse_collections", (collections) => {
    return collections.toSorted((c) => -c.date);
  });
  eleventyConfig.addFilter("eq", (item1, item2) => {
    return item1 == item2;
  });
  eleventyConfig.addFilter("neq", (item1, item2) => {
    return item1 != item2;
  });
  eleventyConfig.addFilter("objget", (obj, key) => {
    return obj[key];
  });
  eleventyConfig.addFilter("length", (array) => {
    return array.length;
  });
  eleventyConfig.addFilter("add", (n1, n2) => {
    return n1 + n2;
  });
  eleventyConfig.addFilter("unperma_all", (tag) => {
    if (tag == "all") {
      return "/";
    } else {
      return "/" + tag + "/";
    }
  });
  eleventyConfig.addFilter("getdatatitle", (item) => {
    return item?.data?.title;
  });
}

export const config = {
  pathPrefix: process.env.ELEVENTY_RUN_MODE == "build" ? "/notes/" : "/",
  // pathPrefix: "test",
};
