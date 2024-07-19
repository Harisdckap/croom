<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Listing extends Model
{
    use HasFactory;

    protected $fillable = [
        'title', 'price', 'location', 'bedrooms', 'bathrooms', 'available_from', 'description', 'user_id', 'images'
    ];

    protected $casts = [
        'images' => 'array',
    ];

    // Define relationships if any, such as:
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
