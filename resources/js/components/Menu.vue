<template>

    <div class="flex h-full whitespace-nowrap" v-click-outside="onClickOutside"
         :class="{
            'min-h-[calc(100vh-50px)]': isMobile,
            'lg:flex hidden min-h-[calc(100vh-56px)]': isDesktop
         }">

        <div ref="viewport"
             :class="{ 'overflow-hidden': isMobile, 'border-r border-gray-200 dark:border-gray-700': isDesktop }"
             class="bg-white dark:bg-gray-800 p-2 flex flex-col justify-between items-center">

            <div ref="content" class="space-y-1 border-red-2"
                 :class="{ 'pointer-events-none': isDragging && isMobile }">

                <div v-for="menu of menus">

                    <button
                        class="hover:bg-gray-200 dark:hover:bg-gray-700 rounded w-[40px] h-[40px] flex justify-center items-center cursor-pointer"
                        :class="{
                            'text-primary-500': hasActiveMenu(menu),
                            'bg-gray-100 dark:bg-gray-900': menu === currentActiveMenu
                        }"
                        v-tooltip="menu.name"
                        @click="setActiveMenu(menu)">

                        <SvgIcon :name="menu.icon"/>

                    </button>

                </div>

            </div>

            <div ref="fixedMenu"
                 v-if="hasLowerMenu"
                 :class="{ 'fixed': isMobile, 'sticky': isDesktop }"
                 class="bottom-0 bg-white dark:bg-gray-800">

                <div class="pb-2 flex flex-col justify-center items-center pt-4 mt-4 space-y-2">

                    <div class="bg-gradient-to-t from-white dark:from-gray-800 to-transparent absolute -top-10 h-10 w-full pointer-events-none"/>

                    <component :is="NotificationCenter" v-if="config.move_notification_center && notificationCenterEnabled"/>
                    <component :is="ThemeDropdown" v-if="config.move_theme_switcher && themeSwitcherEnabled"/>

                    <hr v-if="config.move_user_menu && (themeSwitcherEnabled || notificationCenterEnabled)"
                        class="border-gray-200 dark:border-gray-700 w-full"
                        style="margin: 10px 0"/>

                    <UserMenu v-if="config.move_user_menu"/>

                </div>

            </div>

        </div>

        <div ref="viewportPanel"
             :style="{ height: viewportSidePanelHeight }"
             class="bg-[rgba(var(--colors-gray-50))] dark:bg-[rgba(var(--colors-gray-900),.65)] lg:dark:bg-[rgba(var(--colors-gray-500),.05)] transition-width duration-300 flex overflow-x-hidden relative"
             :class="{
                'w-[320px] border-r border-gray-200 dark:border-gray-700': isDesktop && mainMenuShown,
                'w-full dark:border-r dark:border-gray-700 overflow-y-hidden border-l': isMobile && mainMenuShown,
                'w-[0px] border-transparent': !mainMenuShown,
             }">

            <FadeTransition>

                <div ref="panel" class="flex flex-col w-full px-2 py-2" :class="{ 'pointer-events-none': isDragging }">

                    <template v-if="currentActiveMenu">

                        <div v-if="config.section_title"
                             class="px-3 py-1 text-primary-500 text-lg font-bold border-b border-gray-200 dark:border-gray-700 flex items-center justify-between mb-1">

                            <div class="flex space-x-2">
                                {{ currentActiveMenu.name }}
                            </div>

                            <div v-if="isDesktop">
                                <CollapseButton :show="currentActiveMenu" @click="collapseMenu"/>
                            </div>

                        </div>

                        <div v-for="item of activeMenuItems">
                            <component :key="item.key" :is="item.component" :item="item"/>
                        </div>

                    </template>

                </div>

            </FadeTransition>

        </div>

    </div>

</template>

