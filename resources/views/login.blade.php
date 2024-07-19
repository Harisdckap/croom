<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <link href="{{ mix('css/app.css') }}" rel="stylesheet">
</head>
<body>
    <div class="container">
        <h1>Login</h1>
        <form id="loginForm" method="post">
            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" class="form-control" required>
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" id="password" class="form-control" required>
            </div>
            <button type="button" id="loginBtn" class="btn btn-primary">Login</button>
            <a href="{{ route('google.login') }}" class="btn btn-danger">Login with Google</a>
            <a href="{{ route('password.request') }}" class="btn btn-link">Forgot Your Password?</a>
        </form>
    </div>
    <script src="{{ mix('js/main.jsx') }}"></script>
</body>
</html>
