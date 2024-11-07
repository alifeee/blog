import slugify from "./_build/node_modules/@sindresorhus/slugify/index.js";

console.log(slugify)

export default {
  // set layout for all notes to single
  layout: "single",
  // set permalinks of notes to remove spaces from filenames
  eleventyComputed: {
    permalink: (data) => {
      // eleventyComputed gets called twice, the first time with no data, so we skip it
      if (!data) {
        return undefined;
      }
      // do not replace alread-set permalinks
      if (data?.permalink) {
        return data?.permalink;
      }
      // otherwise, make permalink be slug of title
      //   to match anchor hash link
      return "/" + slugify(data.title) + "/"
    },
  },
};
