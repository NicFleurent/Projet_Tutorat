<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\RencontreRequest;
use App\Models\Rencontre;
use Illuminate\Http\Request;
use App\Traits\HttpResponses;
use App\Http\Resources\RecontresResource;
use App\Traits\RencontreTrait;

class RencontresController extends Controller
{
    use HttpResponses;
    use RencontreTrait;
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $rencontres = Rencontre::all();

        return response()->json($rencontres, 200);
    }

    public function store(RencontreRequest $request)
    {
        $response = $this->createRencontre($request);

        return $response;
    }
}
