<?php

return [
    /**
     * If false the default resource manager will coexist with this tool
     */
    'disable_default_resource_manager' => true,

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
//            'resources' => [
//                \App\Nova\User::class,
//                'Custom Label' => \App\Nova\User::class,
//                'Internal Link' => '/custom/route',
//                'External Link' => 'https://example.com', // links starting with http opens in a new tab
//            ],
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
