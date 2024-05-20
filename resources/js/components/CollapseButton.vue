<template>
    <Button v-if="show" variant="action" icon="chevron-double-left" @click="collapseMainMenu"/>
</template>

<script>

    import { Button } from 'laravel-nova-ui'

    export default {
        components: { Button },
        props: {
            show: {
                type: Boolean,
                default: false,
            },
        },
        data() {
            return {}
        },
    }

</script>
