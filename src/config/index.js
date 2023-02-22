import dotenv from 'dotenv'

// set config file
export const loadConfig = () => {
    if ('dev' == process.env.NODE_ENV) {
        dotenv.config({ path: '.env.dev' })
    } else {
        dotenv.config()
    }

    console.log(`ENVIRONMENT : ${process.argv[2]}`)
    console.log(`DATABASE    : ${process.env.MONGODB_DB}`)
}

