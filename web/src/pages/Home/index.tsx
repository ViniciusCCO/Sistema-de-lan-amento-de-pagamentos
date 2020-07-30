import React from 'react'
import { Link } from 'react-router-dom'

import './styles.css'

const Home: React.FC = () => {
    return (
        <>
            <header>
                <Link className='active' to='/'>Cadastrar</Link>
                <Link to='/consult-payments'>Consultar</Link>
            </header>

            <div id='page-home'>
                <div className="content">
                    <Link to='/create-payments'>
                        <button>Preencher pagamento</button>
                    </Link>
                    <Link to='/upload-files'>
                        <button>Upload de arquivo</button>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default Home