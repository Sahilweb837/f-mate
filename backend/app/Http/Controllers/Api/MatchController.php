<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CupMatch;
use Illuminate\Http\Request;

class MatchController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $matches = CupMatch::where('user_a_id', $user->id)
            ->orWhere('user_b_id', $user->id)
            ->with(['userA', 'userB'])
            ->orderByDesc('matched_at')
            ->get();

        return response()->json($matches);
    }

    public function show($id)
    {
        $match = CupMatch::with(['userA', 'userB'])->findOrFail($id);
        return response()->json($match);
    }
}
