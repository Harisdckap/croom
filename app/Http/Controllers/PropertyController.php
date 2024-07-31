<?php

namespace App\Http\Controllers;

use App\Models\Roommate;
use App\Models\Listing;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Log;

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

        // Filter by type
        switch ($type) {
            case 'r':
                $listings = $listingQuery->where('listing_type', 'room')->get();
                $roommates = collect();
                break;
            case 'rm':
                $roommates = $roommateQuery->where('listing_type', 'roommates')->get();
                $listings = collect();
                break;
            case 'pg':
                $listings = $listingQuery->where('listing_type', 'pg')->get();
                $roommates = collect();
                break;
            default:
                $roommates = $roommateQuery->get();
                $listings = $listingQuery->get();
                break;
        }

        // Log the results
        Log::info('Roommates:', $roommates->toArray());
        Log::info('Listings:', $listings->toArray());

        // Combine listings and roommates into one collection
        $combinedListings = $listings->merge($roommates)->sortByDesc('created_at')->values();

        // Paginate the combined collection
        $paginatedListings = $this->paginate($combinedListings, $itemsPerPage, $page, $request);

        // Return the response
        return response()->json([
            'data' => $paginatedListings->items(),
            'current_page' => $paginatedListings->currentPage(),
            'last_page' => $paginatedListings->lastPage(),
            'total' => $paginatedListings->total(),
        ]);
    }

    /**
     * Paginate the given collection.
     *
     * @param \Illuminate\Support\Collection $items
     * @param int $perPage
     * @param int $page
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Pagination\LengthAwarePaginator
     */
    protected function paginate($items, $perPage, $page, $request)
    {
        $offset = ($page * $perPage) - $perPage;
        return new LengthAwarePaginator(
            $items->slice($offset, $perPage)->values(),
            $items->count(),
            $perPage,
            $page,
            ['path' => $request->url(), 'query' => $request->query()]
        );
    }


    
    public function show($id, $location)
    {
        // Decode the base64 encoded id
        $decodedId = base64_decode($id);
    
        // Log the decoded ID and location for debugging
        Log::info('Decoded ID:', ['id' => $decodedId]);
        Log::info('Location:', ['location' => $location]);
    
        // Find the property in listings or roommates using the decoded id
        $listing = Listing::find($decodedId);
        $roommate = Roommate::find($decodedId);
    
        // Log the found listing or roommate for debugging
        if ($listing) {
            Log::info('Listing found:', ['listing' => $listing]);
            // Return the listing data with location
            return response()->json(['data' => $listing, 'location' => $location]);
        } elseif ($roommate) {
            Log::info('Roommate found:', ['roommate' => $roommate]);
            // Return the roommate data with location
            return response()->json(['data' => $roommate, 'location' => $location]);
        } else {
            Log::error('Property not found:', ['id' => $decodedId]);
            // Return a 404 error if no property is found
            return response()->json(['error' => 'Property not found'], 404);
        }
    }
    
}
