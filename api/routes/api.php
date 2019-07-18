<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/', function(){
    dump(config('app.env'));
    dump(config('app.debug'));
    dump(env('APP_ENV'));
    dump(env('APP_DEBUG'));
});

Route::resource('users', 'UserController')->only([
    'index', 'store', 'show'
]);

Route::resource('questions', 'QuestionController')->only([
    'index'
]);

Route::get('/info', function(){
    phpinfo();
});

