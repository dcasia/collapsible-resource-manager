<template>

    <div class="absolute flex flex-auto collapsible-indicator" v-if="visible">

        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">

            <path v-if="expanded"
                  fill="currentColor"
                  d="M16 12c0 .55-.45 1-1 1H9c-.55 0-1-.45-1-1s.45-1 1-1h6c.55 0 1 .45 1 1z"/>

            <path v-else
                  fill="currentColor"
                  d="M13 11h2c.55 0 1 .45 1 1s-.45 1-1 1h-2v2c0 .55-.45 1-1 1s-1-.45-1-1v-2H9c-.55 0-1-.45-1-1s.45-1 1-1h2V9c0-.55.45-1 1-1s1 .45 1 1v2z"/>

        </svg>

    </div>

</template>

<script>

    export default {
        name: 'CollapsibleIndicator',
        props: {
            expanded: {
                default: true
            },
            visible: {
                default: false
            },
        }
    }

</script>

<style>

    .collapsible-indicator {
        top: -2px;
        right: 0;
    }

    h4 .collapsible-indicator {
        top: -5px;
    }

</style>
