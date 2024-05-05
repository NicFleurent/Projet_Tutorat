<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreFormAideRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true; //MAY NEED TO BE AJUSTED
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'jumelage_id' => ['required'],
            'aisanceAide' => ['required'],
            'commentaireAisanceAide' => ['required'],
            'aisanceTuteur' => ['required'],
            'commentaireAisanceTuteur' => ['required'],
            'evaluationTuteur' => ['required'],
            'commentaireEvaluationTuteur' => ['required']
            //noteProfesseur n'est pas neccesaire pour la creation
        ];
    }

    public function messages()
    {
        return[
            'jumelage_id.required' => 'L\'id de jumelage est requis',
            'aisanceAide.required' => 'Aisance Aide est requis',
            'aisanceTuteur.required' => 'Aisance tuteur est requis',
            'evaluationTuteur.required' => 'Une evaluation du tuteur est requis',
        ];
    }
}
