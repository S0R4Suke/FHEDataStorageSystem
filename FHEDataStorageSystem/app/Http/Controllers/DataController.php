<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Customer;

class DataController extends Controller
{
    public function GetData(){
        $data = Customer::all();
        return view('calculation',['data' => $data]);
    }
}
