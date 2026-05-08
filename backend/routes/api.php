<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\SwipeController;
use App\Http\Controllers\Api\MatchController;
use App\Http\Controllers\Api\MessageController;

/*
|--------------------------------------------------------------------------
| API Routes - CupMate Dating Platform
|--------------------------------------------------------------------------
*/

// Public Routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Protected Routes (JWT Required)
Route::middleware('auth:api')->group(function () {
    
    // User Profile & Discovery
    Route::get('/user', [UserController::class, 'me']);
    Route::put('/profile/update', [UserController::class, 'updateProfile']);
    Route::post('/profile/photos', [UserController::class, 'uploadPhoto']);
    Route::put('/profile/location', [UserController::class, 'updateLocation']);
    
    // Discovery Algorithm
    Route::get('/discover', [UserController::class, 'discover']);
    Route::get('/random-match', [UserController::class, 'randomMatch']);
    
    // Interaction System
    Route::post('/swipes', [SwipeController::class, 'store']);
    Route::get('/matches', [MatchController::class, 'index']);
    
    // Real-time Messaging
    Route::get('/messages/{match_id}', [MessageController::class, 'getMessages']);
    Route::post('/messages', [MessageController::class, 'sendMessage']);
    
    // Coffee Invites
    Route::post('/invites', [UserController::class, 'sendInvite']);
    Route::get('/invites', [UserController::class, 'getInvites']);
    // Video Call System
    Route::post('/video-calls/initiate/{match_id}', [VideoCallController::class, 'initiate']);
    Route::post('/video-calls/accept/{room_id}', [VideoCallController::class, 'accept']);
    Route::post('/video-calls/decline/{room_id}', [VideoCallController::class, 'decline']);
    Route::post('/video-calls/end/{room_id}', [VideoCallController::class, 'end']);
    Route::get('/video-calls/token/{room_id}', [VideoCallController::class, 'getToken']);
    Route::get('/video-calls/history', [VideoCallController::class, 'history']);
});
