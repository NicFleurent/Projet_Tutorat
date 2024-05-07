<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\StoreMessageRequest;
use App\Models\Message;
use Illuminate\Support\Facades\Log;

class MessageController extends Controller
{
    /*
    //function destroy and get need thinking on


    //Needs to return the names instead of id if possible
    //
    public function index()
    {
        $userId = Auth::id();
        $messages = Message::where('to_id', $userId)->get();
        return response()->json($messages, 200);
    }

    //A etre tester
    /*
    public function getMessage($id)
    {
        $userId = Auth::id();
        
        $message = Message::where(function ($query) use ($userId) {
            $query->where('from_id', $userId)
                  ->orWhere('to_id', $userId);
        })->find($id);
    
        if (!$message) {
            return response()->json(['error' => 'Message pas trouver'], 404);
        }
    
        return response()->json($message, 200);
    }
    

    public function store(StoreMessageRequest $request)
    {
        $request->validated($request->all());

        $message = Message::create([
            'from_id' => auth()->user()->id,
            'to_id'   => $request->to_id,
            'message' => $request->message,
        ]);

        $message->save();

        return response()->json(['message' => 'Sucesse'], 200);
    }

    //needs to be verified if it works
    public function destroy($id)
    {
        $message = Message::find($id);
        if (!$message) {
            return response()->json(['error' => 'Message not found'], 404);
        }

        $user = auth()->user();

        if ($user->id !== $message->from_id && $user->id !== $message->to_id) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $message->delete();
        return response()->json(['message' => 'Message deleted successfully'], 200);
    }
    */
}
