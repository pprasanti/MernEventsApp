import dotenv from 'dotenv'

// set config file
export const loadConfig = async () => {
    console.log(`NODE_ENV : ${process.env.NODE_ENV}`)

    let path = '.env'

    switch (`${process.env.NODE_ENV}`) {
        case 'Staging':
            console.log('kkkk')
            path = '.env.staging'
            break;
        case 'Production':
            path = '.env.prod'
            break;
        default:
            path = '.env'
            break;
    }

    console.log(`Dev DATABASE    : ${process.env.MONGODB_DB}\n`)
    dotenv.config({ path: `${path}`, override: true })
    
    console.log(`\n\nApp is running on - `)
    console.log(`NODE_ENV    : ${process.env.NODE_ENV}`)
    console.log(`PORT        : ${process.env.PORT}`)
    console.log(`DATABASE    : ${process.env.MONGODB_DB}\n`)
}



