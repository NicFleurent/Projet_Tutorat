@extends('layouts.app')
    @section('title',"Liste Jumelage")
    @section('css')
        <link rel="stylesheet" href="">
    @show
    @section('js')
        <script src=""></script>
    @endsection
    @section('content')
    @section('header',"Liste Jumelage")
    <div class="container container-table h-100">
        <div class="table-wrapper h-100 pb-5">
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Journee</th>
                        <th>Heure</th>
                        <th>Demande Acceptée</th>
                        <th>Cours ID</th>
                        <th>Tuteur ID</th>
                        <th>Aider ID</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($jumelages as $jumelage)
                        <tr>
                            <td>{{ $jumelage->id }}</td>
                            <td>{{ $jumelage->journee }}</td>
                            <td>{{ $jumelage->heure }}</td>
                            <td>{{ $jumelage->demande_accepte == 1 ? "Oui" : "Non" }}</td>
                            <td>{{ $jumelage->cours_id }}</td>
                            <td>{{ $jumelage->tuteur_id }}</td>
                            <td>{{ $jumelage->aider_id }}</td>
                            <td><a href="{{ route('editJumelage', $jumelage->id) }}"><img src="{{ asset('svg/tools.svg') }}" alt="Modifier"></a></td>
                            <td><a><img src="{{ asset('svg/trash.svg') }}" alt="Supprimer"></a></td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
    </div>

@endsection