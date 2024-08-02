<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('rooms', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('location');
            $table->decimal('price', 10, 2);
            $table->string('room_type', 10);
            $table->string('contact');
            $table->enum('looking_for_gender', ['male', 'female', 'any']);
            $table->enum('occupancy', ['Single Occupancy', 'Double Occupancy', 'Family Occupancy', 'Bachelor Occupancy']);
            $table->text('photo');  // Changed from photos to photo for single image
            $table->json('highlighted_features'); // JSON type to store highlighted features
            $table->json('amenities'); // JSON type to store amenities
            $table->text('description');
            $table->string('listing_type')->default('room'); // Default value for listing type
            $table->string('looking_for')->default('Roomates');
            $table->timestamps();
        });
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rooms');
    }
};
