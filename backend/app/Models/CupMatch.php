<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CupMatch extends Model
{
    protected $table = 'cup_matches';

    protected $fillable = ['user_a_id', 'user_b_id', 'matched_at', 'is_active'];

    protected $casts = [
        'matched_at' => 'datetime',
        'is_active' => 'boolean',
    ];

    public function userA()
    {
        return $this->belongsTo(User::class, 'user_a_id');
    }

    public function userB()
    {
        return $this->belongsTo(User::class, 'user_b_id');
    }
}
