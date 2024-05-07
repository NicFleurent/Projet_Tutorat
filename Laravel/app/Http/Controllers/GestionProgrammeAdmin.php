<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Programme;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;
class GestionProgrammeAdmin extends Controller
{
    public function listProgramme()
    {
        $programme = Programme::all(); 
        return view('listProgramme', compact('programme'));
    }

    public function editProgramme($id)
    {
        $programme = Programme::find($id);
        if (!$programme) {
            return redirect()->back()->with('error', 'Programme pas trouvé.');
        }
        return view('editProgramme', compact('programme'));
    }

    public function updateProgramme(Request $request, $id)
    {
        $programme = Programme::find($id);
        if (!$programme) {
            return redirect()->back()->with('error', 'Programme pas trouvé.');
        }

        $validatedData = $request->validate([
            'numero'   => 'sometimes|required|max:6',
            'nom'      => 'sometimes|required|string|max:100',
        ]);

        $programme->fill(array_filter($validatedData))->save();

        return redirect()->route('listProgramme')->with('success', 'Programme modifié.');
    }

}
