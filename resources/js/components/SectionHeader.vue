<template>

    <h3 class="px-3 text-gray-500 dark:text-gray-400 text-md font-bold mt-4 flex justify-between h-[14px] pb-4"
        :class="{ 'cursor-pointer hover:text-gray-400 dark:hover:text-gray-200': this.item.collapsable }"
        @click="toggleCollapseState">

        <slot/>

        <SvgIcon v-if="item.collapsable"
              class="transition-transform max-w-[14px]"
              name="chevron-right"
              :class="{ 'rotate-90': !shouldBeCollapsed }"/>

    </h3>

    <Collapse :when="!shouldBeCollapsed">
        <slot name="content"/>
    </Collapse>

</template>

<script>

    import { Collapse } from 'vue-collapsed'
    import Collapsable from '@/mixins/Collapsable'
    import SvgIcon from './SvgIcon.vue'

    export default {
        mixins: [ Collapsable ],
        components: { SvgIcon, Collapse },
        props: [ 'item' ],
        methods: {
            toggleCollapseState() {
                if (this.item.collapsable) {
                    this.toggleCollapse()
                }
            },
        },
    }

</script>
