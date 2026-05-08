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
        Schema::create('swipes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('swiper_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('swiped_id')->constrained('users')->onDelete('cascade');
            $table->enum('type', ['like', 'dislike', 'superlike'])->default('like');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('swipes');
    }
};
