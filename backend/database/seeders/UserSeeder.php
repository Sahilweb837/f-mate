<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\UserPhoto;
use App\Models\UserPreference;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;

class UserSeeder extends Seeder
{
    public function run()
    {
        $users = [
            [
                'name' => 'Aria Bloom',
                'email' => 'aria@example.com',
                'gender' => 'female',
                'bio' => 'Latte art enthusiast and sunset lover. Let\'s grab a coffee!',
                'coffee_style' => 'Latte Lover',
                'lat' => 19.0760, 'lng' => 72.8777,
                'photo' => '/profile-1.png'
            ],
            [
                'name' => 'Sofia Chen',
                'email' => 'sofia@example.com',
                'gender' => 'female',
                'bio' => 'Strong espresso and deep tech talks.',
                'coffee_style' => 'Espresso Enthusiast',
                'lat' => 19.0800, 'lng' => 72.8850,
                'photo' => '/profile-2.png'
            ],
            [
                'name' => 'James Miller',
                'email' => 'james@example.com',
                'gender' => 'male',
                'bio' => 'Amateur barista and mountain biker. Looking for a coffee partner.',
                'coffee_style' => 'Black Coffee Purist',
                'lat' => 19.0750, 'lng' => 72.8800,
                'photo' => '/profile-boy-1.png'
            ],
            [
                'name' => 'David Wilson',
                'email' => 'david@example.com',
                'gender' => 'male',
                'bio' => 'Cold brew and coding. Let\'s talk about the future of AI over coffee.',
                'coffee_style' => 'Cold Brew Addict',
                'lat' => 19.0820, 'lng' => 72.8900,
                'photo' => '/profile-boy-2.png'
            ]
        ];

        foreach ($users as $u) {
            $user = User::create([
                'name' => $u['name'],
                'email' => $u['email'],
                'password' => Hash::make('password'),
                'gender' => $u['gender'],
                'date_of_birth' => Carbon::now()->subYears(rand(20, 30)),
                'bio' => $u['bio'],
                'coffee_style' => $u['coffee_style'],
                'latitude' => $u['lat'],
                'longitude' => $u['lng'],
                'profile_complete' => true,
            ]);

            UserPhoto::create([
                'user_id' => $user->id,
                'photo_url' => $u['photo'],
                'is_primary' => true
            ]);

            UserPreference::create([
                'user_id' => $user->id,
                'gender_pref' => $u['gender'] == 'male' ? 'female' : 'male',
                'min_age' => 18,
                'max_age' => 50,
                'max_distance_km' => 50
            ]);
        }
    }
}
