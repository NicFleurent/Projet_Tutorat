<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreFormulaireTuteurRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'matiere_vu' => 'required',
            'note_aisance_aide' => 'required',
            'commentaire_aisance_aide' => 'required',
            'note_aisance_tuteur' => 'required',
            'commentaire_aisance_tuteur' => 'required',
            'note_evaluation' => 'required',
            'commentaire_evaluation' => 'required',
            'rencontre_id' => 'required',
        ];
    }

    public function messages(){
        return[
            'matiere_vu.required' => 'La matière vu est requise',
            'note_aisance_aide.required' => 'La note d\'aisance de l\'aidé est requise',
            'commentaire_aisance_aide.required' => 'Les commentaires sur l\'aisance de l\'aidé sont requis',
            'note_aisance_tuteur.required' => 'La note d\'aisance du tuteur est requise',
            'commentaire_aisance_tuteur.required' => 'Les commentaires sur l\'aisance du tuteur sont requis',
            'note_evaluation.required' => 'La note d\'évaluation de la rencontre est requise',
            'commentaire_evaluation.required' => 'les commentaires sur l\'évaluation de la rencontre sont requis',
            'rencontre_id.required' => 'L\'id de la rencontre est requis',
        ];
    }
}
