<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePgListingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('pg_listings', function (Blueprint $table) {
            $table->id();
            $table->string('pg_type')->default('Both');
            $table->string('mobile_num');
            $table->string('pg_name');
            $table->text('pg_address');
            $table->string('occupancy_type');
            $table->integer('occupancy_amount');
            $table->string('listing_type')->default('pg');
            $table->json('pg_files')->nullable();
            $table->text('pg_post_content');
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
        Schema::dropIfExists('pg_listings');
    }
}
