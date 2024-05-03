<?php

namespace App\Repository;

use App\Models\Message;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;

class ConversationRepository
{

    private $user;
    private $message;

    public function __construct(User $user, Message $message)
    {
        $this->user = $user;
        $this->message = $message;
    }



    public function getConversations($userId)
    {
        return $this->user->newQuery()
            ->select('users.nom', 'users.prenom', 'users.id')
            ->whereExists(function ($query) use ($userId) {
                $query->selectRaw(1)
                    ->from('messages')
                    ->whereRaw('messages.from_id = users.id')
                    ->where('messages.to_id', $userId)
                    ->orWhere(function ($query) use ($userId) {
                        $query->where('messages.from_id', $userId)
                            ->whereRaw('messages.to_id = users.id');
                    });
            })
            ->where('users.id', '!=', $userId)
            ->groupBy('users.id', 'users.nom', 'users.prenom')
            ->get();
    }



    public function getMessagesFor($from, $to): Builder
    {
        return $this->message->newQuery()->whereRaw("((from_id = $from AND to_id = $to) OR (from_id = $to AND to_id = $from))")
            ->orderBy('created_at', 'DESC');
    }

    public function createMessage(String $content, $from, $to)
    {
        return $this->message->newQuery()->create([
            'content' => $content,
            'from_id' => $from,
            'to_id' => $to,
            'created_at' => Carbon::now()
        ]);
    }
}
