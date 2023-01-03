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
    <div class="choice">
        <button type="button" class="btn btn-primary btn-lg" onclick="location.href='/keygenerator'">鍵の発行</button>
    </div>

    <div class="choice">
        <button type="button" class="btn btn-primary btn-lg" onclick="location.href='/save_csv'">csvをデータベースに保存</button>
    </div>

    <div class="choice">
        <button type="button" class="btn btn-primary btn-lg" onclick="location.href='/encryption'">暗号化</button>
    </div>

    <div class="choice">
        <button type="button" class="btn btn-primary btn-lg" onclick="location.href='/home'">復号</button>
    </div>
</body>
</html>