import express from 'express'
import {Request, Response} from 'express'
const app = express()
const port = 9000
app.use(express.static('dist'))

app.use(express.static('assets'))

//app.get('/', (req: Request, res: Response) => res.sendFile('index.html', {root:'.'}))

app.get('*', (req: Request, res: Response) => res.sendFile('dist/index.html', {root:'.'}))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))