<?php

namespace App\Traits;

use App\Http\Requests\StoreNotificationRequest;
use App\Models\Notification;

trait NotificationTrait
{
    protected function storeNotification(StoreNotificationRequest $request)
    {
        $request->validated($request->all());

        $notification = Notification::create([
            'date' => $request->message,
            'heure' => $request->user_id,
        ]);

        if ($notification) {
            return response()->json([
                'message' => 'Notification crée avec succès'
            ], 200);
        } else {
            return response()->json(['message' => 'Échec de la creation de la notification'], 500);
        }
    }
}
