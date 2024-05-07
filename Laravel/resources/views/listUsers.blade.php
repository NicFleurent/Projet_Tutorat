@extends('layouts.app')
    @section('title',"Liste Utilisateurs")
    @section('css')
        <link rel="stylesheet" href="">
    @show
    @section('js')
        <script src="{{ asset('js/disableConfirmUser.js') }}"></script>
    @endsection
    @section('content')
    @section('header',"Liste Utilisateurs")
    <div class="container container-table h-100">
        <div class="table-wrapper h-100 pb-5">
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Courriel</th>
                        <th>Prénom</th>
                        <th>Nom</th>
                        <th>Rôle</th>
                        <th>Activé</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($users as $user)
                        <tr>
                            <td>{{ $user->id }}</td>
                            <td>{{ $user->email }}</td>
                            <td>{{ $user->prenom }}</td>
                            <td>{{ $user->nom }}</td>
                            <td>{{ $user->role }}</td>
                            <td>{{ $user->activer == 1 ? "Actif" : "Inactif" }}</td>
                            <td><a href="{{ route('editUser', $user->id) }}"><img src="{{ asset('svg/tools.svg') }}" alt="Modifier"></a></td>
                            <td><a onclick="confirmDisableUser({{ $user->id }})"><img src="{{ asset('svg/trash.svg') }}" alt="Supprimer"></a></td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
    </div>

@endsection