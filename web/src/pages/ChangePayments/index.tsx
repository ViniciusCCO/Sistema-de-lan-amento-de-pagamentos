import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import { Link, useParams, useHistory } from 'react-router-dom'
import api from '../../services/api'

import './styles.css'

interface Payments {
    id: number
    title: string
    value: number
    date: string
    externalTax: number
    comment: string
}

const ChangePayments: React.FC = () => {
    const [payments, setPayments] = useState<Payments>()
    const [selectedMonth, setSelectedMonth] = useState('')
    const [formData, setFormData] = useState({
        title: '',
        year: '',
        day: '',
        value: ''
    })
    const [textAreaData, setTextAreaData] = useState('')

    const { id } = useParams()
    const history = useHistory()

    useEffect(() => {
        api.get(`payments/${id}`).then((res) => {
            setPayments(res.data as Payments)
        })
    }, [id])

    useEffect(() => {
        setFormData({
            title: String(payments?.title),
            year: String(payments?.date.substring(0, 4)),
            day: String(payments?.date.substring(8, 10)),
            value: String(payments?.value)
        })

        setSelectedMonth(
            String(payments?.date.substring(5, 7))
        )

        setTextAreaData(
            String(payments?.comment)
        )
    }, [payments])

    function handleSelectMonth(event: ChangeEvent<HTMLSelectElement>) {
        const month = event.target.value

        setSelectedMonth(month)
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target

        setFormData({ ...formData, [name]: value })
    }

    function handleTextAreaChange(event: ChangeEvent<HTMLTextAreaElement>) {
        const comment = event.target.value
        setTextAreaData(comment)
    }

    async function handleSubmit(event: FormEvent) {
        event.preventDefault()

        const month = selectedMonth
        const { title, year, day, value } = formData
        const comment = textAreaData

        const data = {
            title,
            value,
            date: `${year}-${month}-${day}`,
            comment
        }

        await api.put(`payments/${id}`, data)
            .then((res) => { }, (res) => {
                console.log(res)
                return alert('Ocorreu um erro, tente novamente!')
            })

        alert('Pagamento atualizado com sucesso!')

        history.goBack()
    }

    return (
        <>
            <header>
                <Link to='/'>Cadastrar</Link>
                <Link to='/consult-payments'>Consultar</Link>
            </header>

            <div id='page-change-payments'>
                <div className="content">
                    <form onSubmit={handleSubmit}>
                        <h1>Atualizar pagamento</h1>

                        <fieldset>
                            <legend>
                                <h2>Dados do pagamento</h2>
                            </legend>

                            <div className='field'>
                                <label htmlFor="title">Título</label>
                                <input
                                    type="text"
                                    name='title'
                                    id='title'
                                    defaultValue={formData.title}
                                    minLength={5}
                                    maxLength={100}
                                    required
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="field-group">
                                <div className='field'>
                                    <label htmlFor='year'>Ano</label>
                                    <input
                                        type='number'
                                        name='year'
                                        id='year'
                                        defaultValue={formData.year}
                                        min='1900'
                                        required
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className='field'>
                                    <label htmlFor='month'>Mês</label>
                                    <select
                                        name='month'
                                        id='month'
                                        value={selectedMonth}
                                        required
                                        onChange={handleSelectMonth}
                                    >
                                        <option value=''>Selecione um mês</option>
                                        <option value='01'>Janeiro</option>
                                        <option value='02'>Fevereiro</option>
                                        <option value='03'>Março</option>
                                        <option value='04'>Abril</option>
                                        <option value='05'>Maio</option>
                                        <option value='06'>Junho</option>
                                        <option value='07'>Julho</option>
                                        <option value='08'>Agosto</option>
                                        <option value='09'>Setembro</option>
                                        <option value='10'>Outubro</option>
                                        <option value='11'>Novembro</option>
                                        <option value='12'>Dezembro</option>
                                    </select>
                                </div>
                                <div className='field'>
                                    <label htmlFor='day'>Dia</label>
                                    <input
                                        type='number'
                                        name='day'
                                        id='day'
                                        defaultValue={formData.day}
                                        min="1"
                                        max="31"
                                        required
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>

                            <div className="field-group">
                                <div className='field'>
                                    <label htmlFor='value'>Valor</label>
                                    <input
                                        type='number'
                                        name='value'
                                        id='value'
                                        defaultValue={formData.value}
                                        step='.01'
                                        required
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className='field'>
                                    <label htmlFor='externalTax'>Imposto externo</label>
                                    <select
                                        name='month'
                                        id='month'
                                        value={selectedMonth}
                                        onChange={handleSelectMonth}
                                    >
                                        <option value="">5%</option>
                                    </select>
                                </div>
                            </div>

                            <div className='field'>
                                <label htmlFor="comment">Comentário</label>
                                <textarea
                                    name='comment'
                                    id='comment'
                                    value={textAreaData}
                                    onChange={handleTextAreaChange}
                                />
                            </div>
                        </fieldset>

                        <button type='submit'>
                            Atualizar pagamento
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default ChangePayments