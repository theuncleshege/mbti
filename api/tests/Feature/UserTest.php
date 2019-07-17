<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class UserTest extends TestCase
{
    use RefreshDatabase;
    use WithFaker;

    public function testListUsers()
    {
        $count = 2;
        factory('App\Models\User', $count)->create();
        $response = $this->get('/api/users');
        $response->assertJsonCount($count);
    }

    public function testShowUser()
    {
        $user = factory('App\Models\User')->create();
        $response = $this->get('/api/users/'.$user->id);
        $response->assertSee($user->email)
            ->assertSee($user->mbti);
    }

    public function testShowUserQuestionsAndAnswers()
    {
        $user = factory('App\Models\User')->create();
        $question = factory('App\Models\Question')->create();
        $answer = factory('App\Models\Answer')->create([
            'user_id' => $user->id,
            'question_id' => $question->id,
        ]);

        $response = $this->get('/api/users/'.$user->id);
        $response->assertSee($user->email)
            ->assertSee($user->mbti)
            ->assertSee($question->question)
            ->assertSee($answer->answer);
    }
}
