
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
window.CKKSCalculation = async function(){
    const seal = await SEAL()

    ////////////////////////
    // Encryption Parameters
    ////////////////////////
    
    // Create a new EncryptionParameters
    const schemeType = seal.SchemeType.ckks
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
    const CipherAGE = []
    const CipherPOINT = []
    const CipherSOLD = []
    for(var i = 0;i<data.length;i++){
      CipherAGE[i] = seal.CipherText()
      CipherAGE[i].load(context,data[i].cust_age)

      CipherPOINT[i] = seal.CipherText()
      CipherPOINT[i].load(context,data[i].point)

      CipherSOLD[i] = seal.CipherText()
      CipherSOLD[i].load(context,data[i].amount_sold)
    }

    //Create the PlainText(s) 
    const AGESUM = seal.CipherText()
    const POINTSUM = seal.CipherText()
    const SOLDSUM = seal.CipherText()

    ////////////////////////
    // Instances
    ////////////////////////

    // Create an Evaluator
    const evaluator = seal.Evaluator(context)

    ////////////////////////
    // Homomorphic Functions
    ////////////////////////
    // const ExecutionTime = [1000]
    // // for(var n = 0;n<1000;n++){
    // //   const startTime = performance.now() // 開始時間
      // const AGESUM = seal.CipherText()
      // const POINTSUM = seal.CipherText()
      // const SOLDSUM = seal.CipherText()
      for(var i = 1;i<3;i++){
        if(i==1){
          evaluator.add(CipherAGE[i-1],CipherAGE[i],AGESUM)
          evaluator.add(CipherPOINT[i-1],CipherPOINT[i],POINTSUM)
          evaluator.add(CipherSOLD[i-1],CipherSOLD[i],SOLDSUM)
        }else{
          evaluator.add(AGESUM,CipherAGE[i],AGESUM)
          evaluator.add(POINTSUM,CipherPOINT[i],POINTSUM)
          evaluator.add(SOLDSUM,CipherSOLD[i],SOLDSUM)
        }
      }
    //   const endTime = performance.now() // 終了時間
    //   ExecutionTime[n] = endTime - startTime
    // }

    const ResultAGE = AGESUM.save()
    const ResultPOINT = POINTSUM.save()
    const ResultSOLD = SOLDSUM.save()

    const link = document.createElement('a')
    const blobage = new Blob([ResultAGE],{type:"text/plain"})
    link.href = URL.createObjectURL(blobage)
    link.download = 'CKKS_Result_Enc_AGE.txt'
    link.click()

    // const blobpoint = new Blob([ResultPOINT],{type:"text/plain"})
    // link.href = URL.createObjectURL(blobpoint)
    // link.download = 'CKKS_Result_Enc_POINT.txt'
    // link.click()

    // const blobsum = new Blob([ResultSOLD],{type:"text/plain"})
    // link.href = URL.createObjectURL(blobsum)
    // link.download = 'CKKS_Result_Enc_SOLD.txt'
    // link.click()

    // const blob = new Blob([Result],{type:"text/plain"});
    // const link = document.createElement('a');
    // link.href = URL.createObjectURL(blob);
    // link.download = 'CKKS_Result_Enc.txt';
    // link.click();

    // // csvのダウンロード
    // const blob =new Blob([ExecutionTime],{type:"text/plain"}); //配列に上記の文字列(str)を設定
    // const link =document.createElement('a');
    // link.href = URL.createObjectURL(blob);
    // link.download ="CKKS_Result.txt";
    // //作ったリンクタグをクリックさせる
    // document.body.appendChild(link);
    // link.click();
}

// 計算結果の復号
window.CKKSCalc_Dec = async function(){
    const seal = await SEAL()

    ////////////////////////
    // Encryption Parameters
    ////////////////////////
    
    // Create a new EncryptionParameters
    const schemeType = seal.SchemeType.ckks

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

    // Create a ckksEncoder
    const ckksEncoder = seal.CKKSEncoder(context)

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
    const decoded = ckksEncoder.decode(plainText)
    // 配列を日本語に変換
    const Result = "合計:" + decoded[0]

    const blob = new Blob([Result],{type:"text/plain"})
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = 'CKKS_Result_Dec.txt'
    link.click()
}