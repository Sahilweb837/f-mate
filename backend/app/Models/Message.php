<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    protected $fillable = ['match_id', 'sender_id', 'content', 'is_read'];

    public function match()
    {
        return $this->belongsTo(CupMatch::class, 'match_id');
    }

    public function sender()
    {
        return $this->belongsTo(User::class, 'sender_id');
    }
}
