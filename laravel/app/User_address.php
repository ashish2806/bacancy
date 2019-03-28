<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class User_address extends Model
{
    protected $tale = 'User_addresses';
    protected $fillable = ['user_id', 'city', 'state','pincode'];
}
