const functions = require('firebase-functions');
const cors = require('cors')({ origin: true })
const fs = require('fs')
const uuid = require('uuid-v4')
const { Storage } = require('@google-cloud/storage')
const storage = new Storage({
    projectId: 'lambe-fde43',
    keyFilename: 'lambe-fde43.json'
})

exports.uploadImage = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        try {
            fs.writeFileSync('/tmp/imageToSave.jpg',
                request.body.image, 'base64')//salvando a imagem local descriptografada
            const bucket = storage.bucket('lambe-fde43.appspot.com')//url base do storage do firebase
            const id = uuid()//gera um id
            bucket.upload('/tmp/imageToSave.jpg', {
                uploadType: 'media',//tipo de arquivo enviado
                destination: `/posts/${id}.jpg`,//template string do destino
                metadata: {
                    metadata: {
                        contentType: 'image/jpeg',
                        firebaseStorageDownloadTokens: id
                    }
                }
            }, (err, file) => {
                if (err) {
                    return response.status(500).json({ error: err })
                } else {
                    const fileName = encodeURIComponent(file.name)
                    const imageUrl = 'https://firebasestorage.googleapis.com/v0/b/'
                        + bucket.name + '/o/' + fileName + '?alt=media&token=' + id
                    return response.status(201).json({ imageUrl: imageUrl }) //retorna a imageUrl caso de tudo certo
                }
            })
        } catch{
            console.log(err)
            return response.status(500).json({ error: err })
        }
    })
});