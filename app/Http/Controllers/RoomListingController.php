<?php


namespace App\Http\Controllers;

use App\Models\Listing;
use Illuminate\Http\Request;

class RoomListingController extends Controller
{
    public function index(Request $request)
    {
        $address = $request->input('address', '');
        $page = $request->input('p', 1);

        $query = Listing::query();

        if ($address) {
            $query->where('location', 'like', '%' . $address . '%');
        }

        // Filter listings specifically for rooms if applicable
        $query->where('listing_type', 'room'); // Assuming you have a type field to specify room

        $listings = $query->paginate(10, ['*'], 'page', $page);

        return response()->json($listings);
    }

    public function show($id)
    {
        $property = Listing::find($id);
    
        if ($property) {
            return response()->json($property);
        } else {
            return response()->json(['message' => 'Property not found'], 404);
        }
    }
}
