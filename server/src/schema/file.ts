const schema = {
    'Título': {
        prop: 'title',
        type: String,
        required: true
    },
    'Data do Lançamento': {
        prop: 'date',
        type: Date,
        required: true
    },
    'Valor': {
        prop: 'value',
        type: Number,
        required: true
    },
    'Observações': {
        prop: 'comment',
        type: String
    }
}

export default schema