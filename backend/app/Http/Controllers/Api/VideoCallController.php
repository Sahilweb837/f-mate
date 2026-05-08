<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\VideoCall;
use App\Models\CupMatch;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class VideoCallController extends Controller
{
    /**
     * Initiate a video call to a matched user
     */
    public function initiate(Request $request, $matchId)
    {
        $match = CupMatch::where('id', $matchId)
            ->where(function ($q) {
                $q->where('user_a_id', auth()->id())
                  ->orWhere('user_b_id', auth()->id());
            })->firstOrFail();

        $calleeId = $match->user_a_id === auth()->id()
            ? $match->user_b_id
            : $match->user_a_id;

        $roomId = 'cupmate_' . Str::uuid();

        $call = VideoCall::create([
            'caller_id' => auth()->id(),
            'callee_id' => $calleeId,
            'match_id'  => $matchId,
            'room_id'   => $roomId,
            'status'    => 'ringing',
        ]);

        // Broadcast VC invite via WebSocket (Pusher/Soketi)
        broadcast(new \App\Events\VideoCallInitiated($call))->toOthers();

        return response()->json([
            'call'    => $call->load('caller'),
            'room_id' => $roomId,
        ], 201);
    }

    /**
     * Accept an incoming video call
     */
    public function accept(Request $request, $roomId)
    {
        $call = VideoCall::where('room_id', $roomId)
            ->where('callee_id', auth()->id())
            ->where('status', 'ringing')
            ->firstOrFail();

        $call->update(['status' => 'active', 'started_at' => now()]);

        broadcast(new \App\Events\VideoCallAccepted($call))->toOthers();

        return response()->json([
            'call'    => $call,
            'room_id' => $roomId,
            'token'   => $this->generateRoomToken($roomId, auth()->id()),
        ]);
    }

    /**
     * Decline a video call
     */
    public function decline(Request $request, $roomId)
    {
        $call = VideoCall::where('room_id', $roomId)
            ->where('callee_id', auth()->id())
            ->firstOrFail();

        $call->update(['status' => 'declined', 'ended_at' => now()]);

        broadcast(new \App\Events\VideoCallDeclined($call))->toOthers();

        return response()->json(['message' => 'Call declined']);
    }

    /**
     * End an active video call
     */
    public function end(Request $request, $roomId)
    {
        $call = VideoCall::where('room_id', $roomId)
            ->where(function ($q) {
                $q->where('caller_id', auth()->id())
                  ->orWhere('callee_id', auth()->id());
            })->firstOrFail();

        $duration = $call->started_at
            ? now()->diffInSeconds($call->started_at)
            : 0;

        $call->update([
            'status'           => 'ended',
            'ended_at'         => now(),
            'duration_seconds' => $duration,
        ]);

        broadcast(new \App\Events\VideoCallEnded($call))->toOthers();

        return response()->json([
            'message'  => 'Call ended',
            'duration' => $duration,
        ]);
    }

    /**
     * Get WebRTC room token for the client
     */
    public function getToken($roomId)
    {
        $call = VideoCall::where('room_id', $roomId)
            ->where(function ($q) {
                $q->where('caller_id', auth()->id())
                  ->orWhere('callee_id', auth()->id());
            })->firstOrFail();

        return response()->json([
            'room_id' => $roomId,
            'token'   => $this->generateRoomToken($roomId, auth()->id()),
            'iceServers' => $this->getIceServers(),
        ]);
    }

    public function history()
    {
        $calls = VideoCall::where('caller_id', auth()->id())
            ->orWhere('callee_id', auth()->id())
            ->with(['caller', 'callee'])
            ->orderByDesc('created_at')
            ->paginate(20);

        return response()->json($calls);
    }

    private function generateRoomToken($roomId, $userId)
    {
        // In production: use a proper WebRTC server token (LiveKit, Agora, etc.)
        return base64_encode("{$roomId}:{$userId}:" . time());
    }

    private function getIceServers(): array
    {
        return [
            ['urls' => 'stun:stun.l.google.com:19302'],
            ['urls' => 'stun:stun1.l.google.com:19302'],
            // Add TURN servers for production
        ];
    }
}
