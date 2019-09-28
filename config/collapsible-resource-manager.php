<?php

return [
    /**
     * If false the default resource manager will coexist with this tool
     */
    'disable_default_resource_manage' => true,

    /**
     * If true all titles within navigation array will pass through laravel trans helper
     */
    'translate_title' => false,

    /**
     * Main navigation, each item on this array creates a new entry on the sidebar with an icon
     */
    'navigation' => [
        [
            'title' => 'Resource Title',
            'icon' => null, //<svg></svg> or <img src=""/>
            'groups' => [
                [
                    'title' => 'Group Title',
                    'expanded' => true,
                    'resources' => [
                        \App\Nova\User::class,
                    ]
                ]
            ]
        ]
    ]
];
