<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Listing;

class ListingController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'price' => 'required|numeric',
            'rooms' => 'required|integer',
            'facilities' => 'required|string',
            'contact' => 'required|string|max:255',
        ]);

        $listing = Listing::create($request->all());

        return response()->json(['message' => 'Room added successfully', 'data' => $listing], 201);
    }
}
