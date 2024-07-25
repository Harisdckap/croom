<?php

namespace App\Http\Controllers\Auth;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\OTPVerification;
use App\Models\User;

class OTPVerificationController extends Controller
{
    public function verifyOtp(Request $request)
    {
        $request->validate([
            'otp' => 'required|numeric',
        ]);

        $otpVerification = OTPVerification::where('otp', $request->otp)
                                            ->where('otp_expire_at', '>', now())
                                            ->first();

        if (!$otpVerification) {
            return response()->json(['error' => 'Invalid or expired OTP.'], 422);
        }

        $user = User::find($otpVerification->user_id);
        $user->email_verified_at = now();
        $user->save();

        $otpVerification->delete();

        return response()->json(['success' => true, 'message' => 'Email verified successfully.']);
    }
}
