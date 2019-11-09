function handleCountrySelection(event) {
  console.log('submitting')
  event.preventDefault();
  event.stopPropagation();
  event.stopImmediatePropagation();
  
  let country = event.target[0].value;
  let finalPath = `/${country}/`
  window.location = finalPath
}

let countrySelectorForm = document.querySelector('#country-selector')
if (countrySelectorForm) {
  countrySelectorForm.addEventListener('submit', handleCountrySelection);
}


let sharer = document.querySelector('.sharer ul')
sharer.style.display = 'none'

function sharePage() {
  let isVisible = sharer.style.display;
  if (isVisible === 'block') {
    sharer.style.display = 'none'
  } else {
    sharer.style.display = 'block'
  }
}