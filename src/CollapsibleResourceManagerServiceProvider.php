<?php

declare(strict_types = 1);

namespace DigitalCreative\CollapsibleResourceManager;

use Illuminate\Support\ServiceProvider;
use Laravel\Nova\Events\ServingNova;
use Laravel\Nova\Menu\MenuItem;
use Laravel\Nova\Nova;

class CollapsibleResourceManagerServiceProvider extends ServiceProvider
{
    public function boot(): void
    {
        MenuItem::macro('icon', function (string $value) {
            return $this->data(array_merge($this->data ?? [], [ 'icon' => $value ]));
        });

        Nova::serving(function (ServingNova $event): void {

            Nova::script('collapsible-resource-manager', __DIR__ . '/../dist/js/tool.js');
            Nova::style('collapsible-resource-manager', __DIR__ . '/../dist/css/card.css');

        });
    }
}
