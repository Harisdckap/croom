<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Listing;

class PropertyController extends Controller
{
    public function index(Request $request)
    {
        $address = $request->query('address');
        $page = $request->query('p', 1); // Default to page 1 if not provided
        $perPage = 10; // Number of listings per page

        $query = Listing::query();

        if ($address) {
            $query->where('location', 'LIKE', "%$address%");
        }

        $listings = $query->paginate($perPage, ['*'], 'page', $page);

        return response()->json($listings);
    }
}
