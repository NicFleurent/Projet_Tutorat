@extends('layouts.app')
    @section('title',"Liste Session")
    @section('css')
        <link rel="stylesheet" href="">
    @show
    @section('js')
        <script src=""></script>
    @endsection
    @section('content')
    @section('header',"Liste Session")
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
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($sessions as $session)
                        <tr>
                            <td>{{ $session->id }}</td>
                            <td>{{ $session->nom }}</td>
                            <td>{{ $session->debut }}</td>
                            <td>{{ $session->fin }}</td>
                            <td>{{ $session->session_courante}}</td>
                            <td><a href="{{ route('editSession', $session->id) }}"><img src="{{ asset('svg/tools.svg') }}" alt="Modifier"></a></td>
                            <td><a><img src="{{ asset('svg/trash.svg') }}" alt="Supprimer"></a></td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
    </div>

@endsection