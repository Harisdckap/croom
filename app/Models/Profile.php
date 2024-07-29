<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'first_name',
        'last_name',
        'sex',
        'date_of_birth',
        'profile_image'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
