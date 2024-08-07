<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function show()
    {
        $user = Auth::user();
        return view('profile', ['user' => $user]);
    }

    public function update(Request $request)
    {
        $user = Auth::user();

        $validator = Validator::make($request->all(), [
            'username' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
            'mobile' => 'required|string|max:15',
            'gender' => 'required|string|in:Male,Female',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors(),
            ], 422);
        }

        $user->name = $request->username;
        $user->email = $request->email;
        $user->mobile = $request->mobile;
        $user->gender = $request->gender;

        if ($request->has('profileImage')) {
            $user->profile_photo = $request->profileImage;
        }

        $user->save();

        return response()->json([
            'message' => 'Profile updated successfully',
        ]);
    }
}
