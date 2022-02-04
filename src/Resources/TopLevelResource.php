<?php

namespace DigitalCreative\CollapsibleResourceManager\Resources;

use Laravel\Nova\Http\Requests\NovaRequest;
use Laravel\Nova\Resource;

class TopLevelResource extends AbstractResource
{

    /**
     * @var string
     */
    protected $type = 'top_level';

    /**
     * @var string
     */
    protected $id;

    /**
     * @var AbstractResource|null
     */
    protected $linkTo = null;

    /**
     * @var bool
     */
    protected $expanded = true;

    /**
     * @param string $id
     */
    public function setId(string $id): void
    {
        $this->id = $id;
    }

    /**
     * @return array
     */
    public function resources(): array
    {
        return value($this->data->get('resources', []));
    }

    public function linkToResource(AbstractResource $resource): self
    {
        $this->linkTo = $resource;

        return $this;
    }

    /**
     * Specify data which should be serialized to JSON
     */
    public function jsonSerialize(): array
    {

        $resources = [];
        $request = resolve(NovaRequest::class);

        /**
         * @var AbstractResource $resource
         */
        foreach ($this->resources() as $resource) {

            if (($resource = $this->parseResource($resource))->authorizedToSee($request)) {

                $resources[] = $resource;

            }

        }

        $linkToResource = $this->getLinkTo();

        return [
            'id' => $this->id,
            'type' => $this->type,
            'badge' => $this->getBadge(),
            'label' => $this->getLabel(),
            'expanded' => $this->data->get('expanded', null),
            'icon' => $this->getIcon() ?: ($linkToResource ? $linkToResource->getIcon() : null),
            'linkTo' => $linkToResource,
            'resources' => array_filter($resources),
        ];

    }

    protected function getLabel(): ?string
    {

        /**
         * Use set label if present
         */
        $label = parent::getLabel();

        /**
         * Otherwise try to find the label of the linkTo action
         */
        if (is_null($label) && ($linkTo = $this->getLinkTo())) {

            return $linkTo->getLabel();

        }

        return $label;

    }

    /**
     * @param $resource
     *
     * @return AbstractResource
     */
    protected function parseResource($resource): ?AbstractResource
    {

        $resource = value($resource);

        if (is_subclass_of($resource, Resource::class)) {

            return new NovaResource($resource);

        }

        return $resource;

    }

    private function getLinkTo(): ?AbstractResource
    {
        return once(function () {
            return $this->parseResource(
                $this->data->get('linkTo', $this->linkTo)
            );
        });
    }

}
