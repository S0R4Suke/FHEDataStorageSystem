import Encoding from 'encoding-japanese';
import SEAL from 'node-seal'

// 秘密鍵
var A = ''
window.addEventListener('load', function() {
  document.getElementById('seckey').addEventListener('change', (e) => {
    const pkreader = new FileReader()
    const pkfile_content = e.target.files[0]
    // ファイルの種類を絞る
    if (pkfile_content.type === 'text/plain') {
        pkreader.onload = () => {
          A = pkreader.result
        }
    }
    pkreader.readAsText(pkfile_content)
  })
})

var B = []
window.addEventListener('load',function(){
  // csv
  document.getElementById('csv_file').addEventListener('change', (e) => {
    //FileReaderのインスタンスを作成する
    const csvreader = new FileReader();
    const csvfile_content = e.target.files[0];
  
    //読み込んだファイルの中身を取得する
    // csvreader.readAsText(csvfile_content)
  
    if (csvfile_content.type === 'text/csv') {
      csvreader.onload = () => {
        var tmp = csvreader.result.split('\n')
        for (var i = 0; i < tmp.length; i++){
          // csvの１行のデータを取り出す
          var row_data = tmp[i]
          B[i] = row_data.split(',')
          // console.log(B[i])
        }
      }
      csvreader.readAsText(csvfile_content)
    }
  })
})

window.Decryption = async function(){
    const seal = await SEAL()

    ////////////////////////
    // Encryption Parameters
    ////////////////////////
    
    // Create a new EncryptionParameters
    const schemeType = seal.SchemeType.bfv

    const securityLevel = seal.SecurityLevel.tc128
    const polyModulusDegree = 2048
    const bitSizes = [32]
    const bitSize = 20
    
    // sealに値渡し
    const encParms = seal.EncryptionParameters(schemeType)

    // Assign Poly Modulus Degree
    encParms.setPolyModulusDegree(polyModulusDegree)
    
    // Create a suitable set of CoeffModulus primes
    encParms.setCoeffModulus(
      seal.CoeffModulus.Create(
        polyModulusDegree,
        Int32Array.from(bitSizes)
      )
    )

    // Assign a PlainModulus (only for bfv scheme type)
    encParms.setPlainModulus(
      seal.PlainModulus.Batching(
        polyModulusDegree,
        bitSize
      )
    )

    ////////////////////////
    // Context
    ////////////////////////
    
    // Create a new Context
    const context = seal.Context(
      encParms,
      true,
      securityLevel
    )

    // Helper to check if the Context was created successfully
    if (!context.parametersSet()) {
      throw new Error('Could not set the parameters in the given context. Please try different encryption parameters.')
    }

    ////////////////////////
    // Keys
    ////////////////////////

    const secretBase64Key = A
    const UploadedSecretKey = seal.SecretKey()
    UploadedSecretKey.load(context, secretBase64Key)


    ////////////////////////
    // Variables
    ////////////////////////

    // A

    ////////////////////////
    // Instances
    ////////////////////////

    // Create a BatchEncoder
    const batchEncoder = seal.BatchEncoder(context)

    // Create an Decryptor
    const decryptor = seal.Decryptor(
        context,
        UploadedSecretKey
    )
    console.log('DEBUG')

    ////////////////////////
    // Homomorphic Functions
    ////////////////////////

    // 暗号化したデータを使って配列を編集
    var C = ""
    for(var i=0;i<B.length;i++){
      if(i == 0){
        for(var j=0;j<B[i].length;j++){
          if(j == B[i].length-1){
            C += B[i][j]+"\n"
          }else{
            C += B[i][j]+","
          }
        }
      }else{
        for(var j=0;j<B[i].length;j++){
          if(j==1 || j==2 ){
            // 暗号文を格納する変数を定義
            const CipherText = seal.CipherText()
            // 暗号文を格納
            CipherText.load(context,B[i][j])
            // 復号
            const plainText = decryptor.decrypt(CipherText)
            // Decode
            const decoded = batchEncoder.decode(plainText)
            // 配列を日本語に変換
            const decodedTEXT = Encoding.codeToString(decoded)
            console.log('PLAINTEXT:\n',decodedTEXT);
            C += decodedTEXT+","

          }else if(j == B[i].length-1){
            C += B[i][j]+"\n"
          }else{
            C += B[i][j]+","
          }
        }
      }
    }

    const blob =new Blob([C],{type:"text/csv"}); //配列に上記の文字列(str)を設定
    const link =document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download ="decrypted.csv";
    //作ったリンクタグをクリックさせる
    document.body.appendChild(link);
    link.click();
}