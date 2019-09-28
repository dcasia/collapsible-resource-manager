<?php

namespace DigitalCreative\CollapsibleResourceManager;

use Illuminate\Support\Collection;
use Illuminate\View\View;
use Laravel\Nova\Nova;
use Laravel\Nova\Tool;
use Laravel\Nova\Tools\ResourceManager;

class CollapsibleResourceManager extends Tool
{
    /**
     * Perform any tasks that need to happen when the tool is booted.
     *
     * @return void
     */
    public function boot()
    {

        Nova::script('collapsible-resource-manager', __DIR__ . '/../dist/js/tool.js');

        if (config('collapsible-resource-manager.disable_default_resource_manage', true)) {

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
            'navigation' => $this->serializeGroups(config('collapsible-resource-manager.navigation')),
        ]);
    }

    /**
     * @param array $navigation
     * @return array
     */
    private function serializeGroups(array $navigation): array
    {

        foreach ($navigation as &$item) {

            if (config('collapsible-resource-manager.translate_title', false)) {

                $this->translateTitle($item);

            }

            if (isset($item[ 'groups' ])) {

                $item[ 'groups' ] = $this->parseGroup($item[ 'groups' ]);

            }

        }

        return $navigation;

    }


    private function translateTitle(array &$data)
    {
        if (isset($data[ 'title' ])) {

            $data[ 'title' ] = trans($data[ 'title' ]);

        }
    }

    private function parseGroup(array $groups): Collection
    {
        return collect($groups)->map(function (array $group) {

            if (config('collapsible-resource-manager.translate_title', false)) {

                $this->translateTitle($group);

            }

            $group[ 'resources' ] = collect($group[ 'resources' ])->map(function (string $resource) {

                if ($resource::authorizedToViewAny(request())) {

                    return [
                        'label' => $resource::label(),
                        'route' => $resource::uriKey()
                    ];

                }

            })->filter();

            return $group;

        });

    }
}
