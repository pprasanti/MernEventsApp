import dotenv from 'dotenv'

// set config file
export const loadConfig = () => {
    let environment = '', path = '.env'
    console.log(`process.argv : ${process.argv}`)

    if ('Development' == process.argv[2] && 'Kubernetes' == process.argv[3]) {
        environment = process.argv[3] ? process.argv[3] : ''
        path = '.env.kub'
    } else if ('Development' == process.argv[2]) {
        environment = process.argv[2] ? process.argv[2] : ''
        path = '.env.dev'
    } else {
        environment = 'Production'
    }

    dotenv.config({ path: `${path}` })

    console.log(`\nApp is running on - `)
    console.log(`NODE_ENV : ${environment}`)
    console.log(`PORT        : ${process.env.PORT}`)
    console.log(`DATABASE    : ${process.env.MONGODB_DB}\n`)
}

