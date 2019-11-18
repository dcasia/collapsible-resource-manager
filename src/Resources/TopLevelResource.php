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
        return $this->data->get('resources', []);
    }

    /**
     * @param $resource
     *
     * @return AbstractResource
     */
    private function parseResource($resource): AbstractResource
    {

        if (is_subclass_of($resource, Resource::class)) {

            return new NovaResource($resource);

        }

        return $resource;

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

        };

        return [
            'id' => $this->id,
            'type' => $this->type,
            'label' => $this->data->get('title'),
            'icon' => $this->getIcon(),
            'resources' => array_filter($resources)
        ];

    }

}
