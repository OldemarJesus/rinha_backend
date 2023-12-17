import { app } from "./app/app";
import { AppDataSource } from "./app/data-sources";

/**
 * Setting
 */
const port = process.env.PORT ?? 3000

/**
 * Init db and App
 */
AppDataSource.initialize()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server listening on http://localhost:${port}`)
        })
    })
    .catch((error) => console.log(error))

