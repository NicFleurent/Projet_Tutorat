<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
    @if(session('erreur'))
        <div class="alert alert-danger">
            {{ session('erreur') }}
        </div>
    @endif

    <form method="post" action="{{ route('Login') }}" enctype="multipart/form-data">
    @csrf
        <div class="main-container">
            <label for="email">Email:</label>
            <input type="text" class="form-control" id="email" name="email" required>
            
            <label for="password">Mot de passe:</label>
            <input type="password" class="form-control" id="password" name="password" required>
</br>
            <button type="submit" class="button">Se connecter</button>
        </div>
        
    </form>
</body>
</html>