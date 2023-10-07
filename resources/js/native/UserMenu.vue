<template>

    <component
        :is="componentName"
        v-if="hasUserMenu"
        @menu-closed="handleUserMenuClosed"
        :placement="dropdownPlacement">

        <DropdownTrigger
            class="rounded-full"
            :show-arrow="false"
            role="navigation">

            <Icon type="finger-print"
                  :solid="true"
                  v-if="currentUser.impersonating || !currentUser.avatar"
                  class="w-8 h-8"/>

            <img v-else-if="currentUser.avatar"
                 :alt="__(':name\'s Avatar', { name: userName })"
                 :src="currentUser.avatar"
                 class="rounded-full w-8 h-8"/>

        </DropdownTrigger>

        <template #menu>

            <DropdownMenu width="200" class="px-1">

                <nav class="py-1">

                    <component
                        :is="item.component"
                        v-for="item in formattedItems"
                        :key="item.path"
                        v-bind="item.props"
                        v-on="item.on">

                        <div v-if="item.badge" class="mr-1">
                            <Badge :extra-classes="item.badge.typeClass">
                                {{ item.badge.value }}
                            </Badge>
                        </div>

                        {{ item.name }}

                    </component>

                    <DropdownMenuItem
                        as="button"
                        v-if="currentUser.impersonating"
                        @click="handleStopImpersonating">

                        {{ __('Stop Impersonating') }}

                    </DropdownMenuItem>

                    <DropdownMenuItem
                        as="button"
                        v-if="supportsAuthentication"
                        @click="attempt">

                        {{ __('Logout') }}

                    </DropdownMenuItem>
                </nav>

            </DropdownMenu>

        </template>

    </component>

    <div v-else-if="currentUser" class="flex items-center">

        <img v-if="currentUser.avatar"
             :alt="__(':name\'s Avatar', { name: userName })"
             :src="currentUser.avatar"
             class="rounded-full w-8 h-8 mr-3"/>

        <div class="whitespace-nowrap">
            {{ userName }}
        </div>

    </div>

</template>

<script>

    import MenuItem from '@/components/UserMenu.vue'

    export default {
        extends: MenuItem,
    }

</script>
