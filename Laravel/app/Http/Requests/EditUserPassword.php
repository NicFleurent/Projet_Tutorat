<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class EditUserPassword extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'oldPassword' => ['required','string'],
            'newPassword' => ['required','string']
        ];
    }

    public function messages(){
        return[
            'oldPassword.required' => 'Le vieux mot de passe est requis',
            'newPassword.required' => 'Le nouveau mot de passe est requis'
        ];
    }
}
