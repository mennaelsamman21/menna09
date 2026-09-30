const express = require ('express')
const app = express()
const port = process.env.PORT || 3000

require('./src/db/mongoose')

app.use(express.json())
const userRouter = require("./src/routers/user")
app.use(userRouter)


app.listen( port , () => {console.log("Server is up and running on port Successfully")})