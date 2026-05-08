<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use PHPOpenSourceSaver\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'name', 'email', 'password', 'gender', 'date_of_birth', 'bio', 
        'location', 'latitude', 'longitude', 'avatar_url', 'cover_url', 
        'interest_tags', 'coffee_style', 'is_verified', 'is_premium', 
        'is_online', 'last_seen', 'profile_complete'
    ];

    protected $hidden = [
        'password', 'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'last_seen' => 'datetime',
        'interest_tags' => 'json',
        'is_verified' => 'boolean',
        'is_premium' => 'boolean',
        'is_online' => 'boolean',
    ];

    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     */
    public function getJWTCustomClaims()
    {
        return [];
    }

    public function photos()
    {
        return $this->hasMany(UserPhoto::class);
    }

    public function preferences()
    {
        return $this->hasOne(UserPreference::class);
    }

    public function swipes()
    {
        return $this->hasMany(Swipe::class, 'swiper_id');
    }

    public function matches()
    {
        return \App\Models\CupMatch::where('user_a_id', $this->id)
            ->orWhere('user_b_id', $this->id);
    }
}
