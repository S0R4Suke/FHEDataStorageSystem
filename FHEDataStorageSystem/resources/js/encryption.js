// ボタンが押された時、関数を実行する
// getElementbyIdでファイルを取得し、CSVは列ごとの配列に格納する
// 公開鍵は何かしらの変数に格納する
// その二つのデータを使ってCSVを編集し、またCSVに直して、出力する

// 第2手順
// CSVを入力させて、CSVであることが確認できたら配列に格納する
// pubkeyを入力させる

import Encoding from 'encoding-japanese';
import SEAL from 'node-seal'

// 公開鍵
var A = ''
window.addEventListener('load', function() {
  document.getElementById('pubkey').addEventListener('change', (e) => {
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

window.Encryption = async function(){
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

    const publicBase64Key = A
    const UploadedPublicKey = seal.PublicKey()
    UploadedPublicKey.load(context, publicBase64Key)


    ////////////////////////
    // Variables
    ////////////////////////

    // Create the PlainText(s) 
    const PlainText = seal.PlainText()
    const CipherText = seal.CipherText()

    ////////////////////////
    // Instances
    ////////////////////////

    // Create an Evaluator
    const evaluator = seal.Evaluator(context)

    const batchEncoder = seal.BatchEncoder(context)

    // Create an Encryptor
    const encryptor = seal.Encryptor(
        context,
        UploadedPublicKey
    )

    ////////////////////////
    // Homomorphic Functions
    ////////////////////////

    // CSVを数列に変換(UTF-8)
    for(var i=1;i<=1;i++){
      for(var j=1;j<=B.length;j++){
        const PlainText = batchEncoder.encode(
          Int32Array.from(Encoding.stringToCode(B[i][j]))
        )

        // 定義
        encryptor.encrypt(
          PlainText,
          CipherText
        )
      // 暗号化する
        const cipherText = encryptor.encrypt(PlainText)
        const Cipher = cipherText.save()
        console.log(Cipher)
      }
    }

    // Encrypt a PlainText
    // encryptor.encrypt(
    //     PlainText,
    //     CipherText
    // )

    // 暗号化する
    // const cipherText = encryptor.encrypt(PlainText)

    // CSVに直す

}