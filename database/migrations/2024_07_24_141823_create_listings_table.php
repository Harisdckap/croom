<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateListingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('listings', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('location');
            $table->decimal('price', 10, 2);
            $table->integer('rooms');
            $table->text('facilities');
            $table->string('contact');
            $table->enum('looking_for_gender', ['male', 'female', 'any']);
            $table->enum('occupancy', ['single', 'shared', 'any']);
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
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('listings');
    }
}
