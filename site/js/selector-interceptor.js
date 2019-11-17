function handleCountrySelection(event) {
  console.log("submitting")
  event.preventDefault()
  event.stopPropagation()
  event.stopImmediatePropagation()

  let country = event.target[0].value
  let path = window.location.pathname
  let lastChar = path.charAt(path.length - 1)
  if (lastChar != "/") {
    path = path + '/'
  }
  let finalPath = path + country + '/'

  window.location = finalPath
}

let countrySelectorForm = document.querySelector("#country-selector")
if (countrySelectorForm) {
  countrySelectorForm.addEventListener("submit", handleCountrySelection)
}

let sharer = document.querySelector(".share-section ul")
let translator = document.querySelector(".translate-section ul")
sharer.classList.add("hidden")
translator.classList.add("hidden")

function sharePage() {
  let isVisible = sharer.classList.contains("hidden")
  let links = document.querySelectorAll(".share-link")
  if (isVisible) {
    sharer.setAttribute("aria-hidden", false)

    for (let i = 0; i < links.length; i++) {
      links[i].setAttribute("tabindex", 0)
    }
  } else {
    sharer.setAttribute("aria-hidden", true)
    for (let i = 0; i < links.length; i++) {
      links[i].setAttribute("tabindex", -1)
    }
  }
  sharer.classList.toggle("hidden")
}

function translatePage() {
  let isVisible = translator.classList.contains("hidden")
  let links = document.querySelectorAll(".translate-link")
  if (isVisible) {
    translator.setAttribute("aria-hidden", false)

    for (let i = 0; i < links.length; i++) {
      links[i].setAttribute("tabindex", 0)
    }
  } else {
    translator.setAttribute("aria-hidden", true)
    for (let i = 0; i < links.length; i++) {
      links[i].setAttribute("tabindex", -1)
    }
  }
  translator.classList.toggle("hidden")
}


cssVars();