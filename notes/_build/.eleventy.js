import handlebarsPlugin from "@11ty/eleventy-plugin-handlebars";
import { EleventyHtmlBasePlugin } from "@11ty/eleventy";

export default function (eleventyConfig) {
  eleventyConfig.setInputDirectory("..");
  eleventyConfig.ignores.add("../_build/node_modules");
  eleventyConfig.ignores.add("../_build/_site");
  eleventyConfig.watchIgnores.add("../_build/node_modules");
  eleventyConfig.watchIgnores.add("../_build/_site");

  if (process.env.ELEVENTY_RUN_MODE != "build") {
    eleventyConfig.addPassthroughCopy({ "../../picnic.css": "/" });
  } else if (process.env.ELEVENTY_RUN_MODE == "build") {
    eleventyConfig.setOutputDirectory("..");
  }

  eleventyConfig.addPlugin(EleventyHtmlBasePlugin);
  eleventyConfig.addPlugin(handlebarsPlugin);

  // get h1 from markdown, i.e., find "# this is a title"
  // adapted from https://lewisdale.dev/post/detecting-markdown-titles-with-eleventy/
  eleventyConfig.addFilter("mdtitle", (raw_md) => {
    const withoutFrontMatter = raw_md.replace(/^---[^]*---/, "");
    const title = withoutFrontMatter.match(/^#{1}\s(.+)/);
    return title ? title[1] : "No title detected :sad:";
  });
}

export const config = {
  pathPrefix: process.env.ELEVENTY_RUN_MODE == "build" ? "/notes/" : "/",
};
