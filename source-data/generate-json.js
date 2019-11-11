var fs = require("fs"),
  path = require("path"),
  allCountries = path.join(__dirname, "all-countries.json"),
  euCountries = path.join(__dirname, "eu.json"),
  commonwealthCountries = path.join(__dirname, "commonwealth.json")

function dynamicSort(property) {
  var sortOrder = 1

  if (property[0] === "-") {
    sortOrder = -1
    property = property.substr(1)
  }

  return function(a, b) {
    if (sortOrder == -1) {
      return b[property].localeCompare(a[property])
    } else {
      return a[property].localeCompare(b[property])
    }
  }
}

fs.readFile(allCountries, { encoding: "utf-8" }, function(err, data) {
  //console.log("received data: " + data)
  let all = JSON.parse(data)
  fs.readFile(
    euCountries,
    {
      encoding: "utf-8"
    },
    function(err, data) {
      let eu = JSON.parse(data)
      fs.readFile(
        commonwealthCountries,
        {
          encoding: "utf-8"
        },
        function(err, data) {
          let cw = JSON.parse(data)
          handleCountries(all, eu, cw)
        }
      )
    }
  )
})

function handleCountries(all, eu, cw) {
  let countries = []
  let sortableCountries = new Array()

  console.log(typeof sortableCountries)
  for (let i = 0; i < all.length; i++) {
    sortableCountries.push(all[i])
  }
  let finishedCountries = new Array()
  console.log(finishedCountries.sort())
  for (let i = 0; i < all.length; i++) {
    let country = {
      name: all[i].name.common,
      code: all[i].cca3,
      flag: `${all[i].cca3.toLowerCase()}.svg`,
      cw: cw.includes(all[i].name.common) ? true : false,
      eu: eu.includes(all[i].name.common) ? true : false
    }

    finishedCountries.push(country)
  }

  finishedCountries.sort(dynamicSort("name"))

  fs.writeFile(
    "countries.json",
    JSON.stringify(finishedCountries),
    handlingFinished
  )
}

function handlingFinished() {
  console.log("finished")
}
