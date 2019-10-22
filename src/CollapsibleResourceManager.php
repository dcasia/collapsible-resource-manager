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

        if (config('collapsible-resource-manager.disable_default_resource_manager', true)) {

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
     *
     * @return array
     */
    private function serializeGroups(array $navigation): array
    {

        foreach ($navigation as &$item) {

            $item[ 'title' ] = isset($item[ 'title' ]) ? $this->translateKey($item[ 'title' ]) : null;
            $item[ 'resources' ] = $this->resolveResources($item[ 'resources' ] ?? []);
            $item[ 'groups' ] = $this->parseGroups($item[ 'groups' ] ?? []);

        }

        return $navigation;

    }

    private function translateKey(?string $key): string
    {

        if ($key && config('collapsible-resource-manager.translate_title', false)) {

            return __($key);

        }

        return $key;

    }

    private function resolveResources(array $resources): Collection
    {
        return collect($resources)->map(function ($resource, $key) {

            if (is_array($resource)) {

                return array_merge($this->serializeGroups([ $resource ])[ 0 ], [ 'recursive' => true ]);

            }

            if (!class_exists($resource)) {

                return [
                    'absolute' => true,
                    'label' => is_numeric($key) ? $resource : $this->translateKey($key),
                    'route' => $resource
                ];

            }

            if ($resource::authorizedToViewAny(request()) && $resource::availableForNavigation(request())) {

                return [
                    'icon' => method_exists($resource, 'icon') ? $resource::icon() : null,
                    'label' => is_numeric($key) ? $resource::label() : $this->translateKey($key),
                    'route' => $resource::uriKey()
                ];

            }

        })->filter();
    }

    private function parseGroups(array $groups): Collection
    {
        return collect($groups)->map(function (array $group) {

            $group[ 'title' ] = $this->translateKey($group[ 'title' ] ?? null);
            $group[ 'resources' ] = $this->resolveResources($group[ 'resources' ] ?? []);

            return $group;

        });

    }
}
