const { theme, ...theRest } = require('../../vendor/laravel/nova/tailwind.config')

module.exports = {
    ...theRest,
    theme: {
        ...theme,
        extend: {
            ...theme.extend,
            transitionProperty: {
                width: 'width',
            },
        },
    },
    important: 'div[id^="collapsible-resource-manager"]',
}
