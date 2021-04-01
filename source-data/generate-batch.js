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
          createBatch(all, cw)
        }
      )
    }
  )
})


function createBatch(all, cw) {
  
  let countryList = ''
  for (let i = 0; i < all.length; i++) {
 
    if (cw.includes(all[i].name.common)) {
      countryList += ` https://www.canivote.org.uk/${urlize(all[i].name.common)}`
    }
  }
  

  fs.writeFile(
    "to-debug.txt",
    countryList,
    handlingFinished
  )
}

function handlingFinished() {
  console.log("finished")
}
