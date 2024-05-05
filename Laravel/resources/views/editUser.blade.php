<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Edit Utilisateur</title>
    <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="{{ asset('css/login.css') }}">
</head>
<body>
    <div class="left-rectangle"></div>

    <div class="header">
        <h1>Tutorat</h1>
        <h2>Edit Utilisateur</h2>
    </div>

    <div class="right-rectangle"></div>

    @if(session('erreur'))
        <div class="alert alert-danger">
            {{ session('erreur') }}
        </div>
    @endif
    
    <form action="{{ route('updateUser', $user->id) }}" method="POST">
        @csrf
        @method('PUT')
        
        <label for="prenom">Prenom:</label>
        <input type="text" id="prenom" name="prenom" value="{{ $user->prenom }}" required>

        <label for="nom">Nom:</label>
        <input type="text" id="nom" name="nom" value="{{ $user->nom }}" required>

        <label for="email">Email:</label>
        <input type="email" id="email" name="email" value="{{ $user->email }}" required>

        <label for="password">Nouveau mot de passe:</label>
        <input type="password" id="password" name="password">

        <label for="activer">Activer:</label>
        <select id="activer" name="activer" required>
            <option value="1" {{ $user->activer ? 'selected' : '' }}>Oui</option>
            <option value="0" {{ !$user->activer ? 'selected' : '' }}>Non</option>
        </select>
</br>
        <button type="submit" class="button">Enregistrer les modifications</button>
    </form>

</body>
</html>
