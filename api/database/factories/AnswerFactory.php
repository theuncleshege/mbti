<?php

/* @var $factory \Illuminate\Database\Eloquent\Factory */

use App\Models\Answer;
use Faker\Generator as Faker;

$factory->define(Answer::class, function (Faker $faker) {
    return [
        'user_id' => factory('App\Models\User')->create()->id,
        'question_id' => factory('App\Models\Question')->create()->id,
        'answer' => $faker->numberBetween(1, 7),
    ];
});
