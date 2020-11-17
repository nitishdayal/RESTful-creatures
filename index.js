const express = require('express')
const app = express()
const expressEjsLayouts = require('express-ejs-layouts')

const { dinosaurController, cryptidController } = require('./controllers')


const PORT = process.env.PORT || 5500

app.set('view engine', 'ejs')
app.use(expressEjsLayouts)
app.use(express.urlencoded({ extended: false }))

app.use('/dinosaurs', dinosaurController)
app.use('/cryptids', cryptidController)
app.get('/', (_, res) => {
  res.status(200).render('')
})

app.listen(PORT, () => { console.log(`Server running on http://localhost:${PORT}`) })
