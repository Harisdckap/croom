<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Register</title>
    <link href="{{ mix('css/app.css') }}" rel="stylesheet">
</head>
<body>
    <div class="container">
        <h1>Register</h1>
        <form id="registerForm" autocomplete="off" method="post">
        
            <div class="form-group">
                <label for="name">Name</label>
                <input type="text" id="name" class="form-control" required>
            </div>
            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" class="form-control" required>
            </div>
            <div class="form-group">
                <label for="role">How you are?</label>
                <select id="role" class="form-control">
                    <option value="pg">PG</option>
                    <option value="room">Room</option>
                    <option value="pg_owner">I am PG Owner</option>
                    <option value="flat_owner">I am Flat Owner</option>
                </select>
            </div>
            <div class="form-group">
                <label for="gender">Gender</label>
                <select id="gender" class="form-control">
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>
            </div>
            <div class="form-group">
                <label for="mobile">Mobile No</label>
                <input type="tel" id="mobile" class="form-control" required>
            </div>
            <button type="button" id="registerBtn" class="btn btn-primary">Register</button>
        </form>
    </div>
    <script src="{{ mix('js/main.jsx') }}"></script>
</body>
</html>
