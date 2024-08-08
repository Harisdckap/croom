<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */

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
            $table->string('room_type');
            $table->string('contact');
            $table->string('looking_for_gender')->nullable();
            $table->string('looking_for')->nullable();
            $table->string('occupancy')->nullable();
            $table->json('photos')->nullable();  // Use json type for photo paths
            $table->json('highlighted_features')->nullable();  // Use json type for features
            $table->json('amenities')->nullable();  // Use json type for amenities
            $table->text('description')->nullable();
            $table->string('listing_type')->nullable();
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
