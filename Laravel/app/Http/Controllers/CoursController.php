<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreTuteurRequest;
use App\Http\Resources\CoursResource;
use App\Http\Resources\TuteurCoursResource;
use Illuminate\Http\Request;
use App\Models\Cours;
use App\Models\TuteurCours;
use App\Models\User;
use App\Traits\HttpResponses;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class CoursController extends Controller
{
    use HttpResponses;
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(CoursResource::collection(Cours::all()), 200);
    }

    public function demandeAttente()
    {
        $user_id = Auth::user()->id;

        $cours_id = [];

        $cours = Cours::where('responsable_id', $user_id)->get();
        foreach ($cours as $cour) {
            array_push($cours_id, $cour->id);
        }

        $demandeTuteur = TuteurCours::with('cours')
            ->with('tuteur')
            ->whereIn('cours_id', $cours_id)
            ->where('demande_accepte', 0)
            ->orderBy('cours_id')
            ->get();

        return response()->json(TuteurCoursResource::collection($demandeTuteur), 200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function storeTuteur(StoreTuteurRequest $request)
    {
        $request->validated($request->all());

        try {
            $user = User::find($request->tuteur_id);
            $cours = Cours::find($request->cours_id);

            if ($cours->tuteurs->contains($user)) {
                Log::debug("La relation existe déjà");
                return $this->error('', 'Vous êtes déjà tuteur pour ce cours', 403);
            } else {
                $cours->tuteurs()->attach($user);
                $cours->save();
                return $this->success('', 'La demande d\'être tuteur a fonctionné');
            }
        } catch (\Throwable $e) {
            //Gérer l'erreur
            Log::debug($e);
            return $this->error('', $e, 403);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function acceptTuteurCours(string $id)
    {
        try {
            $demandeTuteur = TuteurCours::find($id);

            if ($demandeTuteur->demande_accepte == false) {
                $demandeTuteur->demande_accepte = true;

                $demandeTuteur->save();
                return $this->success('', 'La demande d\'être tuteur a été acceptée');
            } else {
                return $this->error('', 'Cette demande est déjà acceptée', 403);
            }
        } catch (\Throwable $e) {
            //Gérer l'erreur
            Log::debug($e);
            return $this->error('', $e, 403);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function refuseTuteurCours(string $id)
    {
        try {
            $demandeTuteur = TuteurCours::find($id);

            if ($demandeTuteur->demande_accepte == false) {
                $demandeTuteur->delete();

                return $this->success('', 'La demande d\'être tuteur a été refusée');
            } else {
                return $this->error('', 'Cette demande est déjà acceptée', 403);
            }
        } catch (\Throwable $e) {
            //Gérer l'erreur
            Log::debug($e);
            return $this->error('', $e, 403);
        }
    }
}
