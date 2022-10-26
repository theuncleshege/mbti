<?php

use App\Models\Question;
use Illuminate\Database\Seeder;

class QuestionsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $questions = [
            [
                "question" => "You find it takes effort to introduce yourself to other people.",
                "slug" => "introduce",
                "dimension" => "EI",
                "direction" => 1,
            ],
            [
                "question" => "You consider yourself more practical than creative.",
                "slug" => "consider",
                "dimension" => "SN",
                "direction" => -1,
            ],
            [
                "question" => "Winning a debate matters less to you than making sure no one gets upset.",
                "slug" => "debate",
                "dimension" => "TF",
                "direction" => 1,
            ],
            [
                "question" => "You get energized going to social events that involve many interactions.",
                "slug" => "social",
                "dimension" => "EI",
                "direction" => -1,
            ],
            [
                "question" => "You often spend time exploring unrealistic and impractical yet intriguing ideas.",
                "slug" => "explore",
                "dimension" => "SN",
                "direction" => 1,
            ],
            [
                "question" => "Deadlines seem to you to be of relative rather than absolute importance.",
                "slug" => "deadlines",
                "dimension" => "JP",
                "direction" => 1,
            ],
            [
                "question" => "Logic is usually more important than heart when it comes to making important decisions.",
                "slug" => "logic",
                "dimension" => "TF",
                "direction" => -1,
            ],
            [
                "question" => "Your home and work environments are quite tidy.",
                "slug" => "tidy",
                "dimension" => "JP",
                "direction" => -1,
            ],
            [
                "question" => "You do not mind being at the center of attention.",
                "slug" => "attention",
                "dimension" => "EI",
                "direction" => -1,
            ],
            [
                "question" => "Keeping your options open is more important than having a to-do list.",
                "slug" => "options",
                "dimension" => "JP",
                "direction" => 1,
            ]
        ];

        Question::insert($questions);
    }
}
