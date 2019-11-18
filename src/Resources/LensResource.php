<?php

namespace DigitalCreative\CollapsibleResourceManager\Resources;

use Laravel\Nova\Lenses\Lens;
use Laravel\Nova\Resource;

class LensResource extends AbstractResource
{
    /**
     * @var Resource
     */
    private $resource;

    /**
     * @var Lens
     */
    private $lens;

    /**
     * NovaResource constructor.
     *
     * @param string $resource
     * @param string $lens
     */
    public function __construct(string $resource, string $lens)
    {
        $this->resource = $resource;
        $this->lens = $lens;
        $this->setIconFromResourceIfExists($lens);
    }

    /**
     * Specify data which should be serialized to JSON
     */
    public function jsonSerialize(): array
    {
        /**
         * @var Lens $lensInstance
         */
        $lensInstance = new $this->lens;

        return [
            'type' => 'nova_resource',
            'icon' => $this->getIcon(),
            'label' => $lensInstance->name(),
            'router' => [
                'name' => 'lens',
                'params' => [
                    'resourceName' => $this->resource::uriKey(),
                    'lens' => $lensInstance->uriKey()
                ]
            ]
        ];
    }
}
