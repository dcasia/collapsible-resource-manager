import CollapsibleResourceManager from './components/CollapsibleResourceManager'

Nova.booting((Vue, router, store) => {
    Vue.component('collapsible-resource-manager', CollapsibleResourceManager)
})
