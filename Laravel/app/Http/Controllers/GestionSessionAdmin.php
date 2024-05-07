<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\SessionDuree;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;

class GestionSessionAdmin extends Controller
{
    public function listSession()
    {
        $sessions = SessionDuree::all(); 
        return view('listSession', compact('sessions'));
    }

    public function editSession($id)
    {
        $session = SessionDuree::find($id);
        if (!$session) {
            return redirect()->back()->with('error', 'Session pas trouvé.');
        }
        return view('editSession', compact('session'));
    }

    public function updateSession(Request $request, $id)
    {
        $session = SessionDuree::find($id);
        if (!$session) {
            return redirect()->back()->with('error', 'Session pas trouvé.');
        }

        $validatedData = $request->validate([
            'nom'               => 'sometimes|required|string|max:100',
            'debut'             => 'sometimes|required|date',
            'fin'               => 'sometimes|required|date',
            'session_courante'  => 'required|boolean',
        ]);

        if ($validatedData['session_courante'] === '0') {
            $session->update(['session_courante' => '0']);
        }
        
        $session->fill(array_filter($validatedData))->save();

        return redirect()->route('listSession')->with('success', 'Session modifié.');
    }



}
