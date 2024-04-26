<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\FormulaireAide;
use App\Traits\HttpResponses;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use App\Http\Requests\StoreFormAideRequest;

class FormulaireAideController extends Controller
{
    use HttpResponses;

    public function showFormAide(Request $request)
    {

    }

    public function createFromAide(StoreFormAideRequest $request)
    {
        $request->validated($request->all());
    }

    public function teacherAddCommentAide(Request $request)
    {

    }

}
