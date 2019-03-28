<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use Illuminate\Support\Facades\Validator;

class DashboardController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
    	$user_id = auth()->user()->id;
    	$user = User::find($user_id);

        return view('dashboard')->with('posts',$user->posts);
    }

    public function viewUser()
	{
		$user_id = auth()->user()->id;
    	$user = User::find($user_id);
    	return view('auth.viewuser',compact('user'));	
	}

	public function editUser()
	{
		$user_id = auth()->user()->id;
    	$user = User::find($user_id);
    	return view('auth.editprofile',compact('user'));	
	}

	public function updateUser(Request $request)
	{
		$user_id = auth()->user()->id;
		
		$this->validate($request, [
        	'firm_name' => 'required|string|max:255',
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,id,'.$user_id,
            'password' => 'string|min:6|confirmed',
        ]);

		$user = User::find($user_id);
       	$user->name = $request->input('name');
       	$user->firm_name = $request->input('firm_name');
       	if($user->email != $request->input('email'))
        {
            $user->email = $request->input('email');
        }

        if($request->input('password') !='')
		{
			$user->password = bcrypt($request->input('password'));	
		}

		if($user->facebook_id == '')
		{
			$user->facebook_id = '-';	
		}

       	$user->save();



		/*$user->firm_name = $request->input('firm_name');
		$user->name = $request->input('name');
		//$user->email = $request->input('email');
		
		if($user->email != $request->input('email'))
        {
            $user->email = $request->input('email');
        }

		if($request->input('password') !='')
		{
			$user->password = bcrypt($request->input('password'));	
		}

		if($user->facebook_id == '')
		{
			$user->facebook_id = '-';	
		}*/
		
		
    	return redirect('/profile')->with('success', 'Your account has been updated!');
		
    	//return view('auth.editprofile',compact('user'));	
	}
}
