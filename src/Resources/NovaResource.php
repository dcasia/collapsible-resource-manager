<?php

namespace DigitalCreative\CollapsibleResourceManager\Resources;

use App\Nova\Resource;
use Closure;
use Illuminate\Http\Request;
use Laravel\Nova\Lenses\Lens;

class NovaResource extends AbstractResource
{
    /**
     * @var Lens
     */
    private $resource;

    /**
     * @var string
     */
    private $view = 'index';

    /**
     * @var int
     */
    private $resourceId;

    /**
     * NovaResource constructor.
     *
     * @param string $resource
     */
    public function __construct(string $resource)
    {
        $this->resource = $resource;
        $this->setBadgeFromResource($resource);
        $this->setIconFromResourceIfExists($resource);
        $this->setLabelFromResource($resource);
    }

    public function authorizedToSee(Request $request)
    {

        if ($this->seeCallback) {

            return call_user_func($this->seeCallback, $request);

        }

        if ($this->view === 'index') {

            return
                $this->resource::authorizedToViewAny($request) &&
                $this->resource::availableForNavigation($request);

        }

        /**
         * @var Resource $resource
         */
        $resource = new $this->resource($this->resource::newModel());

        if ($this->view === 'edit') {

            return $resource->authorizedToUpdate($request);

        }

        if ($this->view === 'create') {

            return $resource->authorizedToCreate($request);

        }

        return true;
    }

    /**
     * @param Closure|int $resourceId
     *
     * @return $this
     */
    public function detail($resourceId): self
    {
        $this->view = 'detail';
        $this->resourceId = $resourceId;

        return $this;
    }

    /**
     * @param Closure|int $resourceId
     *
     * @return $this
     */
    public function edit($resourceId): self
    {
        $this->view = 'edit';
        $this->resourceId = $resourceId;

        return $this;
    }

    /**
     * Alias for edit
     *
     * @param Closure|int $resourceId
     *
     * @return $this
     */
    public function update($resourceId): self
    {
        return $this->edit($resourceId);
    }

    /**
     * @return $this
     */
    public function create(): self
    {
        $this->view = 'create';

        return $this;
    }

    /**
     * @return $this
     */
    public function index(): self
    {
        $this->view = 'index';

        return $this;
    }

    /**
     * Specify data which should be serialized to JSON
     */
    public function jsonSerialize(): array
    {
        return [
            'type' => 'nova_resource',
            'badge' => $this->getBadge(),
            'icon' => $this->getIcon(),
            'label' => $this->getLabel(),
            'router' => [
                'name' => $this->view,
                'params' => [
                    'resourceName' => $this->resource::uriKey(),
                    'resourceId' => is_callable($this->resourceId) ? call_user_func($this->resourceId) : $this->resourceId,
                ],
            ],
        ];
    }
}
