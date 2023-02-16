<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Test;

class DataController extends Controller
{
    public function GetData(){
        $data = Test::all();
        return view('calculation',['data' => $data]);
    }
}
