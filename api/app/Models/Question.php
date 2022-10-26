<?php

namespace  App\Models;

use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'question', 'slug', 'dimension', 'direction', 'meaning'
    ];

    /**
     * Get the answers for each question
     */
    public function answers()
    {
        return $this->hasMany('App\Models\Answer');
    }
}
