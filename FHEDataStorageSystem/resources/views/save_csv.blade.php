<!-- 各操作選択ページ -->
<!DOCTYPE html>
<html lang="ja">
<head>
    <!-- BootStrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>

    <!-- Script -->
    {{-- <script src="main.js"></script> --}}

    <!-- Meta Data -->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    <!-- Title -->
    <title>Document</title>
</head>
<body>
    <div class="container mt-5">
 
   
        @if(session('status'))
          <div class="alert alert-success">
              {{ session('status') }}
          </div>
        @endif
       
        <div class="card">
          <div class="card-header font-weight-bold">
            <h2 class="float-left">Import and Export CSV File</h2>
            <h2 class="float-right">
                <a href="{{url('export-save_csv/csv')}}" class="btn btn-success">CSVで出力する</a>
            </h2>
          </div>
          <div class="card-body">
              <form id="save_csv-form" method="POST"  action="{{ url('import-save_csv') }}" accept-charset="utf-8" enctype="multipart/form-data">
                @csrf
                  <div class="row">
                      <div class="col-md-12">
                          <div class="form-group">
                              <input type="file" name="file" accept=".csv" placeholder="Choose file">
                          </div>
                          @error('file')
                              <div class="alert alert-danger mt-1 mb-1">{{ $message }}</div>
                          @enderror
                      </div>              
        
                      <div class="col-md-12">
                          <button type="submit" class="btn btn-primary" id="submit">保存する</button>
                      </div>
                  </div>     
              </form>
            </div>
        </div>
        <div class="back-btn">
            <button type="button" class="btn btn-primary btn-lg" onclick="location.href='/home'">戻る</button>
        </div>
    </div>
      
    
</body>
</html>