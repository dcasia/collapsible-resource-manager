<?php

namespace DigitalCreative\CollapsibleResourceManager\Resources;

class ExternalLink extends AbstractResource
{
    /**
     * Specify data which should be serialized to JSON
     */
    public function jsonSerialize(): array
    {
        return [
            'type' => 'external_link',
            'badge' => $this->getBadge(),
            'icon' => $this->getIcon(),
            'label' => $this->getLabel(),
            'url' => $this->data->get('url'),
            'target' => $this->data->get('target', '_blank'),
        ];
    }
}
