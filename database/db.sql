-- CupMate Dating Platform - Database Schema
-- Optimized for MySQL / MariaDB

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- 1. USERS TABLE
CREATE TABLE IF NOT EXISTS `users` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `gender` enum('male','female','non_binary') DEFAULT NULL,
  `date_of_birth` date DEFAULT NULL,
  `bio` text DEFAULT NULL,
  `coffee_style` varchar(100) DEFAULT NULL,
  `latitude` decimal(10,8) DEFAULT NULL,
  `longitude` decimal(11,8) DEFAULT NULL,
  `profile_complete` tinyint(1) NOT NULL DEFAULT 0,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`),
  KEY `idx_location` (`latitude`, `longitude`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. USER PHOTOS
CREATE TABLE IF NOT EXISTS `user_photos` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) unsigned NOT NULL,
  `photo_url` varchar(255) NOT NULL,
  `is_primary` tinyint(1) NOT NULL DEFAULT 0,
  `order` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_photos_user_id_foreign` (`user_id`),
  CONSTRAINT `user_photos_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. SWIPES (Likes / Nopes)
CREATE TABLE IF NOT EXISTS `swipes` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) unsigned NOT NULL,
  `swiped_user_id` bigint(20) unsigned NOT NULL,
  `type` enum('like','dislike','super_like') NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `swipe_unique` (`user_id`, `swiped_user_id`),
  KEY `idx_swiped_user` (`swiped_user_id`),
  CONSTRAINT `swipes_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `swipes_swiped_user_id_foreign` FOREIGN KEY (`swiped_user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. MATCHES
CREATE TABLE IF NOT EXISTS `matches` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_one_id` bigint(20) unsigned NOT NULL,
  `user_two_id` bigint(20) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `match_unique` (`user_one_id`, `user_two_id`),
  CONSTRAINT `matches_user_one_foreign` FOREIGN KEY (`user_one_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `matches_user_two_foreign` FOREIGN KEY (`user_two_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. MESSAGES
CREATE TABLE IF NOT EXISTS `messages` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `match_id` bigint(20) unsigned NOT NULL,
  `sender_id` bigint(20) unsigned NOT NULL,
  `content` text NOT NULL,
  `is_read` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `messages_match_id_foreign` (`match_id`),
  CONSTRAINT `messages_match_id_foreign` FOREIGN KEY (`match_id`) REFERENCES `matches` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6. COFFEE INVITES
CREATE TABLE IF NOT EXISTS `coffee_invites` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `sender_id` bigint(20) unsigned NOT NULL,
  `receiver_id` bigint(20) unsigned NOT NULL,
  `venue_name` varchar(255) DEFAULT NULL,
  `scheduled_at` timestamp NULL DEFAULT NULL,
  `status` enum('pending','accepted','declined','completed') NOT NULL DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `invites_sender_foreign` FOREIGN KEY (`sender_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `invites_receiver_foreign` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

SET FOREIGN_KEY_CHECKS = 1;
