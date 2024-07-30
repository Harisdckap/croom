<?php

namespace App\Http\Controllers;

use App\Models\Roommate;
use App\Models\Listing;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;

class PropertyController extends Controller
{
    public function index(Request $request)
    {
        $address = $request->input('address', '');
        $page = $request->input('p', 1);
        $itemsPerPage = 6;
        $type = $request->input('t', 'a'); // Default to 'a' (all types)
        $gender = $request->input('gender', 'all'); // Default to 'all'
    
        // Initialize queries for roommates and listings
        $roommateQuery = Roommate::query()->where('location', 'LIKE', "%{$address}%");
        $listingQuery = Listing::query()->where('location', 'LIKE', "%{$address}%");
    
        // Apply gender filter if specified
        if ($gender != 'all') {
            $roommateQuery->where('looking_for_gender', $gender);
            $listingQuery->where('looking_for_gender', $gender);
        }
    
        // Filter by type and paginate the results
        switch ($type) {
            case 'r':
                $listings = $listingQuery->where('listing_type', 'room')->paginate($itemsPerPage, ['*'], 'page', $page);
                $roommates = collect();
                break;
            case 'rm':
                $roommates = $roommateQuery->where('listing_type', 'roommates')->paginate($itemsPerPage, ['*'], 'page', $page);
                $listings = collect();
                break;
            case 'pg':
                $listings = $listingQuery->where('listing_type', 'pg')->paginate($itemsPerPage, ['*'], 'page', $page);
                $roommates = collect();
                break;
            default:
                // For 'all' type, fetch all listings and roommates and paginate combined results
                $listings = $listingQuery->paginate($itemsPerPage, ['*'], 'page', $page);
                $roommates = $roommateQuery->paginate($itemsPerPage, ['*'], 'page', $page);
                break;
        }
    
        // Combine listings and roommates into one collection
        $combinedListings = $listings->getCollection()->merge($roommates->getCollection())->sortByDesc('created_at')->values();
    
        // Create a new LengthAwarePaginator instance for combined results
        $paginatedListings = new LengthAwarePaginator(
            $combinedListings->forPage($page, $itemsPerPage),
            $combinedListings->count(),
            $itemsPerPage,
            $page,
            ['path' => $request->url(), 'query' => $request->query()]
        );
    
        // Return the response
        return response()->json([
            'data' => $paginatedListings->items(),
            'current_page' => $paginatedListings->currentPage(),
            'last_page' => $paginatedListings->lastPage(),
            'total' => $paginatedListings->total(),
        ]);
    }
}
