/* 必要な操作
加算・乗算を決定づける
どの列、行、カラムに変更を加えるかを決定づける
値を決定づける
処理

・計算結果の表示方法
DBからデータを配列Aに格納
jsから受け取った値を配列Bに格納
jsから受け取った演算方法を変数に格納
演算
出力
*/

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

var B = ''
window.addEventListener('load', function() {
  document.getElementById('result').addEventListener('change', (e) => {
    const pkreader = new FileReader()
    const pkfile_content = e.target.files[0]
    // ファイルの種類を絞る
    if (pkfile_content.type === 'text/plain') {
        pkreader.onload = () => {
          B = pkreader.result
        }
    }
    pkreader.readAsText(pkfile_content)
  })
})


// 計算結果
window.Calculation = async function(){
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

    // 

    ////////////////////////
    // Variables
    ////////////////////////
    const CipherRevenues = []

    for(var i = 0;i<data.length;i++){
      CipherRevenues[i] = seal.CipherText()
      const tmp = data[i].revenues
      CipherRevenues[i].load(context,tmp)
    }

    // Create the PlainText(s) 
    const CipherSUM = seal.CipherText()

    ////////////////////////
    // Instances
    ////////////////////////

    // Create an Evaluator
    const evaluator = seal.Evaluator(context)

    ////////////////////////
    // Homomorphic Functions
    ////////////////////////
    for(var i = 1;i<CipherRevenues.length;i++){
      if(i==1){
        evaluator.add(CipherRevenues[i-1],CipherRevenues[i],CipherSUM)
      }else{
        evaluator.add(CipherSUM,CipherRevenues[i],CipherSUM)
      }
    }
    const Result = CipherSUM.save()
    console.log(Result)

    const blob = new Blob([Result],{type:"text/plain"});
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'Result.txt';
    link.click();
}

// 計算結果の復号
window.Calc_Dec = async function(){
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

    ////////////////////////
    // Homomorphic Functions
    ////////////////////////

    // 暗号文を格納する変数を定義
    const CipherText = seal.CipherText()
    // 暗号文を格納
    CipherText.load(context,B)
    // 復号
    const plainText = decryptor.decrypt(CipherText)
    // Decode
    const decoded = batchEncoder.decode(plainText)
    // 配列を日本語に変換
    const Result = "合計:" + decoded[0]

    const blob = new Blob([Result],{type:"text/plain"});
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'Result.txt';
    link.click();
}