<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ImageController extends Controller
{
    public function upload(Request $request)
    {
        $request->validate([
            'photos.*' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        $paths = [];
        foreach ($request->file('photos') as $file) {
            $path = $file->store('public/photos');
            $paths[] = Storage::url($path);
        }

        return response()->json(['urls' => $paths]);
    }
}