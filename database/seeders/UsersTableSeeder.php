<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Dummy data
        $users = [
            [
                'name' => 'hari Doe',
                'email' => 'hari.doe@example.com',
                'email_verified_at' => now(),
                'password' => Hash::make('password'),
                'remember_token' => null,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
                'userType' => 'regular',
                'gender' => 'male',
                'mobile' => '1234567890',
            ],


            // Add more dummy data as needed
        ];

        // Insert data into the users table
        DB::table('users')->insert($users);
    }
}
