<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Requirement extends Model
{
    use HasFactory;

    protected $fillable = [
        'location', 'looking_for', 'approx_rent', 'room_type', 'highlights', 'pg_interested', 'post', 'listing_type'
    ];
}
