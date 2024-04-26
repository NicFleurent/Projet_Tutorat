<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class JumelageRequest extends FormRequest
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
            'journee' => ['required'],
            'heure' => ['required'],
            'cours_id' => ['required'],
            'tuteur_id' => ['required'],
            'aider_id' => ['required']
        ];
    }

    public function messages()
    {
        return [
            'journee.required' => 'La journee est obligatoire',
            'heure.required' => 'L\'heuree est obligatoire',
            'cours_id.required' => 'Le cours est obligatoire',
            'tuteur_id.required' => 'Le tuteur est obligatoire',
            'aider_id.required' => 'L\'aider est obligatoire',
        ];
    }
}
