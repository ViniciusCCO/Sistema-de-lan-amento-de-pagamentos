import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import api from '../../services/api'

import { FaEdit, FaTimes } from 'react-icons/fa'

import './styles.css'

interface Payments {
    id: number
    title: string
    value: number
    date: string
    externalTax: number
    comment: string
}

const ConsultPayments: React.FC = () => {
    const [payments, setPayments] = useState<Payments[]>([])

    const history = useHistory()

    useEffect(() => {
        api.get('payments').then((res) => {
            setPayments(res.data)
        })
    }, [])

    async function handleRemovePayment(id: number) {
        await api.delete(`payments/${id}`)
            .then(res => {
                alert('Pagamento deletado com sucesso.')
            }, res => {
                console.log(res)
                alert('Houve um erro ao remover o pagamento.')
            })
        history.go(0)
    }

    return (
        <>
            <header>
                <Link to='/'>Cadastrar</Link>
                <Link className='active' to='/consult-payments'>Consultar</Link>
            </header>

            <div id="page-consult-payments">
                <div className="content">
                    <h1>Consulta de pagamentos</h1>

                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Título</th>
                                <th>Valor</th>
                                <th>Imposto</th>
                                <th>Data</th>
                                <th>Comentário</th>
                                <th></th>
                            </tr>
                        </thead>

                        <tbody>
                            {payments.map(payment => (
                                <tr key={payment.id}>
                                    <td>{payment.id}</td>
                                    <td>{payment.title}</td>
                                    <td>R$ {(payment.value).toFixed(2)}</td>
                                    <td>R$ {(payment.externalTax).toFixed(2)}</td>
                                    <td>{(payment.date).substring(0, 10)}</td>
                                    <td>{payment.comment}</td>
                                    <td>
                                        <Link to={`/change-payments/${payment.id}`} >
                                            <button
                                                className='buttonEdit'
                                                title="Editar"
                                            >
                                                <FaEdit />
                                            </button>
                                        </Link>
                                        <button
                                            className='buttonRemove'
                                            title="Excluir"
                                            onClick={() => handleRemovePayment(payment.id)}
                                        >
                                            <FaTimes />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default ConsultPayments