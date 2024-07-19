<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OTPVerification extends Model
{
    protected $table = 'otp_verifications';
    use HasFactory;

    protected $fillable = [
        'user_id',
        'otp',
        'otp_expire_at',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