<script>

    import CollapseButton from './CollapseButton.vue'
    import MenuItem from './MenuItem.vue'
    import MenuGroup from './MenuGroup.vue'
    import SectionHeader from './SectionHeader.vue'
    import UserMenu from '../native/UserMenu.vue'
    import SvgIcon from './SvgIcon.vue'
    import MenuSection from './MenuSection.vue'
    import cloneDeep from 'lodash/cloneDeep'
    import ScrollBooster from 'scrollbooster'
    import ClickOutside from '../lib/ClickOutsideDirective.js'
    import MenuMixin from '../mixins/MenuMixin.js'

    export default {
        props: [ 'screen', 'NotificationCenter', 'ThemeDropdown' ],
        emits: [ 'actionExecuted' ],
        mixins: [ MenuMixin ],
        components: { CollapseButton, SvgIcon, UserMenu, MenuItem, MenuGroup, SectionHeader, MenuSection },
        directives: { ClickOutside },
        data() {
            return {
                isDragging: false,
                sidebarScrollBooster: null,
                sidePanelScrollBooster: null,
                viewportSidebarHeight: 'auto',
                viewportSidePanelHeight: 'auto',
                currentActiveMenu: null,
                currentActiveSection: null,
            }
        },
        created() {

            this.restoreFromLocalStorage()
            this.currentActiveMenu = this.currentActiveMenu ?? this.storeActiveMenu

            if (this.isDesktop && this.config.collapse_on_refresh) {
                this.collapseMenu()
            }

            /**
             * if there is a path and no items we don't open the panel on page load
             */
            if (this.currentActiveMenu?.path !== '' && this.currentActiveMenu?.items?.length === 0) {
                this.currentActiveMenu = null
            }

        },
        unmounted() {
            this.saveToLocalStorage()
        },
        watch: {
            '$store.getters.mainMenuShown': {
                immediate: true,
                handler(isMainMenuShown) {

                    if (!this.isMobile) {
                        return
                    }

                    if (isMainMenuShown) {

                        this.$nextTick(() => {

                            const offset = 40 + 25
                            const { height } = this.$refs.fixedMenu.getBoundingClientRect()

                            this.viewportSidebarHeight = `${ window.innerHeight - height - offset }px`
                            this.viewportSidePanelHeight = `${ window.innerHeight - 40 - 10 }px`

                            if (this.$refs.content?.childNodes.length) {

                                this.sidebarScrollBooster = new ScrollBooster({
                                    viewport: this.$refs.viewport,
                                    content: this.$refs.content,
                                    scrollMode: 'transform',
                                    direction: 'vertical',
                                    lockScrollOnDragDirection: 'all',
                                    onUpdate: state => this.isDragging = state.isDragging,
                                })

                            }

                            if (this.$refs.panel?.childNodes.length) {

                                this.sidePanelScrollBooster = new ScrollBooster({
                                    viewport: this.$refs.viewportPanel,
                                    content: this.$refs.panel,
                                    scrollMode: 'transform',
                                    direction: 'vertical',
                                    lockScrollOnDragDirection: 'all',
                                    onUpdate: state => this.isDragging = state.isDragging,
                                })

                            }

                        })

                    } else {

                        this.sidebarScrollBooster?.destroy()
                        this.sidePanelScrollBooster?.destroy()
                        this.sidebarScrollBooster = null
                        this.sidePanelScrollBooster = null

                    }

                },
            },
        },
        computed: {
            isMobile() {
                return this.screen === 'responsive'
            },
            isDesktop() {
                return this.screen === 'desktop'
            },
            hasLowerMenu() {

                if (this.config.move_user_menu || this.config.move_notification_center || this.config.move_theme_switcher) {
                    return true
                }

                return this.themeSwitcherEnabled || this.notificationCenterEnabled

            },
            storeActiveMenu() {
                return this.recursiveFind(this.menus)
            },
            isEmptyMenu() {
                return !this.currentActiveMenu
            },
            menus() {

                /**
                 * For whatever reason, laravel nova sometimes returns some menu items with null items within...
                 * so this filter them out to avoid the panel expanding blank
                 */
                const menus = cloneDeep(this.$store.getters[ 'mainMenu' ])

                for (const menu of menus) {

                    if (menu.items.length) {
                        menu.items = menu.items.filter(item => item.component !== null)
                    }

                }

                return menus

            },
            notificationCenterEnabled() {
                return Nova.config('notificationCenterEnabled')
            },
            themeSwitcherEnabled() {
                return Nova.config('themeSwitcherEnabled')
            },
            activeMenuItems() {

                const menu = this.currentActiveMenu?.key !== this.storeActiveMenu?.key ? this.currentActiveMenu : this.storeActiveMenu

                if (!this.config.section_title) {

                    const groups = {
                        name: menu.name,
                        key: menu.key,
                        component: 'menu-group',
                        items: [],
                    }

                    const items = menu.items
                        .map(item => item.component === 'menu-item' ? groups.items.push(item) : item)
                        .filter(Boolean)

                    if (groups.items.length) {
                        return items.concat(groups)
                    }

                    return items

                }

                return menu.items.filter(Boolean)

            },
        },
        methods: {
            recursiveFind(menus) {

                if (menus.active === true) {
                    return menus
                }

                if (Array.isArray(menus)) {

                    for (const item of menus) {

                        const isActive = this.recursiveFind(item)

                        if (isActive) {
                            return item
                        }

                    }

                }

                if (menus.items) {
                    return this.recursiveFind(menus.items)
                }

            },
            hasActiveMenu(menu) {
                return menu.key === this.currentActiveSection?.key
            },
            setActiveMenu(menu) {

                this.currentActiveSection = menu

                if (menu.items.length === 0 && menu.path) {

                    this.collapseMenu()
                    this.currentActiveMenu = null

                    Nova.visit(menu.path.replace(new RegExp(`^${ Nova.config('base') }`), ''))

                } else if (this.currentActiveMenu?.key === menu?.key) {

                    this.toggleMainMenu()

                } else {

                    this.openMenu()
                    this.currentActiveMenu = menu

                }

                this.saveToLocalStorage()

            },
        },
    }

</script>

<style lang="scss">

    #nova > div > header {
        @apply border-b border-gray-200;
    }

    .dark #nova > div > header {
        @apply border-b border-gray-700;
    }

    div[dusk="notifications-backdrop"] {
        opacity: 0.25;
    }

    #nova {

        div[dusk="global-search-component"].handle-global-search-component {

            max-width: 100%;

            ~ div {
                padding: 0;
                margin: 0;
            }

        }

        @screen lg {

            div[dusk="content"] {
                display: flex;
            }

            div[dusk="content"] > div:first-child {
                position: relative;
            }

            div[dusk="content"] > div:last-child {
                margin-left: 0;
                flex: 1;
                width: 0;
            }

            div[dusk="global-search-component"].handle-global-search-component {

                @apply max-w-xs;

                margin-left: auto;

                ~ div {
                    padding: 0;
                    margin: 0;
                }

            }

        }

        & > div:nth-child(1) > div > div > div.bg-white.dark\:bg-gray-800.relative.flex-1.flex.flex-col.max-w-xxs.w-full {
            max-width: calc(100% - 56px);
        }

    }

    #collapsible-resource-manager-desktop {

        ~ div {
            border-top-left-radius: 0;
        }

    }

</style>
