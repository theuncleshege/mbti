<?php

namespace App\Http\Controllers;

use App\Models\Question;
use App\Models\User;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json(User::all(), 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'introduce' => 'required|numeric|min:1|max:7',
            'consider' => 'required|numeric|min:1|max:7',
            'debate' => 'required|numeric|min:1|max:7',
            'social' => 'required|numeric|min:1|max:7',
            'explore' => 'required|numeric|min:1|max:7',
            'deadlines' => 'required|numeric|min:1|max:7',
            'logic' => 'required|numeric|min:1|max:7',
            'tidy' => 'required|numeric|min:1|max:7',
            'attention' => 'required|numeric|min:1|max:7',
            'options' => 'required|numeric|min:1|max:7',
            'email' => 'required|email|max:255',
        ]);

        if ($validator->fails()) {
//            return response()->json($validator->errors()->first(), 400);
            return response()->json("Please fill in all fields", 400);
        }

        $results = calculateMBTI(Question::all(), $request->except('email'));

        $user = User::updateOrCreate(
            ["email" => $request->email],
            ["mbti" => $results["perspective"]]
        );

        $userAnswers = [];
        foreach ($results["answers"] as $question=>$answer) {
            $userAnswers[] = [
                'user_id' => $user->id,
                'question_id' => $question,
                'answer' => $answer,
            ];
        }

        $this->insertOrUpdate('answers', $userAnswers);

        return response()->json($user, 200);
    }

    private function insertOrUpdate(string $table, array $rows){
        $first = reset($rows);

        $columns = implode( ',',
            array_map( function( $value ) { return "$value"; } , array_keys($first) )
        );

        $values = implode( ',', array_map( function( $row ) {
            return '('.implode( ',',
                array_map( function( $value ) { return '"'.str_replace('"', '""', $value).'"'; } , $row )
                ).')';
            } , $rows )
        );

        $updates = implode( ',',
            array_map( function( $value ) { return "$value = VALUES($value)"; } , array_keys($first) )
        );

        $sql = "INSERT INTO {$table}({$columns}) VALUES {$values} ON DUPLICATE KEY UPDATE {$updates}";

        return DB::statement( $sql );
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        foreach ($user->answers as $answer) {
            $answer->question;
        }

        return response()->json($user, 200);
    }
}
