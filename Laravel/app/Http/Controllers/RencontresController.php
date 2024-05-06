<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\RencontreRequest;
use App\Models\Rencontre;
use Illuminate\Http\Request;
use App\Traits\HttpResponses;
use App\Http\Resources\RecontresResource;
use App\Models\FormulaireTuteur;
use App\Models\Jumelage;
use App\Models\Notification;
use App\Traits\NotificationTrait;
use App\Traits\RencontreTrait;
use Carbon\Carbon;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class RencontresController extends Controller
{
    use HttpResponses;
    use RencontreTrait;
    use NotificationTrait;
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


    public function prochainesRencontres()
    {
        $user_id = Auth::user()->id;

        $jumelages = Jumelage::where('tuteur_id', $user_id)
            ->orWhere('aider_id', $user_id)
            ->get();

        $idJumelages = [];

        foreach ($jumelages as $jumelage) {
            array_push($idJumelages, $jumelage->id);
        }

        $rencontres = Rencontre::whereIn('jumelage_id', $idJumelages)
            ->whereDate('date', '>', Carbon::now())
            ->orderBy('date')
            ->limit(3)
            ->get();

        foreach ($rencontres as $rencontre) {
            $rencontre->heure = Carbon::parse($rencontre->heure)->format('H:i');
            $rencontre->date = Carbon::parse($rencontre->date)->locale('fr_FR')->isoFormat('LL');
        }

        return response()->json(RecontresResource::collection($rencontres), 200);
    }

    public function rencontresSansFormulaire()
    {
        $user_id = Auth::user()->id;

        $jumelages = Jumelage::where('tuteur_id', $user_id)->get();

        $idJumelages = [];

        foreach ($jumelages as $jumelage) {
            array_push($idJumelages, $jumelage->id);
        }

        $formulairesTuteur = FormulaireTuteur::all();

        $idRencontreDejaFait = [];

        foreach ($formulairesTuteur as $formulaireTuteur) {
            array_push($idRencontreDejaFait, $formulaireTuteur->rencontre_id);
        }

        $rencontres = Rencontre::whereIn('jumelage_id', $idJumelages)
            ->whereDate('date', '<', Carbon::now())
            ->whereNotIn('id', $idRencontreDejaFait)
            ->orderBy('date')
            ->get();

        foreach ($rencontres as $rencontre) {
            $rencontre->heure = Carbon::parse($rencontre->heure)->format('H:i');
            $rencontre->date = Carbon::parse($rencontre->date)->locale('fr_FR')->isoFormat('LL');
        }

        return response()->json(RecontresResource::collection($rencontres), 200);
    }

    public function cancellerRencontre(string $id)
    {
        $user_id = Auth::user()->id;
        try {
            $rencontre = Rencontre::find($id);

            $rencontre->heure = Carbon::parse($rencontre->heure)->format('H:i');
            $rencontre->date = Carbon::parse($rencontre->date)->locale('fr_FR')->isoFormat('LL');
            $message = 'La rencontre du '. $rencontre->date . ' à ' . $rencontre->heure;

            $user_id_notif = "";
            if($rencontre->jumelage->tuteur_id == $user_id)
            {
                $user_id_notif =  (string)$rencontre->jumelage->aider_id;
                $message = $message. ' avec '. $rencontre->jumelage->tuteur->prenom . ' ' . $rencontre->jumelage->tuteur->nom;
            }
            else{
                $user_id_notif =  (string)$rencontre->jumelage->tuteur_id;
                $message = $message. ' avec '. $rencontre->jumelage->aide->prenom . ' ' . $rencontre->jumelage->aide->nom;
            }

            $message = $message.' a été cancellée';

            
            $notification = Notification::create([
                'message' => $message,
                'user_id' => $user_id_notif
            ]);
            $notification->save();

            $rencontre->delete();

            return $this->success('', 'La rencontre a été cancellée');
        } catch (\Throwable $e) {
            //Gérer l'erreur
            Log::debug($e);
            return $this->error('', $e, 403);
        }
    }

    public function modifierRencontre(Request $request, Rencontre $rencontre)
    {
        $user_id = Auth::user()->id;

        $validator = Validator::make($request->all(), [
            'date' => 'required',
            'heure' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        } else {

            $rencontre->heure = Carbon::parse($rencontre->heure)->format('H:i');
            $rencontre->date = Carbon::parse($rencontre->date)->locale('fr_FR')->isoFormat('LL');
            $message = 'La rencontre du '. $rencontre->date . ' à ' . $rencontre->heure;


            $user_id_notif = "";
            if($rencontre->jumelage->tuteur_id == $user_id)
            {
                $user_id_notif =  (string)$rencontre->jumelage->aider_id;
                $message = $message. ' avec '. $rencontre->jumelage->tuteur->prenom . ' ' . $rencontre->jumelage->tuteur->nom;
            }
            else{
                $user_id_notif =  (string)$rencontre->jumelage->tuteur_id;
                $message = $message. ' avec '. $rencontre->jumelage->aide->prenom . ' ' . $rencontre->jumelage->aide->nom;
            }

            $rencontre->date = $request->date;
            $rencontre->heure = $request->heure;
            $rencontre->save();

            $message = $message.' a été déplacée au ';

            $rencontre->heure = Carbon::parse($rencontre->heure)->format('H:i');
            $rencontre->date = Carbon::parse($rencontre->date)->locale('fr_FR')->isoFormat('LL');
            $message = $message. $rencontre->date . ' à ' . $rencontre->heure;

            
            $notification = Notification::create([
                'message' => $message,
                'user_id' => $user_id_notif
            ]);
            $notification->save();

            $rencontreResource = new RecontresResource($rencontre);

            return response()->json([
                'message' => 'La rencontre a été modifiée',
                'data' => $rencontreResource,
            ], 200);
        }
    }
}
