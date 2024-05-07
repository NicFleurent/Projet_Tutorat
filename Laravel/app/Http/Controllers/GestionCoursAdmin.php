<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cours;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;
class GestionCoursAdmin extends Controller
{
    public function listCours()
    {
        $cours = Cours::all(); 
        return view('listCours', compact('cours'));
    }

    public function editCour($id)
    {
        $cour = Cours::find($id);
        if (!$cour) {
            return redirect()->back()->with('error', 'Cours pas trouvé.');
        }
        return view('editCour', compact('cour'));
    }

    public function updateCour(Request $request, $id)
    {
        $cour = Cours::find($id);
        if (!$cour) {
            return redirect()->back()->with('error', 'Cours pas trouvé.');
        }

        $validatedData = $request->validate([
            'numero' => 'sometimes|required|string|max:100',
            'nom' => 'sometimes|required|string|max:100',
            'responsable_id' => 'sometimes|required|max:100',
            'programme_id' => 'sometimes|required|max:100',
        ]);

        $cour->fill(array_filter($validatedData))->save();

        return redirect()->route('listCours')->with('success', 'Cours modifié.');
    }


}
