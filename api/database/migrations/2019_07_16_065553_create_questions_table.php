<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateQuestionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('questions', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('question')->unique();
            $table->string('slug');
            $table->string('dimension');
            $table->integer('direction');
//            $table->string('meaning')->nullable();
            $table->timestamp('updated_at');
        });

        Schema::table('questions', function (Blueprint $table) {
            $table->timestamp('created_at')->useCurrent()->after('direction');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('questions');
    }
}
