# Collapsible Resource Manager

[![Latest Version on Packagist](https://img.shields.io/packagist/v/digital-creative/collapsible-resource-manager)](https://packagist.org/packages/digital-creative/collapsible-resource-manager)
[![Total Downloads](https://img.shields.io/packagist/dt/digital-creative/collapsible-resource-manager)](https://packagist.org/packages/digital-creative/collapsible-resource-manager)
[![License](https://img.shields.io/packagist/l/digital-creative/collapsible-resource-manager)](https://github.com/dcasia/collapsible-resource-manager/blob/main/LICENSE)

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/dcasia/collapsible-resource-manager/main/screenshots/dark.png">
  <img alt="Laravel Nova Collapsible Resource Manager in action" src="https://raw.githubusercontent.com/dcasia/collapsible-resource-manager/main/screenshots/light.png">
</picture>

Provides an easy way to order and group your resources on the sidebar.

# Installation

You can install the package via composer:

```
composer require digital-creative/collapsible-resource-manager
```

# Usage

This package can serve as a seamless replacement for Nova's default sidebar menu.
The only modification it makes to the original Nova menu is the addition of the `->icon()` method to the MenuItem class, which enables you to easily incorporate icons into each menu item.

For all available options you can check nova documentation [here](https://nova.laravel.com/docs/customization/menus.html#menu-sections).

```php
class NovaServiceProvider extends NovaApplicationServiceProvider {

    public function boot(): void
    {
        //...
        Nova::mainMenu(function (Request $request): array {    
            return [
                MenuSection::make('Content', [
                    MenuGroup::make('User Base', [
                        MenuItem::resource(User::class)->icon('<svg>...</svg>'),
                        MenuItem::resource(Article::class)->icon('annotation'),
                        MenuItem::resource(Comment::class)->icon('chat-alt'),
                    ]),
                ])->icon('lightning-bolt')->collapsable(),
            ];    
        });
        //...
    }

}
```

## Configuration

You can also enable/disable the main header menu handling. For example, if you don't want the user menu, theme switcher,
and notification icon to be moved to the bottom left side, you can manually disable it by adding these lines to your Nova config file:

```php
// config/nova.php

'vendors' => [
    'collapsible_resource_manager' => [
        'move_user_menu' => false,
        'move_theme_switcher' => false,
        'move_notification_center' => false,
        'section_title' => true,
        'collapse_on_select' => true,
        'collapse_on_refresh' => false,
    ]
]
```

## ⭐️ Show Your Support

Please give a ⭐️ if this project helped you!

### Other Packages You Might Like

- [Nova Dashboard](https://github.com/dcasia/nova-dashboard) - The missing dashboard for Laravel Nova!
- [Nova Welcome Card](https://github.com/dcasia/nova-welcome-card) - A configurable version of the `Help card` that comes with Nova.
- [Icon Action Toolbar](https://github.com/dcasia/icon-action-toolbar) - Replaces the default boring action menu with an inline row of icon-based actions.
- [Expandable Table Row](https://github.com/dcasia/expandable-table-row) - Provides an easy way to append extra data to each row of your resource tables.
- [Collapsible Resource Manager](https://github.com/dcasia/collapsible-resource-manager) - Provides an easy way to order and group your resources on the sidebar.
- [Resource Navigation Tab](https://github.com/dcasia/resource-navigation-tab) - Organize your resource fields into tabs.
- [Resource Navigation Link](https://github.com/dcasia/resource-navigation-link) - Create links to internal or external resources.
- [Nova Mega Filter](https://github.com/dcasia/nova-mega-filter) - Display all your filters in a card instead of a tiny dropdown!
- [Nova Pill Filter](https://github.com/dcasia/nova-pill-filter) - A Laravel Nova filter that renders into clickable pills.
- [Nova Slider Filter](https://github.com/dcasia/nova-slider-filter) - A Laravel Nova filter for picking range between a min/max value.
- [Nova Range Input Filter](https://github.com/dcasia/nova-range-input-filter) - A Laravel Nova range input filter.
- [Nova FilePond](https://github.com/dcasia/nova-filepond) - A Nova field for uploading File, Image and Video using Filepond.
- [Custom Relationship Field](https://github.com/dcasia/custom-relationship-field) - Emulate HasMany relationship without having a real relationship set between resources.
- [Column Toggler](https://github.com/dcasia/column-toggler) - A Laravel Nova package that allows you to hide/show columns in the index view.
- [Batch Edit Toolbar](https://github.com/dcasia/batch-edit-toolbar) - Allows you to update a single column of a resource all at once directly from the index page.

## License

The MIT License (MIT). Please see [License File](https://raw.githubusercontent.com/dcasia/collapsible-resource-manager/master/LICENSE) for more information.
