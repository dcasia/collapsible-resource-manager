<?php

namespace DigitalCreative\CollapsibleResourceManager\Resources;

use Closure;
use Illuminate\Support\Fluent;
use JsonSerializable;
use Laravel\Nova\AuthorizedToSee;
use Laravel\Nova\Lenses\Lens;
use Laravel\Nova\Resource;

abstract class AbstractResource implements JsonSerializable
{

    use AuthorizedToSee;

    /**
     * @var object
     */
    protected $data;

    /**
     * @var Closure|string $icon
     */
    protected $icon;

    /**
     * @var Closure|string $icon
     */
    protected $label;

    /**
     * @var Closure|string|int $badge
     */
    protected $badge;

    /**
     * AbstractResource constructor.
     *
     * @param array $data
     */
    public function __construct(array $data)
    {
        $this->data = new Fluent($data);
    }

    /**
     * Create a new element.
     *
     * @param array $arguments
     *
     * @return static
     */
    public static function make(...$arguments)
    {
        return new static(...$arguments);
    }

    /**
     * @param string|int|Closure $badge
     *
     * @return AbstractResource
     */
    public function badge($badge): self
    {
        $this->badge = $badge;

        return $this;
    }

    /**
     * @param Closure|string $label
     *
     * @return AbstractResource
     */
    public function label($label): self
    {
        $this->label = $label;

        return $this;
    }

    /**
     * @param Closure|string $icon
     *
     * @return AbstractResource
     */
    public function icon($icon): self
    {
        $this->icon = $icon;

        return $this;
    }

    /**
     * @param string $resource
     */
    public function setBadgeFromResource(string $resource)
    {
        $this->badge(
            method_exists($resource, 'badge') ? $resource::badge() : null
        );
    }

    /**
     * @param string $resource
     */
    public function setLabelFromResource(string $resource)
    {
        if (is_subclass_of($resource, Resource::class)) {

            $this->label($resource::label());

        }

        if (is_subclass_of($resource, Lens::class)) {

            $this->label((new $resource)->name());

        }

    }

    /**
     * @param string $resource
     */
    public function setIconFromResourceIfExists(string $resource)
    {
        $this->icon(
            method_exists($resource, 'icon') ? $resource::icon() : null
        );
    }

    protected function getBadge(): ?string
    {
        return $this->getAttribute('badge');
    }

    protected function getLabel(): ?string
    {
        return $this->getAttribute('label');
    }

    protected function getIcon(): ?string
    {
        return $this->getAttribute('icon');
    }

    protected function getAttribute(string $key): ?string
    {
        if ($this->$key !== null) {

            return value($this->$key);

        }

        if ($this->data && ($found = $this->data->get($key))) {

            return value($found);

        }

        return null;

    }

}
