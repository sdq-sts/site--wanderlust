import 'owl.carousel/dist/assets/owl.carousel.css'
import 'owl.carousel'
/* global $ */

export default (country) => {
  let owl = $(`.${country}-carousel`)
  let sectionBackground
  let owlItems
  let currentImg

  owl.owlCarousel({
    items: 1,
    dots: true,
    margin: 100,
    stagePadding: 400,
    responsive: {
      0: {
        stagePadding: 10,
        margin: 10,
        dots: false,
      },

      600: {
        stagePadding: 50
      },

      900: {
        stagePadding: 150
      },

      1100: {
        stagePadding: 200
      },

      1300: {
        stagePadding: 300
      },

      1600: {
        stagePadding: 500
      }
    }
  })

  sectionBackground = document.querySelector(`.${country}-img`)
  owlItems = document.querySelectorAll(`.${country}-section .carousel-img`)
  currentImg = owlItems[0].src
  sectionBackground.style.backgroundImage = `url('${currentImg}')`
  sectionBackground.style.backgroundSize = `cover`

  owl.on('changed.owl.carousel', (e) => {
    sectionBackground.classList.add(`${country}-img--hide`)
    currentImg = owlItems[e.item.index].src
    sectionBackground.style.backgroundSize = 'cover'
  })
  
  sectionBackground.addEventListener('animationend', (e) => {
    if(e.animationName === 'fade-out') {
      sectionBackground.style.backgroundImage = `url('${currentImg}')`
      sectionBackground.classList.remove(`${country}-img--hide`)
      sectionBackground.classList.add(`${country}-img--show`)
    }
  })
}
