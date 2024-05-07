<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Edit Jumelage</title>
    <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="{{ asset('css/login.css') }}">
</head>
<body>
    <div class="left-rectangle"></div>

    <div class="header">
        <h1>Tutorat</h1>
        <h2>Modifier le jumelage</h2>
    </div>

    <div class="right-rectangle"></div>

    @if(session('erreur'))
        <div class="alert alert-danger">
            {{ session('erreur') }}
        </div>
    @endif
    
    <form action="{{ route('updateJumelage', $jumelage->id) }}" method="POST">
        @csrf
        @method('PUT')
        
        <label for="journee">Journée:</label>
        <input type="text" id="journee" name="journee" value="{{ $jumelage->journee }}" required>

        <label for="heure">Heure:</label>
        <input type="time" id="heure" name="heure" value="{{ $jumelage->heure }}" required>

        <label for="demande_accepte">Demander:</label>
        <select id="demande_accepte" name="demande_accepte" required>
            <option value="1" {{ $jumelage->demande_accepte ? 'selected' : '' }}>Oui</option>
            <option value="0" {{ !$jumelage->demande_accepte ? 'selected' : '' }}>Non</option>
        </select>
</br>
        <button type="submit" class="button">Enregistrer les modifications</button>
    </form>

</body>
</html>
