<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreMessageRequest extends FormRequest
{
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
        return 
        [
            'to_id' => ['required'],
            'message' => ['required']
        ];
    }

    public function messages(){
        return[
            'to_id.required' => 'Un receveur est requis',
            'message.required' => 'Un message est requis',
        ];
    }
}
