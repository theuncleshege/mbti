<?php

/* @var $factory \Illuminate\Database\Eloquent\Factory */

use App\Models\Question;
use Faker\Generator as Faker;

$factory->define(Question::class, function (Faker $faker) {
    return [
        "question" => $faker->sentence,
        "slug" => $faker->word,
        "dimension" => strtoupper($faker->words(2, true)),
        "direction" => $faker->randomElement([1, -1]),
    ];
});
