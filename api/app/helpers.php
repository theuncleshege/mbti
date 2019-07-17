<?php

use Illuminate\Database\Eloquent\Collection;

function calculateMBTI(Collection $questions, Array $answers)
{
    $mbti = "";
    $userAnswers = [];
    $values = $count = [
        "EI" => [
            "E" => 0,
            "I" => 0,
        ],
        "SN" => [
            "S" => 0,
            "N" => 0,
        ],
        "TF" => [
            "T" => 0,
            "F" => 0,
        ],
        "JP" => [
            "J" => 0,
            "P" => 0,
        ],
    ];

    foreach ($answers as $key=>$answer) {
        $question = $questions->where('slug', $key)->first();
        if (!$question) {
            $question = $questions->where('id', $key)->first();
        }
        $userAnswers[$question->id] = $answer;

        switch ($question->dimension) {
            case "EI":
                if (
                    ($question->direction === 1 && $answer <= 4) ||
                    ($question->direction === -1 && $answer >= 4)
                ) {
                    $mbti .= "E";
                    $values[$question->dimension]["E"] += $answer;
                    $count[$question->dimension]["E"]++;
                } else {
                    $mbti .= "I";
                    $values[$question->dimension]["I"] += $answer;
                    $count[$question->dimension]["I"]++;
                }
                break;
            case "SN":
                if (
                    ($question->direction === 1 && $answer <= 4) ||
                    ($question->direction === -1 && $answer >= 4)
                ) {
                    $mbti .= "S";
                    $values[$question->dimension]["S"] += $answer;
                    $count[$question->dimension]["S"]++;
                } else {
                    $mbti .= "N";
                    $values[$question->dimension]["N"] += $answer;
                    $count[$question->dimension]["N"]++;
                }
                break;
            case "TF":
                if (
                    ($question->direction === 1 && $answer <= 4) ||
                    ($question->direction === -1 && $answer >= 4)
                ) {
                    $mbti .= "T";
                    $values[$question->dimension]["T"] += $answer;
                    $count[$question->dimension]["T"]++;
                } else {
                    $mbti .= "F";
                    $values[$question->dimension]["F"] += $answer;
                    $count[$question->dimension]["F"]++;
                }
                break;
            case "JP":
                if (
                    ($question->direction === 1 && $answer <= 4) ||
                    ($question->direction === -1 && $answer >= 4)
                ) {
                    $mbti .= "J";
                    $values[$question->dimension]["J"] += $answer;
                    $count[$question->dimension]["J"]++;
                } else {
                    $mbti .= "P";
                    $values[$question->dimension]["P"] += $answer;
                    $count[$question->dimension]["P"]++;
                }
                break;
            default:
                $mbti .= "";
        }
    }

    $perspective = "";

    foreach ($values as $index=>$value) {
        $max = array_keys($value, max($value));
        if (count($max) > 1) {
            $perspective .= array_keys($count[$index], max($count[$index]))[0];
        } else {
            $perspective .= $max[0];
        }
    }
    return ["perspective" => $perspective, "answers" => $userAnswers];
}
