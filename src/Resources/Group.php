<?php

namespace DigitalCreative\CollapsibleResourceManager\Resources;

use Illuminate\Http\Request;

class Group extends TopLevelResource
{
    protected $type = 'group';

    public function authorizedToSee(Request $request)
    {
        $authorized = collect($this->resources())->some(function ($resource) use ($request) {
            return $this->parseResource($resource)->authorizedToSee($request);
        });

        return $authorized && parent::authorizedToSee($request);
    }

    public function jsonSerialize(): array
    {
        return array_merge(parent::jsonSerialize(), [
            'expanded' => $this->data->get('expanded', false),
            'badge' => null,
        ]);
    }
}
