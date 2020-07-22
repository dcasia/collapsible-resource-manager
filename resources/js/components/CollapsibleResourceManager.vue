<template>

    <div v-if="!isEmpty || data.linkTo" :class="[ data.type, { 'mb-8': isTopLevel } ]">

        <component v-if="data.label && isTopLevel" v-bind="topLevelLink"
                   @click="topExpanded = !topExpanded"
                   :class="{'cursor-pointer': isTopCollapsible}"
                   class="flex items-center font-normal text-white mb-6 text-base no-underline relative">

            <div v-if="data.icon" class="sidebar-icon" v-html="data.icon"/>

            <svg v-else class="sidebar-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path fill="var(--sidebar-icon)"
                      d="M3 1h4c1.1045695 0 2 .8954305 2 2v4c0 1.1045695-.8954305 2-2 2H3c-1.1045695 0-2-.8954305-2-2V3c0-1.1045695.8954305-2 2-2zm0 2v4h4V3H3zm10-2h4c1.1045695 0 2 .8954305 2 2v4c0 1.1045695-.8954305 2-2 2h-4c-1.1045695 0-2-.8954305-2-2V3c0-1.1045695.8954305-2 2-2zm0 2v4h4V3h-4zM3 11h4c1.1045695 0 2 .8954305 2 2v4c0 1.1045695-.8954305 2-2 2H3c-1.1045695 0-2-.8954305-2-2v-4c0-1.1045695.8954305-2 2-2zm0 2v4h4v-4H3zm10-2h4c1.1045695 0 2 .8954305 2 2v4c0 1.1045695-.8954305 2-2 2h-4c-1.1045695 0-2-.8954305-2-2v-4c0-1.1045695.8954305-2 2-2zm0 2v4h4v-4h-4z"/>
            </svg>

            <Badge :label="data.badge">
                <span class="text-white sidebar-label">
                    {{ data.label }}
                </span>
            </Badge>

            <collabsabe-indicator :expandend="topExpanded" :visible="isTopCollapsible" style="" />

        </component>

        <ResourceList class="resources-only"
                      v-if="isTopLevel && data.resources.length && topExpanded"
                      :resources="data.resources"
                      :recursive="recursive"
                      :remember-menu-state="rememberMenuState"/>

        <template v-if="isGroup && data.resources.length">

            <h4 class="relative select-none ml-8 mt-4 text-xs text-white-50% uppercase tracking-wide cursor-pointer"
                v-if="data.label"
                @click="toggleGroup(data.id)">

                <collabsabe-indicator :expandend="activeMenu[data.id]" :visible="isTopCollapsible" style="" />

                <Badge :label="data.badge">
                    {{ data.label }}
                </Badge>

            </h4>

            <CollapseTransition :duration="150">

                <ResourceList v-if="activeMenu[data.id]"
                              :resources="data.resources"
                              :recursive="recursive"
                              :remember-menu-state="rememberMenuState"/>

            </CollapseTransition>

        </template>
    </div>

</template>

<script>

    import { CollapseTransition } from 'vue2-transitions'
    import ResourceList from './ResourceList'
    import Badge from './Badge'
    import CollabsabeIndicator from "./CollabsabeIndicator";

    export default {
        name: 'CollapsibleResourceManager',
        components: {CollabsabeIndicator, CollapseTransition, ResourceList, Badge },
        props: {
            data: { type: Object, required: true },
            rememberMenuState: { type: Boolean, default: false },
            recursive: { type: Boolean, default: false }
        },
        data() {
            return {
                topExpanded: this.data.expanded || this.data.expanded == null ? true : false,
                isTopCollapsible: this.data.expanded === null ? false : true,
                activeMenu: { [ this.data.id ]: this.data.expanded }
            }
        },
        created() {

            if (this.rememberMenuState) {

                const state = localStorage.getItem(this.cacheKey)

                if (state) {

                    this.activeMenu[ this.data.id ] = JSON.parse(state)

                }

                this.$watch(() => this.activeMenu[ this.data.id ], state => {

                    localStorage.setItem(this.cacheKey, state)

                })

            }

        },
        computed: {
            isGroup() {
                return this.data.type === 'group'
            },
            isTopLevel() {
                return this.data.type === 'top_level'
            },
            cacheKey() {
                return `menu-state.${ this.data.id }`
            },
            isEmpty() {
                return this.data.resources.length === 0
            },
            topLevelLink() {

                if (this.data.linkTo) {

                    return {
                        is: 'router-link',
                        to: this.data.linkTo.router,
                        target: this.data.linkTo.target,
                        class: [ 'cursor-pointer', 'dim' ]
                    }

                }

                return {
                    is: 'h3'
                }

            }
        },
        methods: {
            toggleGroup(id) {
                this.activeMenu[ id ] = !this.activeMenu[ id ]
            }
        }
    }

</script>

<style scoped>

    .collapsible-indicator {
        top: -6px;
        left: -30px;
    }

    .top_level ul li:first-child {
        padding-top: 0;
    }

    .group ul li:first-child {
        padding-top: 1rem;
    }

    .group h4 {
        margin-left: 0;
    }

    .group h4:first-child {
        margin-top: 0;
    }

    h3>.collapsible-indicator {
        right: -5px;
        top: -3px;
        left: auto;
    }
</style>
