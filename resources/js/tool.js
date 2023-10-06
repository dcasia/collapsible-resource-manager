import Menu from './components/Menu.vue'
import MockMenu from './components/MockMenu.vue'
import { createVNode, render, nextTick } from 'vue'

Nova.booting(app => {

    // app.component('MainMenu', MockMenu)
    app.component('NotificationCenter', MockMenu)
    app.component('ThemeDropdown', MockMenu)
    app.component('UserMenu', MockMenu)

    app.mixin({
        async mounted() {

            if (this._.type?.__file?.endsWith('MainMenu.vue')) {

                let count = 10

                /**
                 * Make sure we are running this code in the last tick
                 */
                while (count--) {
                    await nextTick()
                }

                let target = null
                let screen = this._.attrs[ 'data-screen' ]

                const container = document.createElement('div')
                container.id = `collapsible-resource-manager-${ screen }`

                if (screen === 'desktop') {
                    target = '#nova div[data-testid="content"] > div:first-child'
                }

                if (screen === 'responsive') {
                    target = '#nova div[dusk="sidebar-menu"][data-screen="responsive"]'
                }

                let element = document.querySelector(target)

                if (element) {

                    element.replaceWith(container)

                    const vnode = createVNode(Menu, { screen })
                    vnode.appContext = app._context

                    render(vnode, container)

                }

            }

        },
    })

})
