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
        $this->setBadgeFromResource($lens);
        $this->setIconFromResourceIfExists($lens);
        $this->setLabelFromResource($lens);
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
            'type' => 'nova_lens_resource',
            'badge' => $this->getBadge(),
            'icon' => $this->getIcon(),
            'label' => $this->getLabel(),
            'router' => [
                'name' => 'lens',
                'params' => [
                    'resourceName' => $this->resource::uriKey(),
                    'lens' => $lensInstance->uriKey(),
                ],
            ],
        ];
    }
}
