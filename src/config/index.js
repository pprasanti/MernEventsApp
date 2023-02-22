import dotenv from 'dotenv'

// set config file
export const loadConfig = () => {
    const environment = process.argv[2] ? process.argv[2] : ''
    const server = process.argv[3] ? process.argv[3] : ''
    
    if ('Development' == process.argv[2]) {
        console.log(`Running on ${environment} ${server}`)
        dotenv.config({ path: '.env.dev' })
    } else {
        dotenv.config()
    }

    console.log(`ENVIRONMENT : ${environment}`)
    console.log(`DATABASE    : ${process.env.MONGODB_DB}`)
}

