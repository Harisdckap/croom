<!DOCTYPE html>
<html>
<head>
    <title>Password Reset Request</title>
</head>
<body>
    <p>You are receiving this email because we received a password reset request for your account.</p>
    <p>Click the link below to reset your password:</p>
    <a href="http://localhost:5173/password/reset?token={{ $token }}&email={{ $email }}" class="button">Reset Password</a>
    <p>If you did not request a password reset, no further action is required.</p>
</body>
</html>

