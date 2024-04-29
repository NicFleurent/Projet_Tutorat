<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\SessionDuree;
use Illuminate\Http\Request;
use App\Traits\SessionsDurresTrait;

class SessionDureeController extends Controller
{
    use SessionsDurresTrait;

    public function index()
    {
        $response = $this->getCurrentSession();

        return $response;
    }

    
}
