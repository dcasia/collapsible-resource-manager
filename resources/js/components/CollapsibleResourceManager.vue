<template>

    <div v-if="!isEmpty || data.linkTo" :class="[ data.type, { 'mb-8': isTopLevel } ]">

        <component v-if="data.label && isTopLevel" v-bind="topLevelLink"
                   class="flex items-center font-normal text-white mb-6 text-base no-underline">

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

        </component>

        <ResourceList class="resources-only"
                      v-if="isTopLevel && data.resources.length"
                      :resources="data.resources"
                      :recursive="recursive"
                      :remember-menu-state="rememberMenuState"/>

        <template v-if="isGroup && data.resources.length">

            <h4 class="relative select-none ml-8 mt-4 text-xs text-white-50% uppercase tracking-wide cursor-pointer"
                v-if="data.label"
                >

                <div class="absolute flex flex-auto collapsible-indicator" @click="toggleGroup(data.id)">

                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">

                        <path v-if="activeMenu[data.id]"
                              fill="currentColor"
                              d="M16 12c0 .55-.45 1-1 1H9c-.55 0-1-.45-1-1s.45-1 1-1h6c.55 0 1 .45 1 1z"/>

                        <path v-else
                              fill="currentColor"
                              d="M13 11h2c.55 0 1 .45 1 1s-.45 1-1 1h-2v2c0 .55-.45 1-1 1s-1-.45-1-1v-2H9c-.55 0-1-.45-1-1s.45-1 1-1h2V9c0-.55.45-1 1-1s1 .45 1 1v2z"/>

                    </svg>

                </div>

                <Badge :label="data.badge"  v-bind="topLevelLink">
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

    export default {
        name: 'CollapsibleResourceManager',
        components: { CollapseTransition, ResourceList, Badge },
        props: {
            data: { type: Object, required: true },
            rememberMenuState: { type: Boolean, default: false },
            recursive: { type: Boolean, default: false }
        },
        data() {
            return {
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
                        class: [ 'cursor-pointer', 'dim', 'text-white','no-underline' ]
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

<style>

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


</style>
