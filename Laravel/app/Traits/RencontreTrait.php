<?php

namespace App\Traits;

use App\Http\Requests\RencontreRequest;
use App\Http\Resources\RecontresResource;

use App\Models\Rencontre;

trait RencontreTrait
{
    protected function createRencontre(RencontreRequest $request)
    {

        //$request->validated($request->all());

        $rencontre = Rencontre::create([
            'date' => $request->date,
            'heure' => $request->heure,
            'duree' => $request->duree,
            'jumelage_id' => $request->jumelage_id
        ]);

        if ($rencontre) {
            return response()->json([
                'message' => 'Rencontre creer avec success',
                'rencontre' => new RecontresResource($rencontre)
            ], 200);
        } else {
            return response()->json(['message' => 'Échec de la creation de la recontre'], 500);
        }
    }
}
