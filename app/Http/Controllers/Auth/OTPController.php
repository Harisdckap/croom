<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\OTPVerification;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;

class OTPController extends Controller
{
    public function verifyOTP(Request $request)
    {
        $otp = $request->otp;

        $otpRecord = OTPVerification::where('otp', $otp)
            ->where('otp_expire_at', '>', Carbon::now())
            ->first();

        if ($otpRecord) {
            return response()->json(['success' => true, 'message' => 'OTP verified successfully']);
        } else {
            return response()->json(['success' => false, 'message' => 'Invalid or expired OTP'], 422);
        }
    }

    public function getOTP(Request $request)
    {
        $user_id = $request->user_id;

        Log::info('Fetching OTP for user_id: ' . $user_id); // Add this line

        $otpRecord = OTPVerification::where('user_id', $user_id)
            ->orderBy('created_at', 'desc')
            ->first();

        if ($otpRecord) {
            Log::info('OTP found: ' . $otpRecord->otp); // Add this line
            return response()->json(['success' => true, 'otp' => $otpRecord->otp]);
        } else {
            Log::info('No OTP found for user_id: ' . $user_id); // Add this line
            return response()->json(['success' => false, 'message' => 'No OTP found'], 404);
        }
    }
}
