<?php
    
namespace App\Imports;
    
use App\Models\Customer;
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
        return new Customer([
            'name'     => $row['name'],
            'address'  => $row['address'], 
            'Revenues' => $row['revenues'],
        ]);
    }
}