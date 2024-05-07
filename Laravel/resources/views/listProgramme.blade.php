@extends('layouts.app')
    @section('title',"List Programme")
    @section('css')
        <link rel="stylesheet" href="">
    @show
    @section('js')
        <script src=""></script>
    @endsection
    @section('content')
    @section('header',"List Programme")
    <div class="container">
        <div class="table-wrapper">
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Numero</th>
                        <th>Nom</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($programme as $programme)
                        <tr>
                            <td>{{ $programme->id }}</td>
                            <td>{{ $programme->numero }}</td>
                            <td>{{ $programme->nom }}</td>
                            <td><a href="{{ route('editProgramme', $programme->id) }}"><img src="{{ asset('svg/tools.svg') }}" alt="Modifier"></a></td>
                            <td><a onclick=""><img src="{{ asset('svg/trash.svg') }}" alt="Supprimer"></a></td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
    </div>

@endsection