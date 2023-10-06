<template>

    <h3 class="px-3 text-gray-400 text-md font-bold mt-4 flex justify-between h-[14px] pb-4"
        :class="{ 'cursor-pointer hover:text-gray-200': this.item.collapsable }"
        @click="toggleCollapseState">

        <slot/>

        <Icon v-if="item.collapsable"
              class="transition-transform"
              type="chevron-right"
              :class="{ 'rotate-90': !shouldBeCollapsed }"
              :width="14"/>

    </h3>

    <Collapse :when="!shouldBeCollapsed">
        <slot name="content"/>
    </Collapse>

</template>

<script>

    import { Collapse } from 'vue-collapsed'
    import Collapsable from '@/mixins/Collapsable'

    export default {
        mixins: [ Collapsable ],
        components: { Collapse },
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
