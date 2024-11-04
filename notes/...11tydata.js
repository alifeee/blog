module.exports = {
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
      // otherwise, make permalink from file slug by replacing spaces with "-"
      fs = "" + data?.page?.fileSlug;
      fs_no_spaces = fs.replaceAll(" ", "-");
      return "/" + fs_no_spaces + "/";
    },
  },
};
