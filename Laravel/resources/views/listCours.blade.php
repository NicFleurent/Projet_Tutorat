@extends('layouts.app')
    @section('title',"List Cours")
    @section('css')
        <link rel="stylesheet" href="">
    @show
    @section('js')
        <script src=""></script>
    @endsection
    @section('content')
    @section('header',"List Cours")
    <div class="container">
        <div class="table-wrapper">
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Numero</th>
                        <th>Nom</th>
                        <th>Responsable ID</th>
                        <th>Programme ID</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($cours as $cour)
                        <tr>
                            <td>{{ $cour->id }}</td>
                            <td>{{ $cour->numero }}</td>
                            <td>{{ $cour->nom }}</td>
                            <td>{{ $cour->responsable_id}}</td>
                            <td>{{ $cour->programme_id}}</td>
                            <td><a href="{{ route('editCour', $cour->id) }}"><img src="{{ asset('svg/tools.svg') }}" alt="Modifier"></a></td>
                            <td><a><img src="{{ asset('svg/trash.svg') }}" alt="Supprimer"></a></td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
    </div>

@endsection