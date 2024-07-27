<?php

namespace App\Http\Controllers;

use App\Models\Profile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProfileController extends Controller
{
    public function update(Request $request)
    {
        // Validate the incoming request data
        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'sex' => 'nullable|string|max:10',
            'date_of_birth' => 'nullable|date',
            'profile_image' => 'nullable|image|max:2048',
        ]);

        // Get the currently authenticated user
        $user = Auth::user();

        // Handle file upload for profile image
        $profileImagePath = $request->hasFile('profile_image') ? $request->file('profile_image')->store('profile_images', 'public') : null;

        // Update or create the user's profile
        $profile = Profile::updateOrCreate(
            ['user_id' => $user->id],
            [
                'first_name' => $request->input('first_name'),
                'last_name' => $request->input('last_name'),
                'sex' => $request->input('sex'),
                'date_of_birth' => $request->input('date_of_birth'),
                'profile_image' => $profileImagePath,
            ]
        );

        return response()->json(['message' => 'Profile updated successfully', 'profile' => $profile]);
    }

    public function show()
    {
        // Get the currently authenticated user
        $user = Auth::user();
        
        // Retrieve the user's profile
        $profile = Profile::where('user_id', $user->id)->first();

        // If no profile is found, return a 404 response
        if (!$profile) {
            return response()->json(['message' => 'Profile not found'], 404);
        }

        return response()->json($profile);
    }
}
