<?php

namespace App\Http\Controllers;

use App\Http\Requests\CoursRequest;
use Illuminate\Http\Request;
use App\Models\Cours;
use App\Models\Programme;
use App\Models\User;
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

    public function ajoutCour()
    {
        $utilisateurs = User::orderby('prenom')->get();
        $programmes = Programme::orderby('numero')->get();
        return View('ajoutCour', compact('utilisateurs', 'programmes'));
    }

    public function storeCour(CoursRequest $request)
    {
        try {
            $cours = new Cours($request->all());
            $cours->save();
            return redirect()->route('listCours')->with('message', "Vous avez bien ajouté " . $cours->numero . " !");
        }
    
        catch (\Throwable $e) {
            //Gérer l'erreur
            Log::debug($e);
            return redirect()->route('listCours')->withErrors('L\'ajout n\'a pas fonctionné');
        }
    }


}
