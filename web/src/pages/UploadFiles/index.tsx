import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import api from '../../services/api'
import Dropzone from '../../components/Dropzone'

import './styles.css'

interface FileError {
    error: String
    row: Number
    collumn: String
    value: any
}

const UploadFiles: React.FC = () => {
    const [selectedFile, setSelectedFile] = useState<File>()
    
    const history = useHistory()

    async function handleSubmit() {
        const data = new FormData()

        if (selectedFile)
            data.append('file', selectedFile)
        else
            return alert('Nenhum arquivo selecionado ou arquivo inválido')

        await api.post('file', data)
            .then((res) => {
                alert('Pagamento cadastrado com sucesso!')
                return history.go(-1)
            }, (res) => {
                return alert('Falha ao cadastrar. Verifique os dados do arquivo!')
            })
    }

    return (
        <>
            <header>
                <Link className='active' to='/'>Cadastrar</Link>
                <Link to='/consult-payments'>Consultar</Link>
            </header>

            <div id='page-upload-files'>
                <div className="content">
                    <h1>Upload de arquivo</h1>

                    <Dropzone onFileUploaded={setSelectedFile} />

                    <button onClick={handleSubmit}>Cadastrar pagamento</button>
                </div>
            </div>
        </>
    )
}

export default UploadFiles