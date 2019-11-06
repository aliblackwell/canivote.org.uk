module.exports = function(config) {
  // pass some assets right through
  config.addPassthroughCopy("./site/flags")

  return {
    dir: {
      input: "site",
      output: "dist"
    }
  }
}
