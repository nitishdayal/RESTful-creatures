const fs = require('fs')
const router = require('express').Router()

router
  .get('/', (req, res) => {
    const rawDinos = fs.readFileSync('./dinosaurs.json')
    const nameFilter = req.query.nameFilter

    let dinos = JSON.parse(rawDinos)

    if (nameFilter)
      dinos = dinos.filter((dino) => dino.name.toLowerCase() === nameFilter.toLowerCase())

    res.status(200).render('dinosaurs/index', { dinos })
  })
  .post('/', function (req, res) {
    const rawDinos = fs.readFileSync('./dinosaurs.json')
    const dinos = JSON.parse(rawDinos)

    dinos.push(req.body)

    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinos))

    res.redirect('/dinosaurs')
  })
  .get('/new', (req, res) => {
    res.render('dinosaurs/new')
  })
  .get('/:idx', (req, res) => {
    const rawDinos = fs.readFileSync('./dinosaurs.json')
    const dinos = JSON.parse(rawDinos)

    const dinoIndex = parseInt(req.params.idx)

    res.render('dinosaurs/show', { myDino: dinos[dinoIndex] })
  })

module.exports = router
