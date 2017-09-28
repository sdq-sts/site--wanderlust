export default () => {
  const btn = document.querySelector('.navigation__btn')
  const menu = document.querySelector('.menu')
  const menuList = document.querySelector('.menu__list')
  const menuImage = document.querySelector('.navigation__btn__img')
  const homeSection = document.querySelector('.home-section')

  homeSection.addEventListener('click', (e) => {
    let conditions = ((e.target !== menu) && (e.target !== menuList) && (e.target !== menuImage) && (e.target !== btn) && (menu.classList.contains('menu--show')))

    if (conditions) {
      menu.classList.add('menu--hide')
    }
  })

  btn.addEventListener('click', (e) => {
    if (menu.classList.contains('menu--show')) {
      menu.classList.add('menu--hide')
    } else {
      menu.classList.add('menu--show')
    }
  })

  menu.addEventListener('animationend', (e) => {
    if (e.animationName === 'slide-fade-out') {
      menu.classList.remove('menu--show')
      menu.classList.remove('menu--hide')
    }
  })
}
