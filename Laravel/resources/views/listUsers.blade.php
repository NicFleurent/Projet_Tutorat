@extends('layouts.app')
    @section('title',"List Utilisateur")
    @section('css')
        <link rel="stylesheet" href="">
    @show
    @section('content')
    @section('header',"List Utilisateur")
    <div class="container">
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Email</th>
                    <th>Prenom</th>
                    <th>Nom</th>
                    <th>Role</th>
                    <th>Activer</th>
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
                        <td>{{ $user->activer}}</td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    </div>

@endsection