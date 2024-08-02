<?php



namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rooms extends Model
{
    use HasFactory;

    protected $fillable = [
        'title', 'location', 'price', 'room_type',  'contact',
        'looking_for', 'occupancy', 'highlighted_features', 'amenities', 'description','photo','listing_type'
    ];

  protected $casts = [
        'highlighted_features' => 'array',
        'amenities' => 'array',
    ];
}
