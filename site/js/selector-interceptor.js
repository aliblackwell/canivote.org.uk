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

  sharer.classList.toggle("hidden")
}
