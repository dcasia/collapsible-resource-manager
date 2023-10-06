<template>

    <component
        class="flex px-4 my-1 py-2 hover:bg-gray-800 rounded w-full cursor-pointer items-center hover:text-gray-400"
        :class="{
            'active:outline-none active:ring focus:outline-none focus:ring focus:ring-primary-200 dark:focus:ring-gray-600': true,
            'bg-gray-800 text-primary-500': item.active,
            'text-gray-500': !item.active
        }"
        :is="component"
        v-bind="linkAttributes"
        @click="handleClick">

        <Icon :type="item.data?.icon"  class="mr-2 min-w-[24px]"/>

        {{ item.name }}

        <div v-if="item.badge" class="ml-auto">

            <Badge :extra-classes="item.badge.typeClass">
                {{ item.badge.value }}
            </Badge>

        </div>

    </component>

</template>

<script>

    import MenuItem from '@/components/Menu/MenuItem.vue'

    export default {
        extends: MenuItem,
    }

</script>
