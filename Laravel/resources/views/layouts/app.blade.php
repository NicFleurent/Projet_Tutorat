<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="{{ asset('css/sidebar.css') }}">
    <link rel="stylesheet" href="{{ asset('css/layout.css') }}">
    <link rel="stylesheet" href="{{ asset('css/table.css') }}">
    <title>@yield('title')</title>
    @yield('css')
    @yield('js')
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
</head>
<body>
    <div class="PageName"><header><h1>@yield('header')</h1></header></div>

    <div class="sidebar">
        <a class="{{ request()->routeIs('listUsers') ? 'active' : '' }}" href="{{ route('listUsers') }}">Liste Utilisateurs</a>
        <a class="{{ request()->routeIs('listCours') ? 'active' : '' }}" href="{{ route('listCours') }}">Liste Cours</a>
        <a class="{{ request()->routeIs('listProgramme') ? 'active' : ''}}" href="{{ route('listProgramme') }}">Liste Programmes</a>
        <a class="{{ request()->routeIs('listSession') ? 'active' : ''}}" href="{{ route('listSession') }}">Liste Sessions</a>
        <a class="{{ request()->routeIs('listJumelage') ? 'active' : ''}}" href="{{ route('listJumelage') }}">Liste Jumelages</a>
        <form id="logout-form" action="{{ route('Logout') }}" method="POST">
            @csrf
            <a href="#" class="bottom-link" onclick="document.getElementById('logout-form').submit();">Déconnexion</a>
        </form>
    </div>

    @if(session('erreur'))
        <div class="alert alert-danger">
            {{ session('erreur') }}
        </div>
    @endif
    @if(session('success'))
    <div class="alert alert-success">
        {{ session('success') }}
    </div>
    @endif


    @yield('content')

</body>
</html>