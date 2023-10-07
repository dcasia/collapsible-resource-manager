import Menu from './components/Menu.vue'
import Noop from './components/Noop.vue'
import { createVNode, render, nextTick } from 'vue'

Nova.booting(app => {

    const components = {
        NotificationCenter: null,
        UserMenu: null,
        ThemeDropdown: null,
        MainMenu: null,
    }

    const componentFn = app.component

    app.component = function (name, component) {

        /**
         * Here we grab these components to render later into a different place
         */
        if ([ 'NotificationCenter', 'UserMenu', 'ThemeDropdown', 'MainMenu' ].includes(name)) {

            components[ name ] = component

            return componentFn.call(this, name, Noop)

        }

        return componentFn.call(this, name, component)

    }

    app.mixin({
        async mounted() {

            if (this._.type?.name === 'Noop') {

                const screen = this._.attrs[ 'data-screen' ]

                if (screen === undefined) {
                    return
                }

                let count = 10

                /**
                 * Make sure we are running this code in the last tick
                 */
                while (count--) {
                    await nextTick()
                }

                const container = document.createElement('div')
                container.id = `collapsible-resource-manager-${ screen }`

                let target = null

                if (screen === 'desktop') {
                    target = '#nova div[data-testid="content"] > div:first-child'
                }

                if (screen === 'responsive') {
                    target = '#nova div[dusk="sidebar-menu"][data-screen="responsive"]'
                }

                let element = document.querySelector(target)

                if (element) {

                    element.replaceWith(container)

                    const vnode = createVNode(Menu, { screen, ...components })
                    vnode.appContext = app._context

                    render(vnode, container)

                }

            }

        },
    })

})
