<template>

    <ul class="list-reset">

        <li class="leading-tight pt-4 text-sm" v-for="resource of resources" :class="{ 'ml-8': !recursive }">

            <collapsible-resource-manager v-if="resource.type === 'group'"
                                          :data="resource"
                                          :remember-menu-state="rememberMenuState"
                                          recursive/>

            <div v-else-if="resource.type === 'external_link'">

                <a class="relative text-white text-left no-underline dim block"
                   :href="resource.url"
                   :target="resource.target">

                    <Badge :label="resource.badge">
                        {{ resource.label }}
                    </Badge>

                    <div v-if="resource.icon" class="absolute resource-list-icon flex" v-html="resource.icon"/>

                    <svg v-else class="absolute resource-list-icon"
                         viewBox="0 0 24 24"
                         width="24"
                         height="24">

                        <path
                            fill="currentColor"
                            d="M19 6.41L8.7 16.71a1 1 0 1 1-1.4-1.42L17.58 5H14a1 1 0 0 1 0-2h6a1 1 0 0 1 1 1v6a1 1 0 0 1-2 0V6.41zM17 14a1 1 0 0 1 2 0v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7c0-1.1.9-2 2-2h5a1 1 0 0 1 0 2H5v12h12v-5z"/>

                    </svg>

                </a>

            </div>

            <router-link v-else
                        class="relative text-white text-left no-underline dim block"
                        :to="resource.router"
                        :target="resource.target">

                <div v-if="resource.icon" class="absolute resource-list-icon flex" v-html="resource.icon"/>

                <Badge :label="resource.badge">
                    {{ resource.label }}
                </Badge>

            </router-link>

        </li>

    </ul>

</template>

<script>

    import Badge from './Badge'

    export default {
        name: 'ResourceList',
        components: { Badge },
        props: {
            resources: { type: Array, required: true },
            recursive: { type: Boolean, default: false },
            rememberMenuState: { type: Boolean, required: true }
        }
    }

</script>

<style>

    .resource-list-icon {
        width: 15px;
        top: 2px;
        left: -25px;
    }

    .custom-tools * {
        margin: 0;
        padding: 0;
        font-size: inherit;
        position: inherit;
    }

    .custom-tools svg, .custom-tools img {
        display: none;
    }

</style>
