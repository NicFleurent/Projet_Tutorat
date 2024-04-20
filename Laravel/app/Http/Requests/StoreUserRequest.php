<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreUserRequest extends FormRequest
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
            'email' => ['required','email','unique:users'],
            'nom' => ['required'],
            'prenom' => ['required'],
            'role' => ['required'],
            'password' => ['required']
            // Dans password, nous avons décidez d'enlever la validation Rules/Password::default()
        ];
    }

    public function messages(){
        return[
            'email.required' => 'L\'email est requis',
            'email.email' => 'Entrer une adresse courriel valide',
            'email.unique' => 'Ce email est déjà pris',
            'nom.required' => 'Le nom est requis',
            'prenom.required' => 'Le prénom est requis',
            'role.required' => 'Le rôle est requis',
            'password.required' => 'Le mot de passe est requis',
        ];
    }
}

