// работа с express 
import express from 'express' // подключение пакета express
const app = express()
const port = process.env.PORT || 3004 // выбор порта, для публикации на хостинг нужно указать process.env.PORT

const jasonBodyMidlwair = express.json()
app.use(jasonBodyMidlwair) // мидлвеер для преобразовании body в reqest

const bd = { // условная база данных
  name: [
    { id: 1, name: 'Вадим' },
    { id: 2, name: 'Вероника' },
    { id: 3, name: 'Даниил' },
  ]
}

app.get('/name', (req, res) => { // обработка query параметров (фильтрация)
  let nameBd = bd.name
  if (req.query.name) {
    nameBd = nameBd.filter(_ => _.name.indexOf(req.query.name as string) > -1)
  }
  res.json(nameBd)
})

app.get('/name/:id', (req, res) => { // фильтрация, принимает URI параметр и ищет в массиве элемент с нужным id 
  const name = bd.name.find(e => e.id === +req.params.id) // в req(приходящих данных) есть метод params 
  // для параметров и нужно преобразовать в число т.к приходит строка

  if (!name) {
    res.sendStatus(404)  // проверка, если find верет undefined то вернуть статус код 404
    return
  }
  res.json(name)
})


app.post('/name', (req, res) => { // обработка пост запроса 
  if(!req.body.name){
    res.sendStatus(400)
    return
  }
  let createdName = {
    id: +(new Date()),
    name: req.body.name  // берем body который отправили нам (для него подключали мидлвеер)
  }
  bd.name.push(createdName)
  res.status(201) // устанавливает статус, а не сразу его отправляет 
  res.json(createdName)
})

// пример пост запроса : 
// fetch('http://localhost:3004/name', {
//   method: 'POST',
//   body: JSON.stringify({ name: 'den' }), нужно преобразовать в строку
//   headers: { 'content-type': 'application/json' } указать для мидлвеера что отправляется json 
// })
//   .then(res => res.json())
//   .then(json => console.log(json))


app.delete('/name/:id', (req, res) => { // удаление данных
  bd.name = bd.name.filter(_ => _.id !== +req.params.id)
  res.sendStatus(204)
})

app.put('/name/:id', (req, res) => { // обновление данных
  const name = bd.name.find(e => e.id === +req.params.id) 
  if (!name) {
    res.sendStatus(404)  
    return
  }
  name.name = req.body.name
  res.sendStatus(204)
})

//будет слушать этот порt
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})