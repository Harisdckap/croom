<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Foundation\Auth\User as Authenticatable;
use App\Notifications\ResetPasswordNotification;

class User extends Authenticatable implements JWTSubject
{
    use HasFactory, Notifiable, HasApiTokens;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'userType',
        'gender',
        'mobile',
        'profile_photo',  // Include profile_photo
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    /**
     * Get the JWT identifier.
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Get the custom JWT claims.
     */
    public function getJWTCustomClaims()
    {
        return [];
    }

    /**
     * Define a one-to-one relationship with Profile.
     */
    public function profile()
    {
        return $this->hasOne(User::class);
    }
}
