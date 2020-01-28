const setApiKey = (key) => {
    console.log('MOCK --- setting SendGrid API key ' + key)
}

const send = (mail) => {
    console.log('MOCK --- sending email to ' + mail.to)
}

module.exports = {
    setApiKey,
    send
}