<!-- 各操作選択ページ -->
<!DOCTYPE html>
<html lang="ja">
<head>
    <!-- BootStrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>

    <!-- Script -->
    <script src="{{ mix('js/bfv_keygenerate.js') }}"></script>
    <script src="{{ mix('js/ckks_keygenerate.js') }}"></script>

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
          <h5 class="card-header">KeyGenerate</h5>
          <div class="card-body">
            <h5 class="card-title">BFV</h5>
            <p class="card-text">BFV暗号方式で鍵の発行を行います</p>
            <a href="#" class="btn btn-primary" onclick="BFVKeyGenerate()">鍵の発行</a>
          </div>
          <div class="card-body">
            <h5 class="card-title">CKKS</h5>
            <p class="card-text">CKKS暗号方式で鍵の発行を行います</p>
            <a href="#" class="btn btn-primary" onclick="CKKSKeyGenerate()">鍵の発行</a>
          </div>

          <div class="card-body row">
            <h5 class="card-title">SecretKey</h5>
            <textarea id="secretkey"  onfocus="this.select()" readonly></textarea>
            <h5 class="card-title">PublicKey</h5>
            <textarea id="publickey"  onfocus="this.select()" readonly></textarea>
          </div>
        </div>
        <div class="back_btn">
          <button type="button" class="btn btn-primary btn-lg" onclick="location.href='/home'">戻る</button>
        </div>


</body>
</html>