//WITH HUGE THANKS FROM AJALA ABDULSAMII https://medium.com/@jalasem/ussd-app-development-with-javascript-a59554e16a03
const app = require('express')()
const bodyParser = require('body-parser')
const logger = require('morgan')

const port = process.env.PORT || 3030

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get('*', (req, res) => {
  res.send('The LASPARK Payment Portal')
})

app.post('*', (req, res) => {
  let {sessionId, serviceCode, phoneNumber, text} = req.body
  if (text == '') {
    // This is the first request. Note how we start the response with CON
    let response = `CON What do you want to check
    1. Park Locator
    2. Payments
    3. Park History`
    res.send(response)
  } else if (text == '2') {
    // Business logic for first level response
    let response = `CON Choose what you want
    1. Fines
    2. Donations
    3. Dues`
    res.send(response)
  } else if (text == '1') {
    // Business logic for first level response
    let response = `CON Choose what you are paying for
    1. Land & Beautification of setbacks
    2. Felling trees
    3. Park Litter`
    res.send(response)
  } else if (text == '2') {
    // Business logic for first level response
    let amountDue = 'NGN 5000'
    // This is a terminal request. Note how we start the response with END
    let response = `CON Please choose your bank
    1. GTB
    2. FCMB
    3. First Bank`
    let response = `CON Your payment is ${amountDue}`
    res.send(response)
  } else if (text == '1') {
    // This is a second level response where the user selected 1 in the first instance
    let accountNumber = 'ACC10392'
    // This is a terminal request. Note how we start the response with END
    let response = `END You have paid sucessfully!`
    res.send(response)
  } else {
    res.status(400).send('Bad request!')
  }
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
