import dotenv from 'dotenv'

// set config file
export const loadConfig = () => {
    if ('DEV' == process.argv[2]) {
        dotenv.config({ path: '.env.dev' })
    } else {
        dotenv.config()
    }

    console.log(`ENVIRONMENT : ${process.argv[2]}`)
    console.log(`DATABASE    : ${process.env.MONGODB_DB}`)
}

