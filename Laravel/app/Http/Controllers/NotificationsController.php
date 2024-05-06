<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Resources\NotificationsResource;
use App\Models\Notification;
use App\Traits\HttpResponses;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class NotificationsController extends Controller
{
    use HttpResponses;

    public function index()
    {
        $user_id = Auth::user()->id;

        $notification = Notification::where('user_id', $user_id)->get();

        return response()->json(NotificationsResource::collection($notification), 200);
    }

    public function destroy(string $id)
    {
        $user_id = Auth::user()->id;
        try {
            $notification = Notification::find($id);

            if($user_id == $notification->user_id){
                $notification->delete();
                return $this->success('', 'La notification a été supprimer');
            }
            else{
                return $this->error('', 'Vous ne pouvez pas supprimer la notification d\'un autre utilisateur', 505);
            }
            
        } catch (\Throwable $e) {
            //Gérer l'erreur
            Log::debug($e);
            return $this->error('', $e, 403);
        }
    }
}
