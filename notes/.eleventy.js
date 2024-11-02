import handlebarsPlugin from "@11ty/eleventy-plugin-handlebars";

export default function (eleventyConfig) {
  if (process.env.ELEVENTY_RUN_MODE != "build") {
    eleventyConfig.addPassthroughCopy({ "../picnic.css": "/" });
  } else if (process.env.ELEVENTY_RUN_MODE == "build") {
    eleventyConfig.setInputDirectory(".");
    eleventyConfig.setOutputDirectory(".");
  }

  eleventyConfig.addPlugin(handlebarsPlugin);
}
