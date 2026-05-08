<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('users', function (Blueprint $user) {
            $user->id();
            $user->string('name');
            $user->string('email')->unique();
            $user->timestamp('email_verified_at')->nullable();
            $user->string('password');
            $user->enum('gender', ['male', 'female', 'non_binary', 'prefer_not_to_say'])->nullable();
            $user->date('date_of_birth')->nullable();
            $user->text('bio')->nullable();
            $user->string('coffee_style', 100)->nullable();
            $user->decimal('latitude', 10, 8)->nullable();
            $user->decimal('longitude', 11, 8)->nullable();
            $user->boolean('profile_complete')->default(false);
            $user->boolean('is_online')->default(false);
            $user->timestamp('last_seen')->nullable();
            $user->rememberToken();
            $user->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
