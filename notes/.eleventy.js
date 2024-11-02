import handlebarsPlugin from "@11ty/eleventy-plugin-handlebars";
import { EleventyHtmlBasePlugin } from "@11ty/eleventy";

export default function (eleventyConfig) {
  if (process.env.ELEVENTY_RUN_MODE != "build") {
    eleventyConfig.addPassthroughCopy({ "../picnic.css": "/" });
  } else if (process.env.ELEVENTY_RUN_MODE == "build") {
    eleventyConfig.setInputDirectory(".");
    eleventyConfig.setOutputDirectory(".");
  }

  eleventyConfig.addPlugin(EleventyHtmlBasePlugin);
  eleventyConfig.addPlugin(handlebarsPlugin);
}

export const config = {
  pathPrefix: process.env.ELEVENTY_RUN_MODE == "build" ? "/notes/" : "/",
};
