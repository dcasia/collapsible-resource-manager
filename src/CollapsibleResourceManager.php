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
     * @var string $title
     */
    private $title;

    /**
     * @var Collection $groups
     */
    private $groups;

    /**
     * @var string $icon
     */
    private $icon;

    /**
     * BetterMenu constructor.
     *
     * @param null|string $title
     */
    public function __construct(string $title = null)
    {
        $this->title = $title;
        $this->groups = collect();
    }

    /**
     * Perform any tasks that need to happen when the tool is booted.
     *
     * @return void
     */
    public function boot()
    {

        Nova::script('collapsible-resource-manager', __DIR__ . '/../dist/js/tool.js');

        /**
         * Remove the default resource manager
         */
        foreach (Nova::$tools as $index => $tool) {

            if ($tool instanceof ResourceManager) {

                unset(Nova::$tools[ $index ]);

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
            'groups' => $this->serializeGroups($this->groups),
            'title' => $this->title,
            'icon' => $this->icon,
        ]);
    }

    /**
     * @param string $icon
     *
     * @return $this
     */
    public function icon(string $icon): self
    {
        $this->icon = $icon;

        return $this;
    }

    /**
     * @param string $title
     *
     * @return $this
     */
    public function title(string $title): self
    {
        $this->title = $title;

        return $this;
    }

    /**
     * @param array $group
     *
     * @return $this
     */
    public function addGroup(array $group): self
    {
        $this->groups->push($group);

        return $this;
    }

    /**
     * @param Collection $groups
     *
     * @return Collection
     */
    private function serializeGroups(Collection $groups): Collection
    {
        return $groups->map(function (array $group) {

            $group[ 'resources' ] = collect($group[ 'resources' ])->map(function ($resource) {
                return [
                    'label' => $resource::label(),
                    'route' => $resource::uriKey()
                ];
            });

            return $group;

        });
    }
}
