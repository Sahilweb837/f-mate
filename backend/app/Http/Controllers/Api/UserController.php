<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function me()
    {
        return response()->json(Auth::user()->load('photos'));
    }

    public function updateProfile(Request $request)
    {
        $user = Auth::user();
        $user->update($request->only(['name', 'bio', 'coffee_style', 'gender']));
        return response()->json(['message' => 'Profile updated successfully', 'user' => $user]);
    }

    public function updateLocation(Request $request)
    {
        $request->validate([
            'latitude' => 'required|numeric',
            'longitude' => 'required|numeric',
        ]);

        $user = Auth::user();
        $user->latitude = $request->latitude;
        $user->longitude = $request->longitude;
        $user->save();

        return response()->json(['message' => 'Location updated']);
    }

    public function discover(Request $request)
    {
        $user = Auth::user();
        
        if (!$user->latitude || !$user->longitude) {
            // Default to returning users without distance if location isn't set
            $users = User::with('photos')
                ->where('id', '!=', $user->id)
                ->where('profile_complete', true)
                ->limit(20)
                ->get();
            return response()->json($users);
        }

        $latitude = $user->latitude;
        $longitude = $user->longitude;
        $radius = $request->query('radius', 50); // Default 50km

        $users = User::with('photos')
            ->select('users.*')
            ->selectRaw(
                '(6371 * acos(cos(radians(?)) * cos(radians(latitude)) * cos(radians(longitude) - radians(?)) + sin(radians(?)) * sin(radians(latitude)))) AS distance',
                [$latitude, $longitude, $latitude]
            )
            ->where('id', '!=', $user->id)
            ->where('profile_complete', true)
            ->having('distance', '<=', $radius)
            ->orderBy('distance')
            ->limit(30)
            ->get();

        return response()->json($users);
    }

    public function uploadPhoto(Request $request)
    {
        $request->validate([
            'photo' => 'required|image|max:5120', // Max 5MB
        ]);

        $user = Auth::user();
        
        if ($request->hasFile('photo')) {
            $file = $request->file('photo');
            $filename = time() . '_' . $file->getClientOriginalName();
            $path = $file->storeAs('public/user_photos', $filename);
            
            $url = 'http://127.0.0.1:8000/storage/user_photos/' . $filename;

            $photo = \App\Models\UserPhoto::create([
                'user_id' => $user->id,
                'url' => $url,
                'is_profile' => $user->photos()->count() === 0,
                'order' => $user->photos()->count() + 1
            ]);

            $user->profile_complete = true;
            $user->save();

            return response()->json([
                'message' => 'Photo uploaded successfully',
                'photo' => $photo,
                'user' => $user->load('photos')
            ]);
        }

        return response()->json(['message' => 'No file uploaded'], 400);
    }

    public function randomMatch(Request $request)
    {
        $gender = $request->query('gender');
        $user = Auth::user();

        $query = User::where('id', '!=', $user->id)
            ->where('profile_complete', true);

        if ($gender && $gender !== 'both') {
            $query->where('gender', $gender);
        }

        $match = $query->inRandomOrder()->first();

        if (!$match) {
            return response()->json(['message' => 'No matches found yet.'], 404);
        }

        return response()->json($match->load('photos'));
    }
}
