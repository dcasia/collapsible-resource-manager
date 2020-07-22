<template>

    <div class="flex flex-1 items-center">

        <div :class="{ dim: dim }" class="flex-1">
            <slot/>
        </div>

        <div v-if="label" class="badge rounded-full text-xxs ml-2 self-start">
            {{ label }}
        </div>

    </div>

</template>

<script>

    export default {
        name: 'Badge',
        props: {
            dim: {
                type: Boolean
            },
            label: {
                type: String
            }
        }
    }

</script>

<style scoped>

    .badge {
        background: var(--collapsible-menu-badge-color, var(--primary));
        padding: 0.15rem 0.35rem;
        align-self: center;
    }

    .text-xxs {
        font-size: .60rem
    }

</style>
