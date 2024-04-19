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
            'email' => ['required','string','max:255', 'unique:users'],
            'nom' => ['required','string','max:255'],
            'prenom' => ['required','string','max:255'],
            'role' => ['required','string','max:255'],
            'password' => ['required']
            // Dans password, nous avons décidez d'enlever la validation Rules/Password::default()
        ];
    }
}

