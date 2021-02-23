module.exports = function(config) {
  // pass some assets right through
  config.addPassthroughCopy("./site/_redirects")
  return {
    dir: {
      input: "site",
      output: "dist"
    }
  }
}
