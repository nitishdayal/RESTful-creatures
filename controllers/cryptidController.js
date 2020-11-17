const fs = require('fs')
const router = require('express').Router()

router
  .get('/', (req, res) => {
    const rawCrytids = fs.readFileSync('./cryptids.json')
    const nameFilter = req.query.nameFilter

    let cryptids = JSON.parse(rawCrytids)

    if (nameFilter)
      cryptids = cryptids.filter((dino) => dino.name.toLowerCase() === nameFilter.toLowerCase())

    res.status(200).render('cryptids/index', { cryptids })
  })
  .post('/', function (req, res) {
    const rawCrytids = fs.readFileSync('./cryptids.json')
    const cryptids = JSON.parse(rawCrytids)

    cryptids.push(req.body)

    fs.writeFileSync('./cryptids.json', JSON.stringify(cryptids))

    res.redirect('/cryptids')
  })
  .get('/new', (req, res) => {
    res.render('cryptids/new')
  })
  .get('/:idx', (req, res) => {
    const rawCrytids = fs.readFileSync('./cryptids.json')
    const cryptids = JSON.parse(rawCrytids)

    const cryptidIndex = parseInt(req.params.idx)

    res.render('cryptids/show', { myCryptid: cryptids[cryptidIndex] })
  })

module.exports = router
