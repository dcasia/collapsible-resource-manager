import { mapState, mapMutations } from 'vuex'

export default {
    computed: {
        ...mapState([ 'mainMenuShown' ]),
        config() {
            return Nova.config('collapsible_resource_manager')
        },
    },
    methods: {
        ...mapMutations([ 'toggleMainMenu' ]),
        restoreFromLocalStorage() {
            const storage = JSON.parse(sessionStorage.getItem('nova.collapsibleResourceManager')) || {}

            this.currentActiveMenu = storage.currentActiveMenu
            this.currentActiveSection = storage.currentActiveSection

            if (this.isDesktop) {
                this.$store.state.mainMenuShown = storage.mainMenuShown
            }
        },
        saveToLocalStorage() {
            const data = {
                currentActiveMenu: this.currentActiveMenu,
                currentActiveSection: this.currentActiveSection,
                mainMenuShown: this.$store.state.mainMenuShown,
            }

            sessionStorage.setItem('nova.collapsibleResourceManager', JSON.stringify(data))
        },
        collapseMenu() {
            this.$store.state.mainMenuShown = false
        },
        openMenu() {
            this.$store.state.mainMenuShown = true
        },
        onClickOutside() {
            if (this.config.auto_collapse_desktop_menu && this.currentActiveMenu && this.isDesktop) {
                this.collapseMenu()
            }
        },
    },
}
