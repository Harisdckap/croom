<?php

namespace App\Http\Controllers;

use App\Models\Roommate;
use Illuminate\Http\Request;

class RoommateController extends Controller
{
    public function index(Request $request)
    {
        $address = $request->query('address');
        $page = $request->query('p', 1); // Default to page 1 if not provided
        $perPage = 10; // Number of listings per page

        $query = Roommate::query();

        if ($address) {
            $query->where('location', 'LIKE', "%$address%");
        }

        $roommates = $query->paginate($perPage, ['*'], 'page', $page);

        return response()->json($roommates);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'location' => 'required|string|max:255',
            'looking_for' => 'required|string|max:255',
            'looking_for_gender' => 'nullable|string|max:255',
            'approx_rent' => 'required|numeric',
            'room_type' => 'required|string|max:255',
            'highlights' => 'nullable|string|max:255',
            'post' => 'nullable|string',
            'listing_type' => 'required|string|max:255|in:roommates',
            'occupancy' => 'required|integer',
            'number_of_people' => 'required|integer',
            'house_image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);
    
        if ($request->hasFile('house_image')) {
            $image = $request->file('house_image');
            $imagePath = $image->store('images', 'public');
            $validatedData['house_image'] = $imagePath;
        }
    
        $roommate = Roommate::create($validatedData);
        return response()->json($roommate, 201);
    }
    

    public function show($id)
    {
        $roommate = Roommate::findOrFail($id);
        return response()->json($roommate);
    }

    public function update(Request $request, $id)
    {
        $roommate = Roommate::findOrFail($id);

        $validatedData = $request->validate([
            'location' => 'sometimes|required|string|max:255',
            'looking_for' => 'sometimes|required|string|max:255',
            'looking_for_gender' => 'nullable|string|max:255',
            'approx_rent' => 'sometimes|required|numeric',
            'room_type' => 'sometimes|required|string|max:255',
            'highlights' => 'nullable|string|max:255',
            'post' => 'nullable|string',
            'listing_type' => 'sometimes|required|string|max:255|in:roommates',
            'occupancy' => 'sometimes|required|integer',
            'number_of_people' => 'sometimes|required|integer',
            'house_image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        if ($request->hasFile('house_image')) {
            $image = $request->file('house_image');
            $imageName = time().'.'.$image->extension();
            $image->move(public_path('images'), $imageName);
            $validatedData['house_image'] = 'images/'.$imageName;
        }

        $roommate->update($validatedData);
        return response()->json($roommate);
    }

    public function destroy($id)
    {
        $roommate = Roommate::findOrFail($id);
        $roommate->delete();
        return response()->json(null, 204);
    }
}
