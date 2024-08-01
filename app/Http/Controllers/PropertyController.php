<?php

namespace App\Http\Controllers;

use App\Models\Roommate;
use App\Models\Listing;
use Illuminate\Http\Request;

class PropertyController extends Controller
{
    public function index(Request $request)
    {
        $address = $request->input('address', '');
        $page = $request->input('p', 1);
        $itemsPerPage = 6;
        $gender = $request->input('gender', 'all'); // Default to 'all'

        // Initialize the query for roommates and listings
        $roommateQuery = Roommate::query()->where('location', 'LIKE', "%{$address}%");
        $listingQuery = Listing::query()->where('location', 'LIKE', "%{$address}%");

        // Apply gender filter if specified
        if ($gender != 'all') {
            $roommateQuery->where('looking_for_gender', $gender);
            $listingQuery->where('looking_for_gender', $gender);
        }

        // Fetch roommates and listings with applied filters
        $roommates = $roommateQuery->get();
        $listings = $listingQuery->get();

        // Combine and sort the results
        $combinedListings = $roommates->concat($listings)->sortByDesc('created_at')->values();

        // Calculate pagination details
        $totalItems = $combinedListings->count();
        $paginatedListings = $combinedListings->slice(($page - 1) * $itemsPerPage, $itemsPerPage)->values();
        $totalPages = ceil($totalItems / $itemsPerPage);

        // Return the response
        return response()->json([
            'data' => $paginatedListings,
            'current_page' => $page,
            'last_page' => $totalPages,
            'total' => $totalItems,
        ]);
    }
}
