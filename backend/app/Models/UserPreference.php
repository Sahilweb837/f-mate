<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserPreference extends Model
{
    protected $fillable = [
        'user_id', 'min_age', 'max_age', 'max_distance', 
        'interested_in', 'preferred_coffee'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
