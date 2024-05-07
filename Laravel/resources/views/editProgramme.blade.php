<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Edit Programme</title>
    <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="{{ asset('css/login.css') }}">
</head>
<body>
    <div class="left-rectangle"></div>

    <div class="header">
        <h1>Tutorat</h1>
        <h2>Edit Programme</h2>
    </div>

    <div class="right-rectangle"></div>

    @if(session('erreur'))
        <div class="alert alert-danger">
            {{ session('erreur') }}
        </div>
    @endif
    
    <form action="{{ route('updateProgramme', $programme->id) }}" method="POST">
        @csrf
        @method('PUT')
        
        <label for="numero">Numero:</label>
        <input type="text" id="numero" name="numero" value="{{ $programme->numero }}" required>

        <label for="nom">Nom:</label>
        <input type="text" id="nom" name="nom" value="{{ $programme->nom }}" required>

</br>
        <button type="submit" class="button">Enregistrer les modifications</button>
    </form>

</body>
</html>
