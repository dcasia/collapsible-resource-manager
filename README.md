# Collapsible Resource Manager

[![Latest Version on Packagist](https://img.shields.io/packagist/v/digital-creative/collapsible-resource-manager)](https://packagist.org/packages/digital-creative/collapsible-resource-manager)
[![Total Downloads](https://img.shields.io/packagist/dt/digital-creative/collapsible-resource-manager)](https://packagist.org/packages/digital-creative/collapsible-resource-manager)
[![License](https://img.shields.io/packagist/l/digital-creative/collapsible-resource-manager)](https://github.com/dcasia/collapsible-resource-manager/blob/master/LICENSE)

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/dcasia/collapsible-resource-manager/nova4/screenshots/dark.png">
  <img alt="Laravel Nova Collapsible Resource Manager in action" src="https://raw.githubusercontent.com/dcasia/collapsible-resource-manager/nova4/screenshots/light.png">
</picture>

Provides an easy way to order and group your resources on the sidebar.

# Installation

You can install the package via composer:

```
composer require digital-creative/collapsible-resource-manager
```

# Resource Icons

This package can be used as a drop-in replacement for the default nova sidebar menu, the only addition to the original nova menu,
is that now you can also call ->icon() on the MenuItem class to add an icon to the menu item.

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

## License

The MIT License (MIT). Please see [License File](https://raw.githubusercontent.com/dcasia/collapsible-resource-manager/master/LICENSE) for more information.
