import 'express-async-errors'
import express from "express"
import { AppDataSource } from "./data-source"
import cors from 'cors'
import routes from "./routes"
import { errorMiddleware } from "./middlewares/error"

AppDataSource.initialize().then(() => {
    const app = express()

    app.use(cors({ origin: '*' }))
    app.use(express.json())

    app.use(routes)
    app.use(errorMiddleware)
    
    return app.listen(process.env.PORT, () => {
        console.log(`Server running port: ${process.env.PORT}`)
    })

})
