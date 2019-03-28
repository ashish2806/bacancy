<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Support\Facades\Auth;
use Validator;

class PassportController extends Controller
{
    public $successStatus = 200;

    public function login(Request $request)
    {
    	if(Auth::attempt(['email' => request('email'), 'password'=>request('password')]))
    	{
    		$user = Auth::user();
    		$success['token'] = $user->createToken('MyApp')->accessToken;
    		$success['userid'] = $user->id;
    		return response()->json(['success'=>$success], $this->successStatus);
    	}
    	else
    	{
    		return response()->json(['error'=>'Unauthorized'], 401);
    	}
    }

    public function register(Request $request)
    {
    	$validator = Validator::make($request->all(),[
    		'name' => 'required',
    		'email' => 'required|email',
    		'password' => 'required',
    		'c_password' => 'required|same:password',
    	]);

    	if($validator->fails())
    	{
			//dd('hh');
    		return response()->json(['error'=>$validator->errors()], 401);
    	}
    	else
    	{
			$input = $request->all();
			
    		//$facebook_id = isset($input['facebook_id']) ? $input['facebook_id'] : '';

    		$input['password'] = bcrypt($input['password']);
    		$user = User::create($input);
    		$success['token'] = $user->createToken('MyApp')->accessToken;
    		$success['name'] = $user->name;
			//$success['firm_name'] = $user->firm_name;
			$success['userid'] = $user->id;
    		return response()->json(['success'=>$success], $this->successStatus);	
    	}
    }

    public function getDetails()
    {
    	$user = Auth::user();
    	return response()->json(['success'=>$user], $this->successStatus);
    }

   
}
