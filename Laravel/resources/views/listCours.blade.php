@extends('layouts.app')
    @section('title',"Liste Cours")
    @section('css')
        <link rel="stylesheet" href="">
    @show
    @section('js')
        <script src=""></script>
    @endsection
    @section('content')
    @section('header',"Liste Cours")
    <div class="container container-table h-100">
        <a class="bouton" href="{{ route('ajoutCour') }}">Ajouter un cours</a>
        <div class="table-wrapper h-100 pb-5">
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Numero</th>
                        <th>Nom</th>
                        <th>Responsable</th>
                        <th>Programme</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($cours as $cour)
                        <tr>
                            <td>{{ $cour->id }}</td>
                            <td>{{ $cour->numero }}</td>
                            <td>{{ $cour->nom }}</td>
                            <td>{{ $cour->responsable->prenom }} {{ $cour->responsable->nom }}</td>
                            <td>{{ $cour->programme->numero }}</td>
                            <td><a href="{{ route('editCour', $cour->id) }}"><img src="{{ asset('svg/tools.svg') }}" alt="Modifier"></a></td>
                            <td><a><img src="{{ asset('svg/trash.svg') }}" alt="Supprimer"></a></td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
    </div>

@endsection