<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRequirementsTable extends Migration
{
    public function up()
    {
        Schema::create('requirements', function (Blueprint $table) {
            $table->id();
            $table->string('location');
            $table->string('looking_for_gender'); 
            $table->string('looking_for')->default('Room'); 
            $table->string('approx_rent');
            $table->string('room_type');
            $table->string('highlights');
            $table->string('pg_interested');
            $table->text('post');
            $table->string('listing_type')->default('roommates');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('requirements');
    }
}
