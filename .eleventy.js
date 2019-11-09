module.exports = function(config) {
  // pass some assets right through
  config.addPassthroughCopy("./site/flags")
  config.addPassthroughCopy("./site/css")
  config.addPassthroughCopy("./site/img")
  config.addPassthroughCopy("./site/js")
  config.addPassthroughCopy("./site/_redirects")

  config.addFilter("alphabeticize", function(value) {
    value.sort(function(a, b) {
      var textA = a.name.common.toUpperCase()
      var textB = b.name.common.toUpperCase()
      return textA < textB ? -1 : textA > textB ? 1 : 0
    })
    return value
  })

  return {
    dir: {
      input: "site",
      output: "dist"
    }
  }
}
