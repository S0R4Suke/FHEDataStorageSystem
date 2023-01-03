<?php
 
namespace App\Http\Controllers;
 
use Illuminate\Http\Request;
use App\Exports\Export;
use App\Imports\Import;
use Maatwebsite\Excel\Facades\Excel;
use App\Models\Customer;
 
class CSVController extends Controller
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function index()
    {
       return view('save_csv');
    }

    /**
    * @return \Illuminate\Support\Collection
    */
    public function importCSV(Request $request) 
    {
        $validatedData = $request->validate([
           'file' => 'required',
        ]);
 
        Excel::import(new Import,$request->file('file'));
            
        return redirect('save_csv')->with('status', 'The file has been csv imported to database in laravel 8');
    }
 
    /**
    * @return \Illuminate\Support\Collection
    */
    public function exportCSV($slug) 
    {
        return Excel::download(new Export, 'users.'.$slug);
    }
    
}