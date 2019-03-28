<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Notifiable, HasApiTokens;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];



    public function User_address()
    { 
        return $this->hasMany('App\User_address');
    }

    public function store_Address($address)
    {
        User_address::create([
            'user_id' =>  $address->userId,
            'city' => $address->city,
            'state' => $address->state,
            'pincode' => $address->pincode
        ]);
    }
}

