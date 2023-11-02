const http = require('http') // require - подключает готовый пакет http
// тепеть http является объектом у которого есть свои методы 
const fs = require('fs') // файловая система чтобы отобразить какой-либо файл
// в fs есть такие методы как readFileSing (прочитать файл синхронно) но считывать файлы синхронно - это плохо
// readFile - опирация асинхронная принимает колбэк и путь к файлу 


// createServer - создает наш сервер
// request - приходящие данные
// require - наш ответ 
// require.write - записываем ответ
// require.end() - завершаем ответ (обязательно)
// через конструкцию switch/case мы проверяем урл и возвращаем нужный ответ 
let sd = 1
const server = http.createServer((request, require) => {
    sd++
    switch (request.url) { // request.url - у реквеста есть свойство url, к примеру http://localhost:3003/vs вернет /vs
        case '/vs':
            require.write('привет')
            require.end()
            break;
        case '/home':
            fs.readFile('./pages/index.html', (err, data) => {
                if(err) {require.write('500, error')} // обработка ошибок 
                else {require.write(data)} // вернуть данные с файла
                require.end()
            })
            break;
        default:
            require.write(sd.toString())
            require.end()
    }
})

// listen - сервер будет слушать 3003 порт 
server.listen(3003) 