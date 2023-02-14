<!-- 各操作選択ページ -->
<!DOCTYPE html>
<html lang="ja">
<head>
    <!-- BootStrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>

    <!-- Script -->
    <script src="{{ mix('js/bfv_decryption.js') }}"></script>
    <script src="{{ mix('js/ckks_decryption.js') }}"></script>

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
            <h5 class="card-header">Decryption</h5>
            <div class="card-body">
                <h5 class="card-title">ファイルの選択</h5>
                <p class="card-text">秘密鍵を選択してください</p>
                <div class="input-group mb-3">
                    <input type="file" class="form-control" id="seckey">
                  </div>
                <p class="card-text">復号するcsvファイルを選択して下さい</p>
                <div class="input-group mb-3">
                    <input type="file" class="form-control" id="csv_file">
                </div>
            </div>
            <div class="card-body">
                <h5 class="card-title">BFV</h5>
                <p class="card-text">BFV暗号方式で復号を行います</p>
                <a href="#" class="btn btn-primary" onclick="BFVDecryption()">復号する</a>
                
            </div>
              <div class="card-body">
                <h5 class="card-title">CKKS</h5>
                <p class="card-text">CKKS暗号方式で復号を行います</p>
                <a href="#" class="btn btn-primary" onclick="CKKSDecryption()">復号する</a>
              </div>
          </div>

        <div class="back-btn">
            <button type="button" class="btn btn-primary" onclick="location.href='/home'">戻る</button>
        </div>
    </div>
</body>
</html>