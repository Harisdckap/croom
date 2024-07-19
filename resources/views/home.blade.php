<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Home</title>
    <link href="{{ mix('css/app.css') }}" rel="stylesheet">
</head>
<body>
    <div class="container">
        <h1>Welcome to the Rent Application</h1>
        <a href="{{ route('register') }}" class="btn btn-primary">Register</a>
    </div>
    <script src="{{ mix('js/main.jsx') }}"></script>
</body>
</html>
