<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\User_address;
use App\User;
use Validator;

class AddressController extends Controller
{
   
    public function get_address(Request $request){
    	$id = $request->userId;
    	$exist = User::find($id);
    	if($exist != null){
    		$address = User::find($id)->User_address;
           	return response()->json(['success'=>$address],200);
	    }else{
			return response()->json(['error'=>'Not Found Any Address'],200);
	    }
    }

    public function store(User $user,User_address $User_address,Request $request) //Dependancy injection
    {
        $validator = Validator::make($request->all(),[
            'city' => 'required',
            'state' => 'required',
            'pincode'=>'required|integer'
        ]);
        if($validator->fails())
        {
            return response()->json(['error'=>$validator->errors()], 401);
        }
        else
        {
             $user->store_Address($request);
             return response()->json(['success'=>'saved'],200);
            }
       
    }
}
