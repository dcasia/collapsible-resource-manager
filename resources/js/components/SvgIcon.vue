<template>

    <template v-if="type?.trim()?.startsWith('<svg')">
        <div v-html="type"/>
    </template>

    <Icon v-else :type="type" :width="width"/>

</template>

<script>

    export default {
        props: [ 'type', 'width' ],
    }

</script>
