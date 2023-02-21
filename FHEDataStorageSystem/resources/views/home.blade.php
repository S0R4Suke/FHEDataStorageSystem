<!-- 各操作選択ページ -->
<!DOCTYPE html>
<html lang="ja">
<head>
    <!-- BootStrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">

    <!-- Script -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>

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
        <h5 class="card-header">Select operation</h5>
        <div class="card-body">
            <h5 class="card-title" ><a href="#" onclick="location.href='/keygenerator'">鍵の発行</a></h5>
            <p class="card-text">秘密鍵及び公開鍵を発行します</p>
        </div>
        <div class="card-body">
            <h5 class="card-title" ><a href="#" onclick="location.href='/encryption'">暗号化</a></h5>
            <p class="card-text">CSVファイルの暗号化を行います</p>
        </div>
        <div class="card-body">
            <h5 class="card-title" ><a href="#" onclick="location.href='/save_csv'">csvをデータベースに保存</a></h5>
            <p class="card-text">CSVをデータベースに保存します</p>
        </div>
        <div class="card-body">
            <h5 class="card-title" ><a href="#" onclick="location.href='/decryption'">復号</a></h5>
            <p class="card-text">CSVファイルを復号します</p>
        </div>
        <div class="card-body">
            <h5 class="card-title" ><a href="#" onclick="location.href='/calculation'">演算</a></h5>
            <p class="card-text">データベースに保存された暗号データを用いて準同型演算を行います</p>
        </div>
    </div>
</div>

    
</body>
</html>