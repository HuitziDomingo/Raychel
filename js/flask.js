document.addEventListener('DOMContentLoaded', function () {
    {
        class Raychel {

            constructor() {
                //Definicion de propiedades y metodos globales
            }

            static statesChange(args) {
                args.button = document.querySelector(args.button)
                args.cont = document.querySelector(args.cont)
                args.button.addEventListener('click', () => {
                    if (args.cont.getAttribute('data-state') == 'reveal') {
                        args.cont.setAttribute('data-state', 'hidden')
                        if (args.close) args.close()
                    } else {
                        args.cont.setAttribute('data-state', 'reveal')
                        if (args.open) args.open()
                    }
                })
            }
            static changeColor(args) {
                args.buttonColor = document.querySelectorAll(args.buttonColor)
                args.first = document.querySelectorAll(args.first)
                args.second = document.querySelectorAll(args.second)
                args.buttonColor.forEach((elements) => {
                    elements.addEventListener('click', () => {
                        //Obtener Propiedad CSS
                        let n = window.getComputedStyle(elements)
                        let backgroundImg = n.getPropertyValue('background-image')

                        if (args.first)
                            args.first.forEach((i) => i.style.background = backgroundImg)

                        if (args.second)
                            args.second.forEach((i) => i.style.background = backgroundImg)
                    })
                })
            }
        }
        //Colores del Menu
        Raychel.changeColor({
            first: '.navigation',
            second: '.navigation li',
            buttonColor: '.colorform',
        })
        //Colores Bars
        Raychel.changeColor({
            first: '.header-board',
            second: '.header',
            buttonColor: '.C__colorform',
        })

        //Abrir y cerrar panel de colores
        var b = document.querySelector('#__button_colorsfull')
        Raychel.statesChange({
            button: '#__button_colorsfull',
            cont: '#__cont__colorsfull',
            open: () => {
                b.setAttribute('data-state', 'move')
            },
            close: () => {
                setTimeout(() => { b.removeAttribute('data-state', 'move') }, 100)
            },
        })


       

    }
})