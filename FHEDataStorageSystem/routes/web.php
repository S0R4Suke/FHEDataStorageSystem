<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CSVController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/home',function (){
    return view('home');
});

Route::get('/keygenerator',function (){
    return view('keygenerator');
});

Route::get('/encryption',function (){
    return view('encryption');
});

Route::get('/save_csv',function (){
    return view('save_csv');
});


Route::get('save_csv', [CSVController::class, 'index']);
Route::post('import-save_csv', [CSVController::class, 'importCSV']);
Route::get('export-save_csv/{slug}', [CSVController::class, 'exportCSV']);