<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\OTPController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\ForgotPasswordController;
use App\Http\Controllers\ListingController;
use App\Http\Controllers\Auth\ResetPasswordController;
use App\Http\Controllers\Auth\OTPVerificationController;
use App\Http\Controllers\PropertyController;
use App\Http\Controllers\ImageController;



// routes/api

Route::post('/register', [RegisterController::class, 'register']);
Route::post('/login', [LoginController::class, 'login']);
Route::get('/get-otp', [OTPController::class, 'getOTP']);
Route::middleware('auth:sanctum')->get('/details', [RegisterController::class, 'details']);
Route::post('/verify-otp', [OTPVerificationController::class, 'verifyOtp']);
Route::post('/forgot-password', [ForgotPasswordController::class, 'sendResetLinkEmail']);
Route::post('reset-password', [ResetPasswordController::class, 'reset']);
Route::get('/password/reset/', [ForgotPasswordController::class, 'showResetForm'])->name('password.reset');



Route::get('/listings', [ListingController::class, 'index']);
Route::post('/listings', [ListingController::class, 'store']);
Route::get('/listings/{id}', [ListingController::class, 'show']);
Route::put('/listings/{id}', [ListingController::class, 'update']);
Route::delete('/listings/{id}', [ListingController::class, 'destroy']);

Route::get('/combined-listings', [PropertyController::class, 'index']);

Route::get('/properties', [PropertyController::class, 'index']);
Route::get('/properties/{id}', [PropertyController::class, 'show']);
Route::post('/upload', [ImageController::class, 'upload']);



use App\Http\Controllers\RoomListingController;
Route::get('/rooms', [RoomListingController::class, 'index']);
Route::get('/rooms/{id}', [RoomListingController::class, 'show']);


// Roomate api routes
use App\Http\Controllers\RoommateController;

Route::post('/roommates', [RoommateController::class,'store']);
Route::get('/roommates', [RoommateController::class,'index']);
Route::get('/roommates/{id}', [RoommateController::class, 'show']);


// profile api
use App\Http\Controllers\ProfileController;

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/profile', [ProfileController::class, 'index']);
    Route::post('/profile', [ProfileController::class, 'store']);
});
