<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\PgListing;
use Illuminate\Support\Facades\Log;

class PgListingController extends Controller
{
    public function index()
    {
        $pgListings = PgListing::paginate(10);
        return response()->json($pgListings);
    }

    public function show($id)
    {
        $pgListing = PgListing::findOrFail($id);
        return response()->json($pgListing);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'pgType' => 'required|string|max:255',
            'mobileNum' => 'required|string|max:255',
            'pgName' => 'required|string|max:255',
            'location' => 'required|string',
            'occupancyType' => 'required|string|max:255',
            'occupancyAmount' => 'required|integer',
            'pgPostContent' => 'required|string',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        $pgListing = new PgListing();
        $pgListing->pg_type = $validated['pgType'];
        $pgListing->mobile_num = $validated['mobileNum'];
        $pgListing->pg_name = $validated['pgName'];
        $pgListing->location = $validated['location'];
        $pgListing->occupancy_type = $validated['occupancyType'];
        $pgListing->occupancy_amount = $validated['occupancyAmount'];
        $pgListing->pg_post_content = $validated['pgPostContent'];

        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $path = $file->store('image', 'public');
            $pgListing->image = $path;
        } else {
            $pgListing->image = null;
        }

        try {
            $pgListing->save();
            return response()->json(['message' => 'PG Listing added successfully', 'data' => $pgListing], 201);
        } catch (\Exception $e) {
            Log::error('Failed to save PG Listing: ' . $e->getMessage());
            return response()->json(['message' => 'Failed to add PG Listing', 'error' => $e->getMessage()], 500);
        }
    }
}