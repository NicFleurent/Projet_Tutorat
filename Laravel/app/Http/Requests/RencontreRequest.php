<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RencontreRequest extends FormRequest
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
            'date' => ['required', 'date'],
            'heure' => ['required'],
            'duree' => ['required'],
            'jumelage_id' => ['required']
        ];
    }

    public function messages()
    {
        return [
            'date.required' => 'La date est obligatoire',
            'date.date' => 'Entrer un format de date valide',
            'heure.required' => 'L\'heuree est obligatoire',
            'duree.required' => 'Le duree est obligatoire',
            'jumelage_id.required' => 'Le jumelage qui y est associe est obligatoire',
        ];
    }
}
