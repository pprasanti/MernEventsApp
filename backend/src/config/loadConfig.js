import dotenv from 'dotenv'

// set config file
export const loadConfig = () => {
    let path = '.env'
    console.log(`process.argv : ${process.argv[2]}`)

    if ('Staging' == process.argv[2]) {
        path = '.env.staging'
    } else if ('Production' == process.argv[2]) {
        path = '.env.prod'
    }

    console.log(`process.argv : ${process.argv[2]}`)
    dotenv.config({ path: `${path}` })

    console.log(`\nApp is running on - `)
    console.log(`ENVIRONMENT : ${process.env.ENVIRONMENT}`)
    console.log(`PORT        : ${process.env.PORT}`)
    console.log(`DATABASE    : ${process.env.MONGODB_DB}\n`)
}



