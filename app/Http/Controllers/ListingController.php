<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Listing;

class ListingController extends Controller
{
// Laravel example: in your controller
public function store(Request $request)
{
    $request->validate([
        'title' => 'required|string|max:255',
        'location' => 'required|string|max:255',
        'price' => 'required|numeric',
        'rooms' => 'required|integer',
        'facilities' => 'required|string',
        'contact' => 'required|string|max:255',
        'looking_for' => 'required|string',
        'occupancy' => 'required|string',
        'photos.*' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        'highlighted_features' => 'nullable|array',
        'amenities' => 'nullable|array',
        'description' => 'required|string',
    ]);

    $listing = new Listing([
        'title' => $request->title,
        'location' => $request->location,
        'price' => $request->price,
        'rooms' => $request->rooms,
        'facilities' => $request->facilities,
        'contact' => $request->contact,
        'looking_for' => $request->looking_for,
        'occupancy' => $request->occupancy,
        'highlighted_features' => json_encode($request->highlighted_features),
        'amenities' => json_encode($request->amenities),
        'description' => $request->description,
    ]);

    if ($request->hasFile('photos')) {
        $photos = [];
        foreach ($request->file('photos') as $file) {
            $path = $file->store('public/photos');
            $photos[] = basename($path);
        }
        $listing->photos = json_encode($photos);
    }

    $listing->save();

    return response()->json(['message' => 'Room added successfully'], 201);
}


    public function index()
    {
        $listings = Listing::all();
        return response()->json($listings);
    }

    public function show($id)
    {
        $listing = Listing::find($id);

        if (!$listing) {
            return response()->json(['message' => 'Listing not found'], 404);
        }

        return response()->json($listing);
    }

    public function update(Request $request, $id)
    {
        $listing = Listing::find($id);

        if (!$listing) {
            return response()->json(['message' => 'Listing not found'], 404);
        }

        $request->validate([
            'title' => 'required|string',
            'location' => 'required|string',
            'price' => 'required|numeric',
            'rooms' => 'required|numeric',
            'facilities' => 'required|string',
            'contact' => 'required|string',
            'photos.*' => 'image|mimes:jpeg,png,jpg|max:2048', // Adjust validation as needed
            'highlighted_features' => 'nullable|json',
            'amenities' => 'nullable|json',
            'description' => 'required|string',
        ]);

        $listing->update($request->all());

        return response()->json(['message' => 'Listing updated successfully', 'data' => $listing]);
    }

    public function destroy($id)
    {
        $listing = Listing::find($id);

        if (!$listing) {
            return response()->json(['message' => 'Listing not found'], 404);
        }

        $listing->delete();

        return response()->json(['message' => 'Listing deleted successfully']);
    }
}
