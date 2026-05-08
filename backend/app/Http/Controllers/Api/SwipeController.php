<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Swipe;
use App\Models\Block;
use Illuminate\Http\Request;

class SwipeController extends Controller
{
    public function like($id)
    {
        return $this->swipe($id, 'like');
    }

    public function dislike($id)
    {
        return $this->swipe($id, 'dislike');
    }

    public function superLike($id)
    {
        return $this->swipe($id, 'super_like');
    }

    private function swipe($targetId, string $action)
    {
        $user = auth()->user();

        if ($user->id == $targetId) {
            return response()->json(['error' => 'Cannot swipe yourself'], 422);
        }

        $target = User::findOrFail($targetId);

        // Upsert swipe
        $swipe = Swipe::updateOrCreate(
            ['swiper_id' => $user->id, 'swiped_id' => $targetId],
            ['action' => $action]
        );

        $matched = false;
        $match   = null;

        if (in_array($action, ['like', 'super_like'])) {
            // Check if the target already liked back
            $mutualSwipe = Swipe::where('swiper_id', $targetId)
                ->where('swiped_id', $user->id)
                ->whereIn('action', ['like', 'super_like'])
                ->exists();

            if ($mutualSwipe) {
                // Create match (ensure user_a < user_b for uniqueness)
                [$a, $b] = $user->id < $targetId
                    ? [$user->id, $targetId]
                    : [$targetId, $user->id];

                $match = \App\Models\CupMatch::firstOrCreate(
                    ['user_a_id' => $a, 'user_b_id' => $b],
                    ['matched_at' => now()]
                );

                // Create conversation
                \App\Models\Conversation::firstOrCreate(['match_id' => $match->id]);

                $matched = true;

                // Notify both users
                broadcast(new \App\Events\NewMatch($match, $user, $target))->toOthers();
            }
        }

        return response()->json([
            'matched' => $matched,
            'match'   => $matched ? $match->load('userA', 'userB') : null,
        ]);
    }

    public function whoLikedMe()
    {
        $likers = Swipe::where('swiped_id', auth()->id())
            ->whereIn('action', ['like', 'super_like'])
            ->with('swiper')
            ->orderByDesc('created_at')
            ->get();

        return response()->json($likers);
    }
}
