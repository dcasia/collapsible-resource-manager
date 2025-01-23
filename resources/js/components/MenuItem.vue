<template>

    <component
        class="group flex px-4 my-1 py-2 hover:text-primary-500 hover:bg-gray-200 dark:hover:bg-gray-800 rounded w-full cursor-pointer items-center"
        :class="{
            'active:outline-none active:ring focus:outline-none focus:ring focus:ring-primary-200 dark:focus:ring-gray-600': true,
            'bg-gray-200 dark:bg-gray-800 text-primary-500': item.active,
            'text-gray-500': !item.active
        }"
        :is="component"
        v-bind="omit(linkAttributes, 'data.icon')"
        @click="handleClick">

        <SvgIcon :name="item.data?.icon ?? item.icon" class="mr-2 min-w-[24px]"/>

        {{ item.name }}

        <SvgIcon v-if="item.external" name="arrow-top-right-on-square" type="micro" class="hidden group-hover:block ml-auto"/>

        <div v-if="item.badge" class="ml-auto">

            <Badge :extra-classes="item.badge.typeClass">
                {{ item.badge.value }}
            </Badge>

        </div>

    </component>

</template>

<script>

    import { useStore } from 'vuex'
    import MenuItem from '@/components/Menu/MenuItem.vue'
    import omit from 'lodash/omit'
    import SvgIcon from './SvgIcon.vue'
    import MenuMixin from '../mixins/MenuMixin.js'

    export default {
        extends: MenuItem,
        components: { SvgIcon },
        mixins: [ MenuMixin ],
        data() {
            return { omit }
        },
        setup() {
            return {
                store: useStore(),
            }
        },
        methods: {
            handleClick() {
                if (this.config.collapse_on_select) {
                    this.$store.state.mainMenuShown = false
                }
            },
        },
    }

</script>
