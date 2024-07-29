<?php

namespace App\Http\Controllers;

use App\Models\Roommate;
use App\Models\Listing;
use Illuminate\Http\Request;

class PropertyController extends Controller
{
    public function index(Request $request)
    {
        $address = $request->input('address');
        $page = $request->input('p', 1);
        $itemsPerPage = 6;

        $roommates = Roommate::where('location', 'LIKE', "%{$address}%")->get();
        $listings = Listing::where('location', 'LIKE', "%{$address}%")->get();

        $combinedListings = $roommates->concat($listings)->sortByDesc('created_at')->values();
        
        $totalItems = $combinedListings->count();
        $paginatedListings = $combinedListings->slice(($page - 1) * $itemsPerPage, $itemsPerPage)->values();
        $totalPages = ceil($totalItems / $itemsPerPage);

        return response()->json([
            'data' => $paginatedListings,
            'current_page' => $page,
            'last_page' => $totalPages,
            'total' => $totalItems,
        ]);
    }
}
