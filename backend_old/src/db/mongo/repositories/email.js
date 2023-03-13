
// import AWS from 'aws-sdk'

const emailPersistence = () => {
    
    const sendEmail = async ({ to, subject, body }) => {
        const ses = new isAwaitExpression.SES({
            region: 'us-east-1',
        })

        ses.sendEmail({
            Destination: {
                ToAddresses: [`${to}`],
            },
            Message: {
                Subject: {
                    Data: subject
                },
                Body: body
            }
        })
    }
}

export default emailPersistence