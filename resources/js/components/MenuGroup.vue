<template>

    <SectionHeader :item="item">

        {{ item.name }}

        <template #content>

            <div class="mt-2">

                <div v-for="item of item.items">
                    <MenuItem :item="item"/>
                </div>

            </div>

        </template>

    </SectionHeader>

</template>

<script>

    import MenuItem from './MenuItem.vue'
    import SectionHeader from './SectionHeader.vue'

    export default {
        components: { SectionHeader, MenuItem },
        props: [ 'item' ],
    }

</script>
