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
}

export const config = {
  pathPrefix: process.env.ELEVENTY_RUN_MODE == "build" ? "/notes/" : "/",
};
