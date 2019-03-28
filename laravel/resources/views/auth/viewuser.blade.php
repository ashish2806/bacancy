@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-default">
                <div class="panel-heading">Register</div>

                <div class="panel-body">
						<div class="row form-group{{ $errors->has('firm_name') ? ' has-error' : '' }}">
                            <label for="firm_name" class="col-md-4 control-label">Firm Name</label>
                            <div class="col-md-6">
                                {{ $user->firm_name }}
                            </div>
                        </div>

                        <div class="row form-group{{ $errors->has('name') ? ' has-error' : '' }}">
                            <label for="name" class="col-md-4 control-label">Name</label>
                            <div class="col-md-6">
                            	{{ $user->name }}
                            </div>
                        </div>

                        <div class="row form-group{{ $errors->has('email') ? ' has-error' : '' }}">
                            <label for="email" class="col-md-4 control-label">E-Mail Address</label>
                            <div class="col-md-6">
                            	{{ $user->email }}
                            </div>
                        </div>

                        <div class="row form-group{{ $errors->has('email') ? ' has-error' : '' }}">
                            
                            <div class="col-md-12">
                            	<a href="/profile/edit" class="btn btn-default">Edit</a>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
