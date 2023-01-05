<!-- 各操作選択ページ -->
<!DOCTYPE html>
<html lang="ja">
<head>
    <!-- BootStrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>

    <!-- Script -->
    <script src="main.js"></script>

    <!-- Meta Data -->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    <!-- Title -->
    <title>Document</title>
</head>
<body>
    <div class="SelectFile">
        <form action="#">
            <p>保存するファイルを選択して下さい。</p>
            <input type="file" name="file" accept=".csv">
        </form>
    </div>

    <div class="SelectPubKey">
        <form action="#">
            <p>公開鍵を選択してください</p>
            <input type="file" name="file">
        </form>
    </div>

    <div class="Encryption">
        <button type="button" class="btn btn-primary btn-lg" onclick="location.href='/home'">暗号化する</button>
    </div>
</body>
</html>