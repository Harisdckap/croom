<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Listing extends Model
{
    protected $fillable = [
        'title', 'location', 'price', 'rooms', 'facilities', 'contact'
    ];
}
