<?php

namespace App\Models;

use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'email', 'mbti',
    ];

    /**
     * Get the answers for each user
     */
    public function answers()
    {
        return $this->hasMany('App\Models\Answer');
    }
}
