<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateListingsTable extends Migration
{
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
            $table->enum('looking_for', ['male', 'female', 'any']);
            $table->enum('occupancy', ['single', 'shared', 'any']);
            $table->json('photos'); // JSON type to store multiple photos
            $table->json('highlighted_features'); // JSON type to store highlighted features
            $table->json('amenities'); // JSON type to store amenities
            $table->text('description');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('listings');
    }
}
