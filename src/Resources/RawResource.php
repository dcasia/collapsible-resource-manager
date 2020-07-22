<?php

namespace DigitalCreative\CollapsibleResourceManager\Resources;

class RawResource extends AbstractResource
{
    /**
     * Specify data which should be serialized to JSON
     */
    public function jsonSerialize(): array
    {
        return [
            'type' => 'raw_resource',
            'badge' => $this->getBadge(),
            'icon' => $this->getIcon(),
            'label' => $this->getLabel(),
            'target' => $this->data->get('target', '_blank'),
            'router' => [
                'name' => $this->data->get('name'),
                'path' => $this->data->get('path'),
                'params' => $this->data->get('params'),
                'query' => $this->data->get('query'),
            ],
        ];
    }
}
