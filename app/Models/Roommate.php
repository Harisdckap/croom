<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Roommate extends Model
{
    use HasFactory;

    protected $fillable = [
        'location',
        'looking_for',
        'looking_for_gender',
        'approx_rent',
        'room_type',
        'highlights',
        'post',
        'listing_type',
        'occupancy',
        'number_of_people',
        'house_image'
    ];
}
