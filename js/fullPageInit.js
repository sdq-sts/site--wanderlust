import 'fullPage.js'
/* global $ */

function removeClassFromArrayEls (arr, cl) {
  arr.map(el => { el.classList.contains(cl) ? el.classList.remove(cl) : false })
}

export default () => {
  const sectionTitles = Array.from(document.querySelectorAll('.section-title'))
  const sectionWikis = Array.from(document.querySelectorAll('.wiki-box'))
  let countryIndex
  let wikiBoxIndex

  const fullPageConfig = {
    menu: '#menu',
    anchors: ['home', 'atacama', 'iceland', 'japan'],
    animateAnchors: true,
    navigation: false,
    showActiveTooltip: false,
    dragAndMove: true,
    onLeave: (index, nextIndex, direction) => {
      removeClassFromArrayEls(sectionTitles, 'section-title--show')
      removeClassFromArrayEls(sectionWikis, 'wiki-box--show')

      switch (direction) {
        case 'up':
          addClasses(index, 3)
          break

        case 'down':
          addClasses(index, 1)
          break
      }
    },

    afterLoad: (anchorLink, index) => { addClasses(index, 2) }
  }

  function addClasses(index, n) {
    countryIndex = sectionTitles[index - n]
    wikiBoxIndex = sectionWikis[index - n]

    if (countryIndex !== undefined &&  wikiBoxIndex !== undefined) {
      countryIndex.classList.add('section-title--show')
      wikiBoxIndex.classList.add('wiki-box--show')
    }
  }

  $('#fullpage').fullpage(fullPageConfig)
}
