<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\StoreMessageRequest;
use App\Models\Message;
use Illuminate\Support\Facades\Log;

class MessageController extends Controller
{

    //Needs to return the names instead of id if possible
    public function index()
    {
        $userId = Auth::id();
        $messages = Message::where('to_id', $userId)->get();
        return response()->json($messages, 200);
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

    public function show(string $id)
    {
        //
    }

    public function edit(string $id)
    {
        //
    }

    public function update(Request $request, string $id)
    {
        //
    }

    public function destroy(string $id)
    {
        //
    }
}
