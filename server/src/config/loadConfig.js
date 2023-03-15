import dotenv from 'dotenv'

// set config file
export const loadConfig = () => {
    console.log(`NODE_ENV : ${process.env.NODE_ENV}`)

    let path = '.env'

    switch (`${process.env.NODE_ENV}`) {
        case 'Staging':
            path = '.env.staging'
            break;
        case 'Production':
            path = '.env.prod'
            break;
        default:
            path = '.env'
            break;
    }

    dotenv.config({ path: `${path}` })

    console.log(`\nApp is running on - `)
    console.log(`NODE_ENV    : ${process.env.NODE_ENV}`)
    console.log(`PORT        : ${process.env.PORT}`)
    console.log(`DATABASE    : ${process.env.MONGODB_DB}\n`)
}



