<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Edit Session</title>
    <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="{{ asset('css/login.css') }}">
</head>
<body>
    <div class="left-rectangle"></div>

    <div class="header">
        <h1>Tutorat</h1>
        <h2>Edit Session</h2>
    </div>

    <div class="right-rectangle"></div>

    @if(session('erreur'))
        <div class="alert alert-danger">
            {{ session('erreur') }}
        </div>
    @endif
    
    <form action="{{ route('updateSession', $session->id) }}" method="POST">
        @csrf
        @method('PUT')
        
        <label for="nom">Nom:</label>
        <input type="text" id="nom" name="nom" value="{{ $session->nom }}" required>

        <label for="debut">Debut:</label>
        <input type="date" id="debut" name="debut" value="{{ $session->debut }}" required>

        <label for="fin">Fin:</label>
        <input type="date" id="fin" name="fin" value="{{ $session->fin }}" required>

        <label for="session_courante">Session Courante:</label>
        <select id="session_courante" name="session_courante" required>
            <option value="1" {{ $session->session_courante ? 'selected' : '' }}>Oui</option>
            <option value="0" {{ !$session->session_courante ? 'selected' : '' }}>Non</option>
        </select>
</br>
        <button type="submit" class="button">Enregistrer les modifications</button>
    </form>

</body>
</html>
