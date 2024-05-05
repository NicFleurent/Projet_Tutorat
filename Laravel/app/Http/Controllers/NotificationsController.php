<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Resources\NotificationsResource;
use App\Models\Notification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class NotificationsController extends Controller
{
    public function index()
    {
        $user_id = Auth::user()->id;

        $notification = Notification::where('user_id', $user_id)->get();

        return response()->json(NotificationsResource::collection($notification), 200);
    }
}
