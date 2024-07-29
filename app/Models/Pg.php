<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pg extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'location', 'rent', 'available_rooms', 'image'];
}
