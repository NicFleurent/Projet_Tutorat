<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Edit Cours</title>
    <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="{{ asset('css/login.css') }}">
</head>
<body>
    <div class="left-rectangle"></div>

    <div class="header">
        <h1>Ajouter un cours</h1>
    </div>

    <div class="right-rectangle"></div>

    @if(session('erreur'))
        <div class="alert alert-danger">
            {{ session('erreur') }}
        </div>
    @endif
    
    <form action="{{ route('storeCour') }}" method="POST">
        @csrf
        @method('POST')
        
        <label for="numero">Numero:</label>
        <input type="text" id="numero" name="numero" value="{{ old('numero') }}" required>

        <label for="nom">Nom:</label>
        <input type="text" id="nom" name="nom" value="{{ old('nom') }}" required>

        <div class="select-subgroup">
            <label for="responsable_id">Responsable</label>
            <div class="select">
                <select class="form-control" id="responsable_id" name="responsable_id">
                    <option value="">Veuillez choisir un responsable</option>
    
                    @foreach($utilisateurs as $utilisateur)
                            <option value="{{ $utilisateur->id }}" {{ $utilisateur->id == old('responsable_id') ? 'selected' : null }}>
                                {{ $utilisateur->prenom }} {{ $utilisateur->nom }}
                            </option>
                    @endforeach
                </select>
            </div>
            @if($errors->has('responsable_id'))
                <span>{{ $errors->first('responsable_id') }}</span>
            @endif
        </div>

        <div class="select-subgroup">
            <label for="programme_id">Programme</label>
            <div class="select">
                <select class="form-control" id="programme_id" name="programme_id">
                    <option value="">Veuillez choisir un programme</option>

                    @foreach($programmes as $programme)
                            <option value="{{ $programme->id }}" {{ $utilisateur->id == old('programme_id') ? 'selected' : null }}>
                                {{ $programme->numero }} - {{ $programme->nom }}
                            </option>
                    @endforeach
                </select>
            </div>
            @if($errors->has('programme_id'))
                <span>{{ $errors->first('programme_id') }}</span>
            @endif
        </div>
        
</br>
        <button type="submit" class="button">Enregistrer le cours</button>
    </form>

</body>
</html>
