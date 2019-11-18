<?php

namespace DigitalCreative\CollapsibleResourceManager\Resources;

use Closure;
use Illuminate\Support\Fluent;
use JsonSerializable;
use Laravel\Nova\AuthorizedToSee;

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
     * @return static
     */
    public static function make(...$arguments)
    {
        return new static(...$arguments);
    }

    /**
     * @param Closure|string $icon
     * @return AbstractResource
     */
    public function icon($icon): self
    {
        $this->icon = $icon;

        return $this;
    }

    public function setIconFromResourceIfExists(string $resource)
    {
        $this->icon(
            method_exists($resource, 'icon') ? $resource::icon() : null
        );
    }

    protected function getIcon(): ?string
    {

        if ($this->icon) {

            return is_callable($this->icon) ? call_user_func($this->icon) : $this->icon;

        }

        if ($this->data && ($icon = $this->data->get('icon'))) {

            return $icon;

        }

        return null;

    }

}
