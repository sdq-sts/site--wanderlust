import '../scss/main.scss'
import menuInit from './menuInit'
import fullPageInit from './fullPageInit'
import carouselInit from './carouselInit'
/* global $ */

$(document).ready(function () {
  const countries = ['atacama', 'iceland', 'japan']

  menuInit()
  fullPageInit()

  // Cria os slides para cada país
  countries.map((el) => { carouselInit(el) })
})

window.addEventListener('load', () => {
  const loadingCover = document.querySelector('.loading-cover')
  loadingCover.classList.add('loading-cover--hide')
})
