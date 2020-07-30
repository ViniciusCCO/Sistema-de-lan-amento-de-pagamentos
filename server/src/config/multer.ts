import multer from 'multer'
import path from 'path'
import crypto from 'crypto'


export default multer({
    storage: multer.diskStorage({
        destination: path.resolve(__dirname, '..', '..', 'temp'),
        filename(request, file, callback) {
            const hash = crypto.randomBytes(5).toString('hex')

            const fileName = `${hash}-${file.originalname}`

            callback(null, fileName)
        }
    }),
    fileFilter: (request, file, callback) => {
        const ext = path.extname(file.originalname)

        if (ext !== '.xls' && ext !== '.xlsx') {
            return callback(new Error('Apenas planílhas do excel são permitidos'))
        }

        return callback(null, true)
    }
})

