# Collapsible Resource Manager

[![Latest Version on Packagist](https://img.shields.io/packagist/v/digital-creative/collapsible-resource-manager)](https://packagist.org/packages/digital-creative/collapsible-resource-manager)
[![Total Downloads](https://img.shields.io/packagist/dt/digital-creative/collapsible-resource-manager)](https://packagist.org/packages/digital-creative/collapsible-resource-manager)
[![License](https://img.shields.io/packagist/l/digital-creative/collapsible-resource-manager)](https://github.com/dcasia/collapsible-resource-manager/blob/master/LICENSE)

![Laravel Nova Collapsible Resource Manager in action](https://raw.githubusercontent.com/dcasia/collapsible-resource-manager/master/screenshots/demo-1.png)

Provides an easy way to order and group your resources on the sidebar.

# Installation

You can install the package via composer:

```
composer require digital-creative/collapsible-resource-manager
```

Next up, you must register the tool with Nova. This is typically done in the `tools` method of the `NovaServiceProvider.`

```php
class NovaServiceProvider extends NovaApplicationServiceProvider
{
    public function tools()
    {
        return [
            // ...
            new CollapsibleResourceManager()
        ];

    }
}
```

Publish the configuration file

```bash
php artisan vendor:publish --provider="DigitalCreative\CollapsibleResourceManager\CollapsibleResourceManagerServiceProvider" --tag="config"
```

Config file reference: 

```php
return [
    /**
     * If false the default resource manager will coexist with this tool
     */
    'disable_default_resource_manage' => true,

    /**
     * If true all titles within navigation array will pass through laravel trans helper
     */
    'translate_title' => false,

    /**
     * Main navigation, each item on this array creates a new entry on the sidebar with an icon
     */
    'navigation' => [
        [
            'title' => 'Resource Title',
            'icon' => null, //<svg></svg> or <img src=""/>
            'resources' => [
                \App\Nova\Page::class, // if passed without a key it will use the static label() function within the resource class
                'Custom Label' => \App\Nova\Article::class,
                'Internal Link' => '/custom/route',
                'External Link' => 'https://example.com'
            ],
            'groups' => [
                [
                    'title' => 'Assets',
                    'expanded' => true,
                    'resources' => [
                        \App\Nova\Image::class,
                        \App\Nova\Video::class,
                    ]
                ]
            ]
        ]
    ]
];
```

# Notes

A key difference between `CollapsibleResourceManager` and the default Nova `ResourceManager` is that the later auto scan
for resources within the `App\Nova` directory and adds it to the navigation, `CollapsibleResourceManager` expects
every entry to be added manually from the configuration file.

## License

The MIT License (MIT). Please see [License File](https://raw.githubusercontent.com/dcasia/collapsible-resource-manager/master/LICENSE) for more information.
