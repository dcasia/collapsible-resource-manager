@foreach($navigation as $group)

    <collapsible-resource-manager :data='@json($group)'
                                  :remember-menu-state="@json($rememberMenuState)">
    </collapsible-resource-manager>

@endforeach
