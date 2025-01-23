<template>

    <template v-if="name?.trim()?.startsWith('<svg')">
        <div v-html="name"/>
    </template>
    <Icon v-else :name="name" :type="type"/>
</template>

<script>
import {Icon} from 'laravel-nova-ui'

export default {
    components: {Icon},
    props: ['name', 'type'],
}

</script>
