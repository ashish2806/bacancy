<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

App::bind('App\Billing\Stripe', function(){
	return new App\Billing\Stripe(config('services.stripe.secret'));
});

$stripe = App::make('App\Billing\Stripe');

Route::get('/', 'PagesController@index');
Route::get('/about', 'PagesController@about');
Route::get('/services', 'PagesController@services');

Route::resource('login', 'Auth\LoginController');

Route::resource('posts', 'PostController');

Auth::routes();

Route::get('/profile', 'DashboardController@viewUser');
Route::get('/profile/edit', 'DashboardController@editUser');

//Route::post('/profile/update', 'DashboardController@updateUser');

Route::post('/profile/update',[
    'as' => 'user.profile.update',
    'uses' => 'DashboardController@updateUser'
]);

Route::get('/dashboard', 'DashboardController@index');

Route::get('facebook', function () {
    return view('facebook');
});

Route::get('auth/facebook', 'Auth\FacebookController@redirectToFacebook');
Route::get('auth/facebook/callback', 'Auth\FacebookController@handleFacebookCallback');