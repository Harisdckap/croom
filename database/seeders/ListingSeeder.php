<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class ListingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('listings')->insert([
            [
                'title' => 'Cozy Room in Downtown',
                'price' => 500.00,
                'location' => 'New York',
                'bedrooms' => 1,
                'bathrooms' => 1,
                'available_from' => Carbon::parse('2024-08-01'),
                'description' => 'A cozy room in the heart of downtown. Perfect for students or professionals.',
                'user_id' => 1,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'title' => 'Spacious Apartment with Balcony',
                'price' => 1200.00,
                'location' => 'Los Angeles',
                'bedrooms' => 2,
                'bathrooms' => 2,
                'available_from' => Carbon::parse('2024-09-01'),
                'description' => 'A spacious apartment with a beautiful balcony overlooking the city.',
                'user_id' => 2,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'title' => 'Modern Room in Quiet Neighborhood',
                'price' => 600.00,
                'location' => 'San Francisco',
                'bedrooms' => 1,
                'bathrooms' => 1,
                'available_from' => Carbon::parse('2024-08-15'),
                'description' => 'A modern room in a quiet neighborhood. Ideal for professionals.',
                'user_id' => 3,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
           
        ]);
    }
}
