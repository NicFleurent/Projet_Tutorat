@extends('layouts.app')
    @section('title',"Liste Sessions")
    @section('css')
        <link rel="stylesheet" href="">
    @show
    @section('js')
        <script src=""></script>
    @endsection
    @section('content')
    @section('header',"Liste Sessions")
    <div class="container container-table h-100">
        <div class="table-wrapper h-100 pb-5">
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nom</th>
                        <th>Debut</th>
                        <th>Fin</th>
                        <th>Session Courante</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($sessions as $session)
                        <tr>
                            <td>{{ $session->id }}</td>
                            <td>{{ $session->nom }}</td>
                            <td>{{ $session->debut }}</td>
                            <td>{{ $session->fin }}</td>
                            <td>{{ $session->session_courante == 1 ? "Oui" : "Non" }}</td>
                            <td><a href="{{ route('editSession', $session->id) }}"><img src="{{ asset('svg/tools.svg') }}" alt="Modifier"></a></td>
                            <td><a><img src="{{ asset('svg/trash.svg') }}" alt="Supprimer"></a></td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
    </div>

@endsection