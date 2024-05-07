<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreMessageRequest;
use App\Http\Resources\ConversationResource;
use App\Http\Resources\MessageResource;
use App\Models\User;
use App\Repository\ConversationRepository;
use Illuminate\Auth\AuthManager;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class ConversationsController extends Controller
{

    private $repository;

    public function __construct(ConversationRepository $conversationRepository)
    {
        $this->repository = $conversationRepository;
    }

    public function index()
    {

        $conversations = $this->repository->getConversations(Auth::id());

        return response()->json(ConversationResource::collection($conversations), 200);
    }

    public function show($id)
    {
        $messages = $this->repository->getMessagesFor(Auth::id(), $id)->get();

        return response()->json(MessageResource::collection($messages), 200);
    }

    public function store($id, StoreMessageRequest $request)
    {
        $user = Auth::id();

        $message = $this->repository->createMessage(
            $request->get('content'),
            $user,
            $id
        );

        return response()->json(new MessageResource($message), 200);
    }
}
