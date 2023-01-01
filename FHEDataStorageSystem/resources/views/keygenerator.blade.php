<!-- 各操作選択ページ -->
<!DOCTYPE html>
<html lang="ja">
<head>
    <!-- BootStrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>

    <!-- Script -->
    <script src="{{ mix('js/bfv.js') }}"></script>

    <!-- Meta Data -->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    <!-- Title -->
    <title>Document</title>
</head>

<body>
    <div class="KeyGenerater">
        <button type="button" class="btn btn-primary btn-lg" onclick="KeyGenerate()">鍵の発行</button>
    </div>
    <div class="SecretKey">
        <h1>SecretKey</h1>
        <textarea id="secretkey"  disabled readonly></textarea>
    </div>
    <div class="PublicKey">
        <h1>PublicKey</h1>
        <textarea id="publickey"  disabled readonly></textarea>
    </div>

    <div class="Back_button">
        <button type="button" class="btn btn-primary btn-lg" onclick="location.href='/home'">戻る</button>
    </div>
</body>
</html>