@foreach($navigation as $resource)

    <collapsible-resource-manager :data='@json($resource)'
                                  :remember-menu-state="@json($rememberMenuState)">
    </collapsible-resource-manager>

@endforeach
