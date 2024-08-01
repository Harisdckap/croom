<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\PgListing;
use Illuminate\Support\Facades\Log;


class PgListingController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'pg_type' => 'required|string|max:255',
            'mobile_num' => 'required|string|max:255',
            'pg_name' => 'required|string|max:255',
            'pg_address' => 'required|string',
            'single_occupancy' => 'required|numeric',
            'double_occupancy' => 'required|numeric',
            'triple_occupancy' => 'required|numeric',
            'pg_post_content' => 'required|string',
            'pg_files' => 'nullable|array',
            'pg_files.*' => 'nullable|file|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        $pgListing = new PgListing();
        $pgListing->pg_type = $validated['pg_type'];
        $pgListing->mobile_num = $validated['mobile_num'];
        $pgListing->pg_name = $validated['pg_name'];
        $pgListing->pg_address = $validated['pg_address'];
        $pgListing->single_occupancy = $validated['single_occupancy'];
        $pgListing->double_occupancy = $validated['double_occupancy'];
        $pgListing->triple_occupancy = $validated['triple_occupancy'];
        $pgListing->pg_post_content = $validated['pg_post_content'];

        if ($request->hasFile('pg_files')) {
            $pgFiles = [];
            foreach ($request->file('pg_files') as $file) {
                $path = $file->store('pg_files');
                $pgFiles[] = $path;
            }
            $pgListing->pg_files = json_encode($pgFiles);
        }

        try {
            $pgListing->save();
            return response()->json(['message' => 'PG Listing added successfully'], 201);
        } catch (\Exception $e) {
            Log::error('Failed to save PG Listing: ' . $e->getMessage());
            return response()->json(['message' => 'Failed to add PG Listing'], 500);
        }
    }
}
