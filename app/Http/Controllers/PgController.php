<?php

namespace App\Http\Controllers;

use App\Models\Pg;
use Illuminate\Http\Request;

class PgController extends Controller
{
   public function store(Request $request){
    $pg = new Pg();
    $pg->name = $request->name;
    $pg->location = $request->location;
    $pg->rent = $request->rent;
    $pg->available_rooms = $request->availabel_rooms;
    if($request->hasFile('image')){
        $pg->image = file_get_contents($request->file('image')->getRealPath());
    }
    $pg->save();
    return response()->json(['success' => true]);
   }
   public function index(){
    $pgs = Pg::all();
    return response()->json($pgs);
   }
}
