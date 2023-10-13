<template>

    <div class="flex h-full whitespace-nowrap"
         :class="{
            'min-h-[calc(100vh-66px)]': screen === 'responsive',
            'lg:flex hidden min-h-[calc(100vh-56px)]': screen === 'desktop'
         }">

        <div class="border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-2 flex flex-col justify-between items-center">

            <div class="space-y-1">

                <div v-for="menu of menus">

                    <button
                        class="hover:bg-gray-200 dark:hover:bg-gray-700 rounded w-[40px] h-[40px] flex justify-center items-center cursor-pointer"
                        :class="{
                            'text-primary-500': hasActiveMenu(menu),
                            'bg-gray-100 dark:bg-gray-900': menu === currentActiveMenu
                        }"
                        v-tooltip="menu.name"
                        @click="setActiveMenu(menu)">

                        <SvgIcon :type="menu.icon"/>

                    </button>

                </div>

            </div>

            <div v-if="hasLowerMenu" class="space-y-1 flex flex-col justify-center items-center fixed bottom-2">

                <component :is="NotificationCenter" v-if="config.move_notification_center && notificationCenterEnabled"/>
                <component :is="ThemeDropdown" v-if="config.move_theme_switcher && themeSwitcherEnabled"/>

                <hr v-if="config.move_user_menu && (themeSwitcherEnabled || notificationCenterEnabled)"
                    class="border-gray-200 dark:border-gray-700 w-full" style="margin: 10px 0"/>

                <UserMenu v-if="config.move_user_menu"/>

            </div>

        </div>

        <div class="bg-[rgba(var(--colors-gray-50))] dark:bg-[rgba(var(--colors-gray-500),.05)] transition-width duration-300 flex overflow-x-hidden relative"
            :class="{
                'w-[240px] border-r border-gray-200 dark:border-gray-700': screen === 'desktop' && currentActiveMenu,
                'w-full': screen === 'responsive',
                'w-[0px] border-transparent': currentActiveMenu === null,
             }">

            <FadeTransition>

                <div v-if="currentActiveMenu" class="flex flex-col w-full px-2 py-2">

                    <div v-for="item of activeMenuItems">
                        <component :key="item.key" :is="item.component" :item="item"/>
                    </div>

                </div>

            </FadeTransition>

        </div>

    </div>

</template>

<script>

    import MenuItem from './MenuItem.vue'
    import MenuGroup from './MenuGroup.vue'
    import SectionHeader from './SectionHeader.vue'
    import UserMenu from '../native/UserMenu.vue'
    import SvgIcon from './SvgIcon.vue'
    import MenuSection from './MenuSection.vue'

    export default {
        props: [ 'screen', 'NotificationCenter', 'ThemeDropdown' ],
        emits: [ 'actionExecuted' ],
        components: { SvgIcon, UserMenu, MenuItem, MenuGroup, SectionHeader, MenuSection },
        data() {
            return {
                currentActiveMenu: null,
                open: false,
            }
        },
        async created() {

            this.currentActiveMenu = this.currentActiveMenu ?? this.storeActiveMenu

            /**
             * if there is a path and no items we don't open the panel on page load
             */
            if (this.currentActiveMenu?.path !== '' && this.currentActiveMenu?.items?.length === 0) {
                this.currentActiveMenu = null
            }

        },
        computed: {
            config() {
                return Nova.config('collapsible_resource_manager')
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
            menus() {
                return this.$store.getters[ 'mainMenu' ]
            },
            notificationCenterEnabled() {
                return Nova.config('notificationCenterEnabled')
            },
            themeSwitcherEnabled() {
                return Nova.config('themeSwitcherEnabled')
            },
            activeMenuItems() {

                const menu = this.currentActiveMenu.key !== this.storeActiveMenu?.key ? this.currentActiveMenu : this.storeActiveMenu

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
                return this.recursiveFind(menu)
            },
            setActiveMenu(menu) {

                if (menu.items.length === 0 && menu.path) {

                    Nova.visit(menu.path.replace(new RegExp(`^${ Nova.config('base') }`), ''))

                    this.currentActiveMenu = null

                    return

                }

                if (this.currentActiveMenu === menu) {

                    this.currentActiveMenu = null

                } else {

                    this.currentActiveMenu = menu

                }

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

            div[data-testid="content"] {
                display: flex;
            }

            div[data-testid="content"] > div:first-child {
                position: relative;
            }

            div[data-testid="content"] > div:last-child {
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
