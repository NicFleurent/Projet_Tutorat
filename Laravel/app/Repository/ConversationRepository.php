<?php

namespace App\Repository;

use App\Models\Message;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class ConversationRepository
{

    private $user;
    private $message;

    public function __construct(User $user, Message $message)
    {
        $this->user = $user;
        $this->message = $message;
    }



    /*public function getConversations($userId)
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
    }*/

    public function getConversations($userId)
    {
        $user = User::find($userId);

        if ($user->role == 'aider') {
            return $this->getTuteursAndResponsablesDetails($userId);
        } elseif ($user->role == 'tuteur') {
            return $this->getAidesAndResponsablesDetails($userId);
        } elseif ($user->role == 'proffeseur') {
            return $this->getTuteursAndAidesDetailsForProfesseur($userId);
        }
    }

    private function getTuteursAndResponsablesDetails($aiderId)
    {
        $jumelages = DB::table('jumelages')
            ->select('cours_id', 'tuteur_id')
            ->where('aider_id', $aiderId)
            ->get();

        $tuteursIds = [];
        $coursIds = [];

        foreach ($jumelages as $jumelage) {
            $coursIds[] = $jumelage->cours_id;
            if (!in_array($jumelage->tuteur_id, $tuteursIds)) {
                $tuteursIds[] = $jumelage->tuteur_id;
            }
        }

        $tuteursDetails = $this->getUserDetailsByIds($tuteursIds);
        $responsablesDetails = $this->getResponsablesDetailsByCoursIds($coursIds);

        return array_merge($responsablesDetails, $tuteursDetails);
    }

    private function getAidesAndResponsablesDetails($tuteurId)
    {
        $jumelages = DB::table('jumelages')
            ->select('cours_id', 'aider_id')
            ->where('tuteur_id', $tuteurId)
            ->get();

        $aiderIds = [];
        $coursIds = [];

        foreach ($jumelages as $jumelage) {
            $coursIds[] = $jumelage->cours_id;
            if (!in_array($jumelage->aider_id, $aiderIds)) {
                $aiderIds[] = $jumelage->aider_id;
            }
        }

        $aidesDetails = $this->getUserDetailsByIds($aiderIds);
        $responsablesDetails = $this->getResponsablesDetailsByCoursIds($coursIds);

        return array_merge($responsablesDetails, $aidesDetails);
    }

    private function getTuteursAndAidesDetailsForProfesseur($professeurId)
    {
        $coursIds = $this->getCoursIdsByResponsableId($professeurId);
        $tuteursEtAidesIds = $this->getTuteursAndAidesIdsByCoursIds($coursIds);

        return $this->getUserDetailsByIds($tuteursEtAidesIds);
    }

    private function getUserDetailsByIds($userIds)
    {
        $userDetails = [];

        foreach ($userIds as $userId) {
            $userDetail = DB::table('users')
                ->select('id', 'nom', 'prenom')
                ->where('id', $userId)
                ->first();

            if ($userDetail) {
                $userDetails[$userId] = $userDetail;
            }
        }

        return $userDetails;
    }

    private function getResponsablesDetailsByCoursIds($coursIds)
    {
        $responsablesIds = DB::table('cours')
            ->whereIn('id', $coursIds)
            ->pluck('responsable_id')
            ->unique()
            ->toArray();

        return $this->getUserDetailsByIds($responsablesIds);
    }

    private function getCoursIdsByResponsableId($responsableId)
    {
        return DB::table('cours')
            ->where('responsable_id', $responsableId)
            ->pluck('id')
            ->toArray();
    }

    private function getTuteursAndAidesIdsByCoursIds($coursIds)
    {
        $tuteursEtAidesIds = [];

        foreach ($coursIds as $coursId) {
            $jumelages = DB::table('jumelages')
                ->select('tuteur_id', 'aider_id')
                ->where('cours_id', $coursId)
                ->get();

            foreach ($jumelages as $jumelage) {
                $tuteursEtAidesIds[] = $jumelage->tuteur_id;
                $tuteursEtAidesIds[] = $jumelage->aider_id;
            }
        }

        return array_unique($tuteursEtAidesIds);
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
