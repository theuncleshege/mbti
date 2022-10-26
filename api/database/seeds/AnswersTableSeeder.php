<?php

use App\Models\Answer;
use App\Models\Question;
use App\Models\User;
use Illuminate\Database\Seeder;

class AnswersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Seeder for our specific usecase
        $users = User::all();
        $questions = Question::all();
        $answers = [];

        $data = [
            [
                [
                    "question_id" => 1,
                    "answer" => 4
                ],
                [
                    "question_id" => 2,
                    "answer" => 3
                ],
                [
                    "question_id" => 3,
                    "answer" => 1
                ],
                [
                    "question_id" => 4,
                    "answer" => 6
                ],
                [
                    "question_id" => 5,
                    "answer" => 7
                ],
                [
                    "question_id" => 6,
                    "answer" => 3
                ],
                [
                    "question_id" => 7,
                    "answer" => 5
                ],
                [
                    "question_id" => 8,
                    "answer" => 3
                ],
                [
                    "question_id" => 9,
                    "answer" => 6
                ],
                [
                    "question_id" => 10,
                    "answer" => 6
                ],
            ],
            [
                [
                    "question_id" => 1,
                    "answer" => 1
                ],
                [
                    "question_id" => 2,
                    "answer" => 5
                ],
                [
                    "question_id" => 3,
                    "answer" => 4
                ],
                [
                    "question_id" => 4,
                    "answer" => 6
                ],
                [
                    "question_id" => 5,
                    "answer" => 5
                ],
                [
                    "question_id" => 6,
                    "answer" => 2
                ],
                [
                    "question_id" => 7,
                    "answer" => 6
                ],
                [
                    "question_id" => 8,
                    "answer" => 3
                ],
                [
                    "question_id" => 9,
                    "answer" => 3
                ],
                [
                    "question_id" => 10,
                    "answer" => 2
                ],
            ],
            [
                [
                    "question_id" => 1,
                    "answer" => 3
                ],
                [
                    "question_id" => 2,
                    "answer" => 2
                ],
                [
                    "question_id" => 3,
                    "answer" => 6
                ],
                [
                    "question_id" => 4,
                    "answer" => 1
                ],
                [
                    "question_id" => 5,
                    "answer" => 7
                ],
                [
                    "question_id" => 6,
                    "answer" => 3
                ],
                [
                    "question_id" => 7,
                    "answer" => 2
                ],
                [
                    "question_id" => 8,
                    "answer" => 5
                ],
                [
                    "question_id" => 9,
                    "answer" => 2
                ],
                [
                    "question_id" => 10,
                    "answer" => 7
                ],
            ],
            [
                [
                    "question_id" => 1,
                    "answer" => 3
                ],
                [
                    "question_id" => 2,
                    "answer" => 4
                ],
                [
                    "question_id" => 3,
                    "answer" => 7
                ],
                [
                    "question_id" => 4,
                    "answer" => 1
                ],
                [
                    "question_id" => 5,
                    "answer" => 2
                ],
                [
                    "question_id" => 6,
                    "answer" => 5
                ],
                [
                    "question_id" => 7,
                    "answer" => 4
                ],
                [
                    "question_id" => 8,
                    "answer" => 3
                ],
                [
                    "question_id" => 9,
                    "answer" => 2
                ],
                [
                    "question_id" => 10,
                    "answer" => 6
                ],
            ],
            [
                [
                    "question_id" => 1,
                    "answer" => 4
                ],
                [
                    "question_id" => 2,
                    "answer" => 4
                ],
                [
                    "question_id" => 3,
                    "answer" => 4
                ],
                [
                    "question_id" => 4,
                    "answer" => 4
                ],
                [
                    "question_id" => 5,
                    "answer" => 4
                ],
                [
                    "question_id" => 6,
                    "answer" => 4
                ],
                [
                    "question_id" => 7,
                    "answer" => 4
                ],
                [
                    "question_id" => 8,
                    "answer" => 4
                ],
                [
                    "question_id" => 9,
                    "answer" => 4
                ],
                [
                    "question_id" => 10,
                    "answer" => 4
                ],
            ],
            [
                [
                    "question_id" => 1,
                    "answer" => 1
                ],
                [
                    "question_id" => 2,
                    "answer" => 1
                ],
                [
                    "question_id" => 3,
                    "answer" => 1
                ],
                [
                    "question_id" => 4,
                    "answer" => 1
                ],
                [
                    "question_id" => 5,
                    "answer" => 1
                ],
                [
                    "question_id" => 6,
                    "answer" => 1
                ],
                [
                    "question_id" => 7,
                    "answer" => 1
                ],
                [
                    "question_id" => 8,
                    "answer" => 1
                ],
                [
                    "question_id" => 9,
                    "answer" => 1
                ],
                [
                    "question_id" => 10,
                    "answer" => 1
                ],
            ],
            [
                [
                    "question_id" => 1,
                    "answer" => 7
                ],
                [
                    "question_id" => 2,
                    "answer" => 7
                ],
                [
                    "question_id" => 3,
                    "answer" => 7
                ],
                [
                    "question_id" => 4,
                    "answer" => 7
                ],
                [
                    "question_id" => 5,
                    "answer" => 7
                ],
                [
                    "question_id" => 6,
                    "answer" => 7
                ],
                [
                    "question_id" => 7,
                    "answer" => 7
                ],
                [
                    "question_id" => 8,
                    "answer" => 7
                ],
                [
                    "question_id" => 9,
                    "answer" => 7
                ],
                [
                    "question_id" => 10,
                    "answer" => 7
                ],
            ]
        ];

        $answersToCalculate = [];

        foreach ($users as $key=>$user) {
            foreach ($data[$key] as $index=>$datum) {
                $datum["user_id"] = $user->id;
                $answers[] = $datum;
                $answersToCalculate[$questions[$index]->slug] = $datum["answer"];
            }

            $results = calculateMBTI($questions, $answersToCalculate);

            User::updateOrCreate(
                ["email" => $user->email],
                ["mbti" => $results["perspective"]]
            );
        }
        Answer::insert($answers);
    }
}
