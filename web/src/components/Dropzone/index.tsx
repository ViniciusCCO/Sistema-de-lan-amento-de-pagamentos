import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { FiUpload, FiFile } from 'react-icons/fi'

import './styles.css'

interface Props {
    onFileUploaded: (file: File) => void
}

const Dropzone: React.FC<Props> = ({ onFileUploaded }) => {
    const [selectedFile, setSelectedFile] = useState('')

    const onDrop = useCallback(acceptedFiles => {
        const file = acceptedFiles[0]

        setSelectedFile(`${file.name} - ${file.size}`)
        onFileUploaded(file)
    }, [onFileUploaded])
    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: '.xlsx, .xls'
    })

    return (
        <div className='dropzone' {...getRootProps()}>
            <input {...getInputProps()} accept='.xlsx, .xls' />
            {
                !selectedFile ?
                    <p><FiUpload />Solte sua planilha aqui</p> :
                    <p style={{ color: '#01037c', fontWeight: 'bold' }}><FiFile />{selectedFile} bytes</p>
            }
        </div>
    )
}

export default Dropzone