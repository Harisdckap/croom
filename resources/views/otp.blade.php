<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OTP Verification</title>
    <link href="{{ mix('css/app.css') }}" rel="stylesheet">
</head>
<body>
    <div class="container">
        <h1>OTP Verification</h1>
        <form id="otpForm">
            <div class="form-group">
                <label for="otp">OTP</label>
                <input type="text" id="otp" class="form-control" required>
            </div>
            <button type="button" id="verifyOtpBtn" class="btn btn-primary">Verify OTP</button>
        </form>
    </div>
    <script src="{{ mix('js/main.jsx') }}"></script>
</body>
</html>
