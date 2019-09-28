@foreach($navigation as $group)

    <collapsible-resource-manager :data='@json($group)'></collapsible-resource-manager>

@endforeach
