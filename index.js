const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.text())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())

let pessoas = [
    { id: 1, nome: 'carol', idade: 23 },
    { id: 2, nome: 'caroline', idade: 29 },
    { id: 3, nome: 'soares', idade: 17 }
]

app.get('/clients', function (req, res) {
    res.json(pessoas)

})
app.post('/clients', function (req, res) {
    pessoas.push(req.body)
    res.send(pessoas);
})

app.put('/clients', function (req, res) {
    let found = pessoas.find(pessoa => pessoa.id === req.body.id)
    found.idade = req.body.idade
    found.nome = req.body.nome

    res.send(found);
})

app.delete('/clients/:id', function (req, res) {
    const id = req.params.id

    pessoas = pessoas.filter(item => {
        if (item.id != id)
            return item
    })

    return res.send(pessoas)
})

app.listen(3001, () => {
    console.log('Server Running...')
})