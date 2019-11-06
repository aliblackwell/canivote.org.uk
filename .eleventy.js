module.exports = function(config) {
  // pass some assets right through
  config.addPassthroughCopy("./site/flags")
  config.addPassthroughCopy("./site/css")

  return {
    dir: {
      input: "site",
      output: "dist"
    }
  }
}
