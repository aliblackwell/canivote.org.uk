module.exports = function(config) {
  // pass some assets right through
  config.addPassthroughCopy("./site/flags")
  config.addPassthroughCopy("./site/css")
  config.addPassthroughCopy("./site/js")
  config.addPassthroughCopy("./site/_redirects")

  return {
    dir: {
      input: "site",
      output: "dist"
    }
  }
}
