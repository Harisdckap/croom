<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PgListing extends Model
{
    use HasFactory;

    protected $fillable = [
        'pg_type',
        'mobile_num',
        'pg_name',
        'pg_address',
        'single_occupancy',
        'double_occupancy',
        'triple_occupancy',
        'pg_post_content',
        'pg_files',
    ];

    protected $casts = [
        'pg_files' => 'array',
    ];
}