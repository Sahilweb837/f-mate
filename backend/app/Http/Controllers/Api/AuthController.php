<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;
use PHPOpenSourceSaver\JWTAuth\Exceptions\JWTException;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name'          => 'required|string|max:100',
            'email'         => 'required|email|unique:users,email',
            'password'      => 'required|string|min:8|confirmed',
            'gender'        => 'required|in:male,female,non_binary,prefer_not_to_say',
            'date_of_birth' => 'required|date|before:-18 years',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $user = User::create([
            'name'          => $request->name,
            'email'         => $request->email,
            'password'      => Hash::make($request->password),
            'gender'        => $request->gender,
            'date_of_birth' => $request->date_of_birth,
        ]);

        $token = JWTAuth::fromUser($user);

        return response()->json([
            'message' => 'Welcome to CupMate! ☕',
            'user'    => $user,
            'token'   => $token,
        ], 201);
    }

    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        try {
            if (!$token = JWTAuth::attempt($credentials)) {
                return response()->json(['error' => 'Invalid credentials'], 401);
            }
        } catch (JWTException $e) {
            return response()->json(['error' => 'Could not create token'], 500);
        }

        $user = auth()->user();
        $user->update(['is_online' => true, 'last_seen' => now()]);

        return response()->json([
            'token' => $token,
            'user'  => $user,
        ]);
    }

    public function logout()
    {
        $user = auth()->user();
        if ($user) {
            $user->update(['is_online' => false, 'last_seen' => now()]);
        }
        JWTAuth::invalidate(JWTAuth::getToken());
        return response()->json(['message' => 'Logged out successfully']);
    }

    public function refresh()
    {
        try {
            $token = JWTAuth::refresh(JWTAuth::getToken());
            return response()->json(['token' => $token]);
        } catch (JWTException $e) {
            return response()->json(['error' => 'Token refresh failed'], 401);
        }
    }

    public function me()
    {
        return response()->json(auth()->user()->load('photos', 'preferences'));
    }

    public function forgotPassword(Request $request)
    {
        // Implementation: send reset email
        return response()->json(['message' => 'Password reset link sent to your email']);
    }

    public function resetPassword(Request $request)
    {
        // Implementation: validate token and update password
        return response()->json(['message' => 'Password reset successfully']);
    }

    public function verifyEmail($token)
    {
        // Implementation: verify email token
        return response()->json(['message' => 'Email verified successfully']);
    }
}
