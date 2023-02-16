<?php
    
namespace App\Imports;
    
use App\Models\Test;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
     
class Import implements ToModel, WithHeadingRow
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {
        return new Test([
            'cust_age' => $row['cust_age'],
            'cust_gender' => $row['cust_gender'],
            'cust_address' => $row['cust_address'],
            'point' => $row['point'],
            'store_name' => $row['store_name'],
            'amount_sold'=> $row['amount_sold'],
            'date_time' => $row['date_time'],
        ]);

    }
}