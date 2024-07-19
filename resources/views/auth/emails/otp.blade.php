<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OTP Verification</title>
    <style>
        body {
            font-family: 'Montserrat', sans-serif;
            background-color: #f1f1f1;
        }
        .email-container {
            max-width: 680px;
            margin: auto;
            background: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .header {
            background-color: #333;
            color: #fff;
            text-align: center;
            padding: 20px;
            border-radius: 8px 8px 0 0;
        }
        .content {
            padding: 20px;
            text-align: center;
        }
        .button {
            background-color: #26a4d3;
            color: #fff;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            font-size: 16px;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>C-room</h1>
        </div>
        <div class="content">
            <h2>Your OTP Code</h2>
            <p>Thank you for registering with C-room. Please use the following OTP to verify your account:</p>
            <h3>{{ $otp }}</h3>
            <p>This OTP will expire in 10 minutes.</p>
            <a href="http://localhost:5173/verifyotp?token={{ $auth_token }}" class="button">Verify OTP</a>
        </div>
    </div>
</body>
</html>
