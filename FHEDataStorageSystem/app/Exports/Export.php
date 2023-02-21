<?php

namespace App\Exports;

use App\Models\Test;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class Export implements FromCollection,WithHeadings
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return Test::select('cust_age','cust_gender','cust_address','point','store_name','amount_sold','date_time')->get();
    }
    public function headings():array
    {
        return ['cust_age','cust_gender','cust_address','point','store_name','amount_sold','date_time'];
    }
}
