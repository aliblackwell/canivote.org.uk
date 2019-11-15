function handleCountrySelection(event) {
  console.log("submitting")
  event.preventDefault()
  event.stopPropagation()
  event.stopImmediatePropagation()

  let country = event.target[0].value
  let finalPath = `/${country}/`
  window.location = finalPath
}

let countrySelectorForm = document.querySelector("#country-selector")
if (countrySelectorForm) {
  countrySelectorForm.addEventListener("submit", handleCountrySelection)
}

let sharer = document.querySelector(".sharer ul")
sharer.classList.add("hidden")

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


cssVars({
  include: 'link'
});