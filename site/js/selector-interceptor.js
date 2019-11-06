function handleCountrySelection(event) {
  event.preventDefault();
  let country = event.target[0].value;
  let finalPath = `/${country}/`
  window.location = finalPath
}

let form = document.querySelector('#country-selector')
form.addEventListener('submit', handleCountrySelection);