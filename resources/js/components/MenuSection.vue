<template>
    <MenuItem :item="item"/>
</template>

<script>

    import MenuItem from './MenuItem.vue'

    export default {
        components: { MenuItem },
        props: [ 'item' ],
    }

</script>
