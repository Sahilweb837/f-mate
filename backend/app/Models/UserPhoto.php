<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserPhoto extends Model
{
    protected $fillable = ['user_id', 'url', 'is_profile', 'order'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
