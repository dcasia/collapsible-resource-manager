<?php

namespace DigitalCreative\CollapsibleResourceManager\Resources;

class InternalLink extends AbstractResource
{
    /**
     * Specify data which should be serialized to JSON
     */
    public function jsonSerialize(): array
    {
        return [
            'type' => 'internal_link',
            'badge' => $this->getBadge(),
            'icon' => $this->getIcon(),
            'label' => $this->getLabel(),
            'target' => $this->data->get('target', '_blank'),
            'router' => [
                'path' => $this->data->get('path'),
                'query' => $this->data->get('query'),
                'params' => $this->data->get('params'),
            ],
        ];
    }
}
