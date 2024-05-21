import Menu from './components/Menu.vue'
import Noop from './components/Noop.vue'
import { createVNode, render, nextTick } from 'vue'

function getNovaVersion() {
    const [ version ] = Nova.config('version').replaceAll('.', '').trim().match(/^\d+/)
    return parseFloat(version.length < 5 ? version.padEnd(5, 0) : version)
}

const version = getNovaVersion()
const config = Nova.config('collapsible_resource_manager')

const settings = {
    UserMenu: config.move_user_menu,
    NotificationCenter: config.move_notification_center,
    ThemeDropdown: config.move_theme_switcher,
}

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

            for (const key in settings) {

                if (key === name && settings[ key ] === false) {
                    return componentFn.call(this, name, component)
                }

            }

            components[ name ] = component

            return componentFn.call(this, name, Noop)

        }

        return componentFn.call(this, name, component)

    }

    app.mixin({
        data() {
            return {
                toDestroy: [],
            }
        },
        async mounted() {

            if (this._.type?.__file?.endsWith('GlobalSearch.vue')) {

                if (settings.UserMenu && settings.NotificationCenter && settings.ThemeDropdown) {
                    this._.vnode.el.classList.add('handle-global-search-component')
                }
            }

            /*
            if (this._.type?.__file?.endsWith('AppLogo.vue')) {
                const element = this._.vnode.el.parentElement.parentElement;
                const container = document.createElement('div')
                container.className = 'hidden md:inline'
                container.id = `collapsible-resource-manager-collapse-button`

                element.insertAdjacentElement('afterend', container)
                this.toDestroy.push(container)
            }
            */

            if (this._.type?.name === 'Noop') {

                const screen = this._.attrs[ 'data-screen' ]
                const mobile = this._.attrs[ 'mobile' ]

                if (mobile) {
                    this._.vnode.el?.parentElement?.classList?.add('hidden')
                }

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

                let element = null

                if (screen === 'desktop') {
                    element = document.querySelector('#nova div[dusk="content"] > div:first-child')
                }

                if (screen === 'responsive') {

                    if (version <= 42713) {
                        element = this._.vnode.el
                    } else {
                        element = this._.vnode.el.parentElement.parentElement
                    }

                }

                if (element) {

                    element.replaceWith(container)

                    const vnode = createVNode(Menu, { screen, ...components })
                    vnode.appContext = app._context

                    render(vnode, container)
                    this.toDestroy.push(container)

                }

            }

        },
        unmounted() {

            for (const element of this.toDestroy) {
                render(null, element)
            }

        },
    })

})
