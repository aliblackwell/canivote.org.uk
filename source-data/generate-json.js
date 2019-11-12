const map = {},
  chars = [],
  TURKISH_MAP = {
    ş: "s",
    Ş: "S",
    ı: "i",
    İ: "I",
    ç: "c",
    Ç: "C",
    ü: "u",
    Ü: "U",
    ö: "o",
    Ö: "O",
    ğ: "g",
    Ğ: "G"
  }
const removeDiacritics = function(str) {
  for (var c in TURKISH_MAP) {
    if (TURKISH_MAP.hasOwnProperty(c)) {
      map[c] = TURKISH_MAP[c]
    }
  }
  for (var k in map) {
    if (map.hasOwnProperty(k)) {
      chars.push(k)
    }
  }
  var regex = new RegExp(chars.join("|"), "g")
  return str.replace(regex, function(m) {
    return map[m]
  })
}

const urlize = function urlize(value) {
  if (value) {
    var result = removeDiacritics(value)
      .replace(/[^A-Za-z0-9.,_~-]+/g, "-") // disallowed characters
      .replace(/(^-)|(-$)/g, "") // starting or ending dash
      .replace(/[^A-Za-z0-9]+-|-[^A-Za-z0-9]+/g, "-") // repeating dash
      .toLocaleLowerCase()
    return result
  }
}

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
          //handleCountries(all, eu, cw)
          handleCommonwealth(all, cw)
        }
      )
    }
  )
})

function handleCountries(all, eu, cw) {
  let countries = []
  let sortableCountries = new Array()

  for (let i = 0; i < all.length; i++) {
    sortableCountries.push(all[i])
  }
  let finishedCountries = new Array()
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

function handleCommonwealth(all, cw) {
  let countries = []
  let sortableCountries = new Array()

  for (let i = 0; i < all.length; i++) {
    sortableCountries.push(all[i])
  }
  let finishedCountries = new Array()
  for (let i = 0; i < all.length; i++) {
    let country = {
      name: all[i].name.common,
      url: urlize(all[i].name.common)
    }
    if (cw.includes(all[i].name.common)) {
      finishedCountries.push(country)
    }
  }
  finishedCountries.sort(dynamicSort("name"))

  fs.writeFile(
    "cw-with-file-names.json",
    JSON.stringify(finishedCountries),
    handlingFinished
  )
}

function handlingFinished() {
  console.log("finished")
}
