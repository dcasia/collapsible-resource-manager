<?php

namespace DigitalCreative\CollapsibleResourceManager;

use Illuminate\Support\ServiceProvider;

class CollapsibleResourceManagerServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {

        $this->publishes([
            __DIR__ . '/../config/collapsible-resource-manager.php' => config_path('collapsible-resource-manager.php'),
        ], 'config');

        $this->loadViewsFrom(__DIR__ . '/../resources/views', 'collapsible-resource-manager');

    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->mergeConfigFrom(__DIR__ . '/../config/collapsible-resource-manager.php', 'collapsible-resource-manager');
    }
}
