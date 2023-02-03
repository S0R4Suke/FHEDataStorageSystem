<!-- 各操作選択ページ -->
<!DOCTYPE html>
<html lang="ja">
<head>
    <!-- BootStrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>

    <!-- Script -->
    <script src="{{ mix('js/calculation.js') }}"></script>

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
            <h2 class="float-left"> Calculation </h2>
            </div>
            <div class="row">
                <div class="col-sm-6">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">加算</h5>
                            <input id="pubkey" type="file" name="file">
                        </div>
                    </div>
                </div>
                <div class="Encryption text-center">
                <button type="button" class="btn btn-primary btn-lg" onclick="Encryption()">暗号化する</button>
            </div>
        </div>

        <div class="back-btn">
            <button type="button" class="btn btn-primary btn-lg" onclick="location.href='/home'">戻る</button>
        </div>
    </div>
</body>
</html>