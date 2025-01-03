<?php
use App\Http\Controllers\ConversationsController;
use App\Http\Controllers\CoursController;
use App\Http\Controllers\ProgrammesController;
use App\Http\Controllers\DisponibilitesController;
use App\Http\Controllers\JumelagesController;
use App\Http\Controllers\UtilisateursController;
use App\Http\Controllers\EmployesController;
use App\Http\Controllers\FormulaireTuteurController;
use App\Http\Controllers\RencontresController;
use App\Http\Controllers\SessionDureeController;
use App\Http\Controllers\FormulaireAideController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\NotificationsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


//Utilisateurs

Route::post('login', [UtilisateursController::class, 'login'])->name('login');
Route::post('register', [UtilisateursController::class, 'register']);

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::post('logout', [UtilisateursController::class, 'logout']);                                           //Logout
    Route::put('/utilisateurs/updatePassword', [UtilisateursController::class, 'updatePassword']);              //Update Password
    Route::put('/utilisateurs/edit', [UtilisateursController::class, 'edit']);                                  //Edit User
    Route::patch('/utilisateurs/desactiver', [UtilisateursController::class, 'desactiver']);                    //Desactiver Compte
    Route::get('cours/demandeAttente', [CoursController::class, 'demandeAttente']);    
    Route::get('cours/demandeAcceptee', [CoursController::class, 'demandeAcceptee']);                             //Demande Attente
    Route::patch('cours/acceptTuteurCours/{id}', [CoursController::class, 'acceptTuteurCours']);                //Accepter Tuteur
    Route::delete('cours/refuseTuteurCours/{id}', [CoursController::class, 'refuseTuteurCours']);               //Refuser Tuteur Cours
    Route::get('jumelages/demandeAttente', [JumelagesController::class, 'demandeAttente']);                     //Demande Attente
    Route::get('jumelages/jumelageSansFormulaire', [JumelagesController::class, 'jumelageSansFormulaire']);     //Demande Attente
    Route::patch('jumelages/acceptJumelage/{id}', [JumelagesController::class, 'acceptJumelage']);              //Accept Jumelage
    Route::delete('jumelages/refuseJumelage/{id}', [JumelagesController::class, 'refuseJumelage']);             //Refuser Jumelage
    Route::get('rencontres/prochainesRencontres', [RencontresController::class, 'prochainesRencontres']);       //Get 3 prochaines rencontres
    Route::get('rencontres/rencontresSansFormulaire', [RencontresController::class, 'rencontresSansFormulaire']); //Get les rencontres sans formulaire pour le tuteur
    Route::delete('rencontres/cancellerRencontre/{id}', [RencontresController::class, 'cancellerRencontre']);  //Canceller rencontre
    Route::put('rencontres/modifierRencontre/{rencontre}', [RencontresController::class, 'modifierRencontre']);       // Modifier rencontre
    Route::post('formulaireTuteur/store', [FormulaireTuteurController::class, 'store']);                        //Ajoute le formulaire tuteur
    //Route::get('formulaireAide/index', [FormulaireAideController::class, 'index']);
    Route::post('formulaireAide/store', [FormulaireAideController::class, 'store']); 
    Route::get('formulaireAide/sansCommentaire', [FormulaireAideController::class, 'sansCommentaire']);       //Get formulaire non commenter par le prof
    Route::patch('formulaireAide/ajoutCommentaire/{id}', [FormulaireAideController::class, 'ajoutCommentaire']);//Ajouter les commentaires du prof
    Route::get('formulaireTuteur/sansCommentaire', [FormulaireTuteurController::class, 'sansCommentaire']);       //Get formulaire non commenter par le prof
    Route::patch('formulaireTuteur/ajoutCommentaire/{id}', [FormulaireTuteurController::class, 'ajoutCommentaire']);//Ajouter les commentaires du prof


    // Messagerie
    Route::get('conversations', [ConversationsController::class, 'index']);
    Route::post('conversation/store/{id}', [ConversationsController::class, 'store']);
    Route::get('conversation/show/{id}', [ConversationsController::class, 'show']);

    //notifications
    Route::get('notifications', [NotificationsController::class, 'index']);
    Route::delete('notifications/{id}', [NotificationsController::class, 'destroy']);
});


Route::get('/whoAmI', function () {      //Returns information sure personne auth
    return auth()->user();
})->middleware('auth:sanctum');

//Employes
Route::get('/employes', [EmployesController::class, 'index']);


//Cours
Route::get('cours', [CoursController::class, 'index']);
Route::post('cours/storeTuteur', [CoursController::class, 'storeTuteur']);


//Programmes
Route::get('programmes', [ProgrammesController::class, 'index']);


//Disponibilites
Route::get('disponibilites', [DisponibilitesController::class, 'index']);
Route::post('disponibilites/upload', [DisponibilitesController::class, 'upload']);
Route::put('disponibilites/edit/{dispo}', [DisponibilitesController::class, 'edit']);
Route::delete('disponibilites/delete/{dispo}', [DisponibilitesController::class, 'delete']);
Route::get('disponibilites/{idCours}', [DisponibilitesController::class, 'indexDisponibilites']);



//Jumellages
Route::get('jumelages', [JumelagesController::class, 'index']);
Route::post('jumelage/create', [JumelagesController::class, 'store']);
Route::post('jumelage/accepte/{id}', [JumelagesController::class, 'acceptJumelage']);
Route::post('jumelage/refuse/{id}', [JumelagesController::class, 'refuseJumelage']);

//Rencontres
Route::get('rencontres', [RencontresController::class, 'index']);
Route::post('rencontres/create  ', [RencontresController::class, 'store']);

//SessionDuree

Route::get('session', [SessionDureeController::class, 'index']);
