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
        'occupancy_type',
        'occupancy_amount',
        'listing_type',
        'pg_files',
        'pg_post_content',
    ];

}
