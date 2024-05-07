<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Jumelage;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;

class GestionJumelageAdmin extends Controller
{
    public function listJumelage()
    {
        $jumelages = Jumelage::all(); 
        return view('listJumelage', compact('jumelages'));
    }

    public function editJumelage($id)
    {
        $jumelage = Jumelage::find($id);
        if (!$jumelage) {
            return redirect()->back()->with('error', 'Jumelage pas trouvé.');
        }
        return view('editJumelage', compact('jumelage'));
    }

    public function updateJumelage(Request $request, $id)
    {
        $jumelage = Jumelage::find($id);
        if (!$jumelage) {
            return redirect()->back()->with('error', 'Jumelage pas trouvé.');
        }

        $validatedData = $request->validate([
            'journee' => 'sometimes|required|string|max:100',
            'heure' => 'sometimes|required|max:100',
            'demande_accepte'  => 'required|boolean',
        ]);

        if ($validatedData['demande_accepte'] === '0') {
            $jumelage->update(['demande_accepte' => '0']);
        }

        $jumelage->fill(array_filter($validatedData))->save();

        return redirect()->route('listJumelage')->with('success', 'Jumelage modifié.');
    }

}
