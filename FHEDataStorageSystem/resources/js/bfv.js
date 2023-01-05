import SEAL from 'node-seal'
// export async function KeyGenerate() {
window.KeyGenerate = async function(){
    const seal = await SEAL()
    
    ////////////////////////
    // Encryption Parameters
    ////////////////////////
    
    // Create a new EncryptionParameters
    const schemeType = seal.SchemeType.bfv

    const securityLevel = seal.SecurityLevel.tc128
    const polyModulusDegree = 4096
    const bitSizes = [36,36,37]
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
    
    // Create a new KeyGenerator (use uploaded keys if applicable)
    const keyGenerator = seal.KeyGenerator(
      context
    )

    // Get the SecretKey from the keyGenerator
    const Secret_key_Keypair_A_ = keyGenerator.secretKey()


    // Get the PublicKey from the keyGenerator
    const Public_key_Keypair_A_ = keyGenerator.createPublicKey()

    // Save SecKey
    const Secret_key = Secret_key_Keypair_A_.save()

    // Save PubKey
    const Public_key = Public_key_Keypair_A_.save()
    
    document.getElementById("secretkey").value = Secret_key
    document.getElementById("publickey").value = Public_key
    
    
    // Download section
    const element = document.createElement('a')
    document.body.appendChild(element)
    const blobPub = new Blob([Public_key],{type:"text/plain"})
    element.href = window.URL.createObjectURL(blobPub);
    element.download = "pubKey.text"
    element.click()
    document.body.removeChild(element)
}