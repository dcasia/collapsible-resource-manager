<?php

namespace DigitalCreative\CollapsibleResourceManager;

use Illuminate\View\View;
use Laravel\Nova\Nova;
use Laravel\Nova\Tool;
use Laravel\Nova\Tools\ResourceManager;

class CollapsibleResourceManager extends Tool
{

    /**
     * @var array
     */
    private $config;

    /**
     * @var array
     */
    private $defaults = [
        'disable_default_resource_manager' => true,
        'remember_menu_state' => false,
        'navigation' => []
    ];

    public function __construct(array $config)
    {
        $this->config = array_merge($this->defaults, $config);
    }

    /**
     * Perform any tasks that need to happen when the tool is booted.
     *
     * @return void
     */
    public function boot()
    {

        Nova::script('collapsible-resource-manager', __DIR__ . '/../dist/js/tool.js');

        if ($this->config[ 'disable_default_resource_manager' ]) {

            /**
             * Remove the default resource manager
             */
            foreach (Nova::$tools as $index => $tool) {

                if ($tool instanceof ResourceManager) {

                    unset(Nova::$tools[ $index ]);

                }

            }

        }

    }

    /**
     * Build the view that renders the navigation links for the tool.
     *
     * @return View
     */
    public function renderNavigation()
    {
        return view('collapsible-resource-manager::navigation', [
            'rememberMenuState' => $this->config[ 'remember_menu_state' ],
            'navigation' => $this->setResourcesIds($this->config[ 'navigation' ])
        ]);
    }

    private function setResourcesIds(array $resources, $root = null)
    {

        foreach ($resources as $index => $resource) {

            if ($resource instanceof TopLevelResource) {

                $resource->setId($root . $index);

                $this->setResourcesIds($resource->resources(), $index . '_');

            }

        }

        return $resources;

    }

}
