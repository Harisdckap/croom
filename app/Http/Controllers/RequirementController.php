<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Requirement;

class RequirementController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'location' => 'required|string',
            'looking_for_gender' => 'required|string', 
            'looking_for' => 'required|string',
            'approx_rent' => 'required|string',
            'room_type' => 'required|string',
            'highlights' => 'required|string',
            'pg_interested' => 'required|string',
            'post' => 'required|string',
            'listing_type' => 'nullable|string', // Add this line
        ]);

        $requirement = new Requirement();
        $requirement->location = $request->location;
        $requirement->looking_for_gender = $request->looking_for_gender;  // Add this line to validate gender field value. It should be either 'male' or 'female' only.
        $requirement->looking_for = $request->looking_for ?? 'Room';
        $requirement->approx_rent = $request->approx_rent;
        $requirement->room_type = $request->room_type;
        $requirement->highlights = $request->highlights;
        $requirement->pg_interested = $request->pg_interested;
        $requirement->post = $request->post;
        $requirement->listing_type = $request->listing_type ?? 'roommates'; // Set default value
        $requirement->save();

        return response()->json(['message' => 'Requirement added successfully'], 200);
    }

    public function index(Request $request)
    {
        $address = $request->get('address');
        $page = $request->get('p', 1);
        $itemsPerPage = 6;
    
        $query = Requirement::query();
    
        if ($address) {
            $query->where('location', 'LIKE', '%' . $address . '%');
        }
        $query->where('listing_type', 'roommates');

        $requirements = $query->paginate($itemsPerPage, ['*'], 'p', $page);
    
        return response()->json($requirements);
    }

    public function show($id)
    {
        $requirement = Requirement::find($id);

        if (!$requirement) {
            return response()->json(['message' => 'Requirement not found'], 404);
        }

        return response()->json($requirement);
    }
    

}
