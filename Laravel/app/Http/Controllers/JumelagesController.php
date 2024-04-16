<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Jumelage;
use Illuminate\Http\Request;

class JumelagesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $jumellages = Jumelage::all();

        return response()->json($jumellages, 200);
    }
}
