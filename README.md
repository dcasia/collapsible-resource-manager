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
            new CollapsibleResourceManager([
                'navigation' => [
                    TopLevelResource::make([
                        'label' => 'Resources',
                        'resources' => [
                            \App\Nova\User::class
                        ]
                    ]),
                ]
            ])
        ];
    }
}
```

#### Options 

```php
new CollapsibleResourceManager([
    'disable_default_resource_manager' => true, // default
    'remember_menu_state' => false, // default
    'navigation' => [
        TopLevelResource::make(...),
        TopLevelResource::make(...)
    ]
]);
```

On the `navigation` key only `TopLevelResource` are allowed to be used, any other resource will be ignored.

# Navigation Resources

#### TopLevelResource

```php
TopLevelResource::make([
    'label' => 'Resources',
    'badge' => null,
    'icon' => null,
    'linkTo' => null, // accepts an instance of `NovaResource` or a Nova `Resource::class`
    'resources' => [
        NovaResource::make(...),
        Group::make(...),
        LensResource::make(...),
        InternalLink::make(...),
        ExternalLink::make(...),
        RawResource::make(...)
    ]
]);
```

#### NovaResource

You can either pass a `\App\Nova\Resource::class` or a instance of `NovaResource`

```php
NovaResource::make(\App\Nova\Customer::class);
```

Additionally you can redirect the user to specific views on click by chaining one of these methods:

```php
NovaResource::make(\App\Nova\Customer::class)->index(); // Open the create index for the given resource - default
NovaResource::make(\App\Nova\Customer::class)->create(); // Open the create view for the given resource
NovaResource::make(\App\Nova\Customer::class)->detail($resourceId); // Open the detail view for the given ID
NovaResource::make(\App\Nova\Customer::class)->edit($resourceId); // Open the form view of the given ID
```

Authorization is also respected for each of these views

#### Group

Group appears as a toggle with a +/- sign that allows user to collapse multiple items into a single entry on the sidebar:

```php
Group::make([
    'label' => 'Admin',
    'icon' => null,
    'expanded' => false,
    'resources' => [
        // any resource instance
    ]
]);
```

#### InternalLink

Internal Link is an easy way to manually direct user to an specific URL using the default navigation mechanism:

```php
InternalLink::make([
    'label' => 'My custom internal link',
    'badge' => null,
    'icon' => null,
    'target' => '_self',
    'path' => '/my/custom/resource/url',
    'params' => [ 'resourceId' => 1 ],
    'query' => [' resource_per_page' => 100 ]
]);
```

#### LensResource

Lens Resource is a quickly way to add an entry on the sidebar that directs the user directly to an lens view for a given resource,

It requires 2 params: the resource the lens was used and the lens class itself you want to link to:

```php
LensResource::make(
    \App\Nova\Customer::class,
    \App\Nova\Lenses\MostValuableCustomers::class
);
```

#### ExternalLink

External links are useful to add entries on the menu that redirects user to an external URL:

```php
ExternalLink::make([
    'label' => 'Google',
    'badge' => null,
    'icon' => null,
    'target' => '_blank',
    'url' => 'https://google.com.br'
]);
```

#### RawResource

If none of the pre-configured resources suffice your needs, RawResource provides an way to manually define what params the
<router-link> should be built with:

```php
RawResource::make([
    'label' => 'Customer',
    'badge' => null,
    'icon' => null,
    'target' => '_self',
    'name' => 'index',
    'path' => null,
    'params' => [ 'resourceName' => 'customer' ],
    'query' => [ 'foo' => 'bar' ],
]);
```

# Authorization

All the resources uses `AuthorizedToSee` nova trait therefor they behave like tools and cards, 
where you can chain `canSee` to determine if the current logged in user is allowed to see the resource.

```php
Group::make(...)->canSee(function($request) {
    return true/false;
});
```

By default `NovaResource` will follow the default policy registered for the given resource, however it can be overridden
by chaining the `->canSee()` manually

# Resource Labels and Translations

You can pass translated labels to any resource by calling the `->label()` method, eg:

```php
NovaResource::make(\App\Nova\Customer::class)->label(function() { return __('Customer'); }); // or
NovaResource::make(\App\Nova\Customer::class)->label(__('Customer'));
```

# Resource Icons

You can define icons for `NovaResource` by either:

- Calling `->icon()` method on the `NovaResource` it accepts a `Closure` that returns a `string` or a `string` directly
- Setting a static method called `icon` that returns an string on the resource class:

```php
class Customer extends Resource
{
    //...
    public static function icon(): string
    {
        return <<<SVG
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                <path fill="currentColor" d="M11.21 11.99c0-.87-.31-1.62-.93-2.23-.61-.62-1.36-.93-2.23-.93s-1.62.31-2.23.93c-.62.62-.93 1.36-.93 2.23 0 .87.31 1.62.93 2.23.62.62 1.36.93 2.23.93s1.62-.31 2.23-.93c.62-.61.93-1.35.93-2.23zm9.48 6.32c0-.43-.16-.8-.47-1.11a1.52 1.52 0 00-1.11-.47c-.43 0-.8.16-1.11.47-.31.31-.47.68-.47 1.11 0 .44.15.81.46 1.12.31.31.68.46 1.12.46.44 0 .81-.15 1.12-.46s.46-.68.46-1.12zm0-12.64c0-.43-.16-.8-.47-1.11s-.68-.47-1.11-.47c-.43 0-.8.16-1.11.47s-.47.68-.47 1.11c0 .44.15.81.46 1.12.31.31.68.46 1.12.46.44 0 .81-.15 1.12-.46.31-.31.46-.68.46-1.12zm-4.74 5.2v2.28c0 .08-.03.16-.09.24-.06.08-.12.12-.2.13l-1.91.3c-.09.29-.22.6-.4.94.28.4.65.87 1.11 1.42.06.09.09.17.09.25 0 .1-.03.18-.09.23-.19.25-.53.62-1.02 1.1-.49.49-.81.73-.97.73-.09 0-.18-.03-.26-.09l-1.41-1.1c-.3.16-.62.28-.95.38-.09.89-.19 1.53-.28 1.91-.06.2-.18.3-.37.3H6.9c-.09 0-.17-.03-.25-.09-.07-.06-.12-.13-.12-.22l-.28-1.88c-.28-.08-.59-.21-.93-.38l-1.46 1.1c-.06.06-.14.09-.25.09-.09 0-.18-.03-.26-.1-1.19-1.09-1.78-1.75-1.78-1.98 0-.07.03-.15.09-.23.08-.12.25-.33.51-.65s.45-.57.58-.75c-.19-.36-.33-.7-.43-1.01l-1.88-.3c-.08-.01-.15-.05-.21-.12s-.09-.15-.09-.24v-2.28c0-.08.03-.16.09-.24.06-.08.12-.12.2-.13l1.91-.3c.09-.29.22-.6.4-.94-.28-.4-.65-.87-1.11-1.42a.507.507 0 01-.09-.26c0-.1.03-.18.09-.25.18-.25.52-.61 1.01-1.1s.82-.73.98-.73c.09 0 .18.03.26.09L5.3 6.69c.28-.15.6-.28.95-.4.09-.89.19-1.52.28-1.9.06-.2.18-.3.37-.3h2.3c.09 0 .17.03.25.09.07.07.11.14.12.22l.28 1.89c.28.08.59.21.93.38l1.46-1.1c.07-.06.15-.09.25-.09.09 0 .18.03.26.1 1.19 1.09 1.78 1.75 1.78 1.98 0 .07-.03.14-.09.23-.1.13-.27.35-.52.67-.25.31-.43.56-.56.74.19.4.33.73.42 1.01l1.88.28c.08.02.15.06.21.13.05.08.08.16.08.25zm7.9 6.58v1.73c0 .13-.61.26-1.84.38-.1.22-.22.44-.37.64.42.93.63 1.5.63 1.7 0 .03-.02.06-.05.09-1 .58-1.51.88-1.53.88-.07 0-.26-.19-.57-.58-.31-.39-.53-.67-.64-.84-.16.02-.29.02-.37.02-.08 0-.21-.01-.37-.02-.12.17-.33.45-.64.84-.31.39-.5.58-.57.58-.02 0-.53-.29-1.53-.88a.105.105 0 01-.05-.09c0-.21.21-.77.63-1.7a3.78 3.78 0 01-.37-.64c-1.23-.12-1.84-.25-1.84-.38v-1.73c0-.13.61-.26 1.84-.38.11-.24.23-.45.37-.64-.42-.93-.63-1.5-.63-1.7 0-.03.02-.06.05-.09.03-.02.18-.1.43-.25.26-.15.5-.29.73-.42.23-.13.35-.2.37-.2.07 0 .26.19.57.57s.53.66.64.83c.16-.02.29-.02.37-.02.08 0 .21.01.37.02.42-.58.8-1.05 1.14-1.38l.07-.02c.03 0 .54.29 1.53.86.03.02.05.05.05.09 0 .21-.21.77-.63 1.7.14.19.26.4.37.64 1.23.13 1.84.26 1.84.39zm0-12.64v1.73c0 .13-.61.26-1.84.38-.1.22-.22.44-.37.64.42.93.63 1.5.63 1.7 0 .03-.02.06-.05.09-1 .58-1.51.88-1.53.88-.07 0-.26-.19-.57-.58s-.53-.67-.64-.84c-.16.02-.29.02-.37.02-.08 0-.21-.01-.37-.02-.12.17-.33.45-.64.84s-.5.58-.57.58c-.02 0-.53-.29-1.53-.88a.105.105 0 01-.05-.09c0-.21.21-.77.63-1.7a3.78 3.78 0 01-.37-.64c-1.23-.12-1.84-.25-1.84-.38V4.81c0-.13.61-.26 1.84-.38.11-.24.23-.45.37-.64-.42-.93-.63-1.5-.63-1.7 0-.03.02-.06.05-.09.03-.02.18-.1.43-.25.26-.15.5-.29.73-.42.23-.13.35-.2.37-.2.07 0 .26.19.57.57s.53.66.64.83c.16-.02.29-.02.37-.02.08 0 .21.01.37.02.42-.58.8-1.05 1.14-1.38l.07-.02c.03 0 .54.29 1.53.86.03.02.05.05.05.09 0 .21-.21.77-.63 1.7.14.19.26.4.37.64 1.23.13 1.84.26 1.84.39z"/>
            </svg>
        SVG;
    }
}
```

For the `LensResource` the static icon method should be defined on the lens class not on the resource class

And for all the other resources that doesnt accept a class string as configuration, the icon can be set by 
passing an icon key or calling `->icon()` to the resource itself, example:

```php
ExternalLink::make([
    ...
    'icon' => function() { return '<svg>...</svg>' }, // or
    'icon' => '<svg>...</svg>',
]);

ExternalLink::make(...)->icon(function() { return '<svg>...</svg>' }); // or
ExternalLink::make(...)->icon('<svg>...</svg>');
```

![Icons](https://raw.githubusercontent.com/dcasia/collapsible-resource-manager/master/screenshots/menu-icons.png)

## License

The MIT License (MIT). Please see [License File](https://raw.githubusercontent.com/dcasia/collapsible-resource-manager/master/LICENSE) for more information.
