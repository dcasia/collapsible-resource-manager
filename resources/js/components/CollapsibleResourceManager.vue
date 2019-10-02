<template>

    <div class="mb-8">

        <h3 class="flex items-center font-normal text-white mb-6 text-base no-underline">

            <div v-if="data.icon" class="sidebar-icon" v-html="data.icon"/>

            <svg v-else class="sidebar-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path fill="var(--sidebar-icon)"
                      d="M3 1h4c1.1045695 0 2 .8954305 2 2v4c0 1.1045695-.8954305 2-2 2H3c-1.1045695 0-2-.8954305-2-2V3c0-1.1045695.8954305-2 2-2zm0 2v4h4V3H3zm10-2h4c1.1045695 0 2 .8954305 2 2v4c0 1.1045695-.8954305 2-2 2h-4c-1.1045695 0-2-.8954305-2-2V3c0-1.1045695.8954305-2 2-2zm0 2v4h4V3h-4zM3 11h4c1.1045695 0 2 .8954305 2 2v4c0 1.1045695-.8954305 2-2 2H3c-1.1045695 0-2-.8954305-2-2v-4c0-1.1045695.8954305-2 2-2zm0 2v4h4v-4H3zm10-2h4c1.1045695 0 2 .8954305 2 2v4c0 1.1045695-.8954305 2-2 2h-4c-1.1045695 0-2-.8954305-2-2v-4c0-1.1045695.8954305-2 2-2zm0 2v4h4v-4h-4z"/>
            </svg>

            <span class="sidebar-label">{{ data.title }}</span>

        </h3>

        <ResourceList class="resources-only" v-if="data.resources" :resources="data.resources"/>

        <template v-for="(group, index) of data.groups">

            <h4 class="relative select-none mt-4 ml-8 text-xs text-white-50% uppercase tracking-wide cursor-pointer"
                v-if="group.title"
                @click="toggleGroup(index)">

                <div class="absolute collapsible-indicator">
                    {{ activeMenu[index] ? '-' : '+' }}
                </div>

                {{ group.title }}

            </h4>

            <CollapseTransition :duration="150">

                <ResourceList v-if="activeMenu[index]" :resources="group.resources"/>

            </CollapseTransition>

        </template>

    </div>

</template>

<script>

    import {CollapseTransition} from 'vue2-transitions'
    import ResourceList from './ResourceList'

    export default {
        name: 'CollapsibleResourceManager',
        components: {CollapseTransition, ResourceList},
        props: ['data'],
        data() {
            return {
                activeMenu: this.data.groups.map(group => !!group.expanded)
            }
        },
        methods: {
            toggleGroup(index) {
                this.$set(this.activeMenu, index, !this.activeMenu[index])
            }
        }
    }

</script>

<style>

    .collapsible-indicator {
        left: -20px;
        width: 12px;
        height: 12px;
        display: flex;
        justify-content: center;
        align-content: center;
    }

    .resources-only li:first-child {
        padding-top: 0;
    }

</style>
