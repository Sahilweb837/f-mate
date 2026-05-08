<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('video_calls', function (Blueprint $table) {
            $table->id();
            $table->foreignId('caller_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('callee_id')->constrained('users')->onDelete('cascade');
            $table->string('room_id')->unique();
            $table->enum('status', ['ringing', 'ongoing', 'completed', 'missed', 'declined'])->default('ringing');
            $table->timestamp('started_at')->nullable();
            $table->timestamp('ended_at')->nullable();
            $table->integer('duration_seconds')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('video_calls');
    }
};
