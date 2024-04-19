<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CoursRequest extends FormRequest
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
            'numero' => 'required',
            'nom' => 'required',
            'responsable_id' => 'required',
            'programme_id' => 'required',
        ];
    }

    public function messages(){
        return[
            'numero.required' => 'Le numéro est requis',
            'nom.required' => 'Le nom est requis',
            'responsable_id.required' => 'Le responsable est requis',
            'programme_id.required' => 'Le programme est requis',
        ];
    }
}
