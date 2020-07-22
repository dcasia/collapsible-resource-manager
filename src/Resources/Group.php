<?php

namespace DigitalCreative\CollapsibleResourceManager\Resources;

class Group extends TopLevelResource
{
    protected $type = 'group';

    public function jsonSerialize(): array
    {
        return array_merge(parent::jsonSerialize(), [
            'expanded' => $this->data->get('expanded', false),
            'badge' => null,
        ]);
    }
}
