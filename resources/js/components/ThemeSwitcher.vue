<template>

    <Icon
        v-tooltip="theme"
        class="cursor-pointer"
        :type="themeIcon"
        :class="themeColor"
        @click.native="toggleTheme"
    />

</template>

<script>

    import MenuItem from '@/components/Dropdowns/ThemeDropdown.vue'

    export default {
        extends: MenuItem,
        methods: {
            toggleTheme() {

                if (this.theme === 'light') {
                    this.toggleDarkTheme()
                } else if (this.theme === 'dark') {
                    this.toggleSystemTheme()
                } else if (this.theme === 'system') {
                    this.toggleLightTheme()
                }

            },
        },
    }

</script>
