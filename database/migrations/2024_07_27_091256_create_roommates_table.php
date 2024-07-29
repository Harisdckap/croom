<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRoommatesTable extends Migration
{
    public function up()
    {
        Schema::create('roommates', function (Blueprint $table) {
            $table->id();
            $table->string('location');
            $table->string('looking_for');
            $table->string('looking_for_gender')->nullable();
            $table->decimal('approx_rent', 10, 2);
            $table->string('room_type');
            $table->string('highlights')->nullable();
            $table->text('post')->nullable();
            $table->string('listing_type')->default('roommates');
            $table->integer('occupancy');
            $table->integer('number_of_people');
            $table->string('house_image')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('roommates');
    }
}
