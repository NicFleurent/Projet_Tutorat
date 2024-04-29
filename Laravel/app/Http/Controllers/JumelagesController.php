<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\JumelageRequest;
use App\Http\Requests\RencontreRequest;
use App\Http\Resources\JumelagesResource;
use App\Models\Jumelage;
use App\Traits\HttpResponses;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use App\Traits\RencontreTrait;
use App\Traits\SessionsDurresTrait;
use Carbon\Carbon;



class JumelagesController extends Controller
{
    use HttpResponses;
    use RencontreTrait;
    use SessionsDurresTrait;

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $jumellages = Jumelage::all();

        return response()->json($jumellages, 200);
    }

    public function store(JumelageRequest $request)
    {
        $request->validated($request->all());

        $jumelage = Jumelage::create([
            'journee' => $request->journee,
            'heure' => $request->heure,
            'demande_accepte' => $request->demande_accepte,
            'cours_id' => $request->cours_id,
            'tuteur_id' => $request->tuteur_id,
            'aider_id' => $request->aider_id

        ]);

        if ($jumelage) {

            $this->createRencontresSessions($request->journee, $request->heure,  $jumelage->id);

            return response()->json([
                'message' => 'Jumelage creer avec success',
                'jumelage' => new JumelagesResource($jumelage)
            ], 200);
        } else {
            return response()->json(['message' => 'Échec de la creation du jumelage'], 500);
        }
    }

    public function demandeAttente()
    {
        $user_id = Auth::user()->id;

        try {
            $demandeTutorat = Jumelage::where('tuteur_id', $user_id)
                ->where('demande_accepte', 0)
                ->orderBy('aider_id')
                ->orderBy('cours_id')
                ->get();

            foreach ($demandeTutorat as $jumelage) {
                $jumelage->heure = Carbon::parse($jumelage->heure)->format('H:i');
            }

            return response()->json(JumelagesResource::collection($demandeTutorat), 200);
        } catch (\Throwable $e) {
            //Gérer l'erreur
            Log::debug($e);
            return $this->error('', $e, 403);
        }
    }

    public function acceptJumelage(string $id)
    {
        try {
            $demandeTutorat = Jumelage::find($id);

            if ($demandeTutorat->demande_accepte == false) {
                $demandeTutorat->demande_accepte = true;

                $demandeTutorat->save();
                return $this->success('', 'La demande de tutorat a été acceptée');
            } else {
                return $this->error('', 'Cette demande est déjà acceptée', 403);
            }
        } catch (\Throwable $e) {
            //Gérer l'erreur
            Log::debug($e);
            return $this->error('', $e, 403);
        }
    }

    public function refuseJumelage(string $id)
    {
        try {
            $demandeTutorat = Jumelage::find($id);

            if ($demandeTutorat->demande_accepte == false) {
                $demandeTutorat->delete();

                return $this->success('', 'La demande de tutorat a été refusée');
            } else {
                return $this->error('', 'Cette demande est déjà acceptée', 403);
            }
        } catch (\Throwable $e) {
            //Gérer l'erreur
            Log::debug($e);
            return $this->error('', $e, 403);
        }
    }
    public function createRencontresSessions($jourDeLaSemaine, $heure, $jumelageId)
    {
        try {
            Log::info('1');
            $response = $this->getCurrentSession();

            Log::info($response);

            $jsonData = json_decode($response, true);

            Log::info($jsonData[0]);

            if ($jsonData != null) {
                Log::info('2');

                $dateDebut = Carbon::parse($jsonData[0]['debut']);
                $dateFin = Carbon::parse($jsonData[0]['fin']);

                Log::info('3');

                for ($date = $dateDebut; $date->lte($dateFin); $date->addDay()) {
                    Log::info('4');
                    if ($date->dayOfWeek == $this->getDayOfWeekNumber($jourDeLaSemaine)) {
                        Log::info('5');
                        $request = new RencontreRequest([
                            'date' => $date,
                            'heure' => $heure,
                            'duree' => 1,
                            'jumelage_id' => $jumelageId
                        ]);

                        Log::info('6');
                        $this->createRencontre($request);
                    }
                }
            } else {
                Log::info('lol');
                $dateDebut = null;
                $dateFin = null;
            }
        } catch (\Exception $e) {
            // Gérer l'exception ici, par exemple, en journalisant l'erreur
            Log::error('Une erreur est survenue lors de la création des rencontres : ' . $e->getMessage());
        }
    }


    private function getDayOfWeekNumber($jourDeLaSemaine)
    {

        $jours = [
            'lundi' => Carbon::MONDAY,
            'mardi' => Carbon::TUESDAY,
            'mercredi' => Carbon::WEDNESDAY,
            'jeudi' => Carbon::THURSDAY,
            'vendredi' => Carbon::FRIDAY,
            'samedi' => Carbon::SATURDAY,
            'dimanche' => Carbon::SUNDAY,
        ];
        return $jours[strtolower($jourDeLaSemaine)] ?? null;
    }
}
