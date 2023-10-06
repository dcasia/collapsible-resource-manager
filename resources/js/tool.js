import Menu from './components/Menu.vue'
import MockMenu from './components/MockMenu.vue'
import { createVNode, render } from 'vue'

Nova.booting(app => {

    app.component('MainMenu', MockMenu)

    app.mixin({
        mounted() {

            if (this._.type?.__file?.endsWith('MockMenu.vue')) {

                const container = document.createElement('div')
                container.id = 'collapsible-resource-manager'

                const element = document.querySelector('#nova div[data-testid="content"] > div:first-child')

                if (element) {

                    element.replaceWith(container)

                    const vnode = createVNode(Menu)
                    vnode.appContext = app._context

                    render(vnode, container)

                }

            }

        },
    })

})
