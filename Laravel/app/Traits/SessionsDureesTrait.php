<?php

namespace App\Traits;

use App\Models\SessionDuree;

trait SessionsDureesTrait
{
    protected function getCurrentSession()
    {
        $session = SessionDuree::where('session_courante', true)->get();

        return $session;
    }
}
