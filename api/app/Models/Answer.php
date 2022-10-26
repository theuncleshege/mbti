<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Answer extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id', 'question_id', 'answer',
    ];

    /**
     * Get the user that owns the answer.
     */
    public function user()
    {
        return $this->belongsTo('App\Models\User');
    }

    /**
     * Get the questions for the answer.
     */
    public function question()
    {
        return $this->belongsTo('App\Models\Question');
    }
}
