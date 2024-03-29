const authorModel = require("../model/authorModel")
const jwt = require('jsonwebtoken')


let emailRegex = /^[a-z]{1}[a-z0-9._]{1,100}[@]{1}[a-z]{2,15}[.]{1}[a-z]{2,10}$/
let nameRegex = /^[a-zA-Z]{1,20}$/
let passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/


const createAuthor = async function (req, res) {
  try {
    let data = req.body;
    if (Object.keys(data).length == 0) return res.status(400).send({ status: false, error: "Please enter details" });

    let { fname, lname, title, email, password } = data

    if (!email || email == "") return res.status(400).send({ status: false, error: "email is required" })
    email = data.email = email.trim()
    if (!emailRegex.test(email)) return res.status(400).send({ status: false, error: "provide valid email" })

    let duplicateEmail = await authorModel.findOne({ email: email })
    if (duplicateEmail) return res.status(400).send({ status: false, error: "email is already exist" })

    if (!fname || fname == "") return res.status(400).send({ status: false, error: "provide fname" })
    fname = data.fname = fname.trim()
    if (!nameRegex.test(fname)) return res.status(400).send({ Status: false, error: "provide valid fname" })

    if (!lname || lname == "") return res.status(400).send({ status: false, error: "provide lname" })
    lname = data.lname = lname.trim()
    if (!nameRegex.test(lname)) return res.status(400).send({ Status: false, error: "provide valid lname" })

    if (!title || title == "") return res.Status(400).send({ status: false, error: "provide title" })
    title = data.title = title.trim()
    if (!["Mr", "Mrs", "Miss"].includes(title)) return res.status(400).send({ status: false, error: "title should be from [Mr,Mrs,Miss]" })

    if (!password || password == "") return res.status(400).send({ status: false, error: "provide password" })
    password = data.password = password.trim()
    if (!passwordRegex.test(password)) return res.status(400).send({ Status: false, error: "provide valid password" })


    let savedData = await authorModel.create(data);
    res.status(201).send({ status: true, data: savedData });

  } catch (error) {
    res.status(500).send({ status: false, error: error.message });
  }
}

const loginAuthor = async function (req, res) {
  try {
    let data = req.body
    let { email, password } = data

    if (!email || email == "") return res.Status(400).send({ status: false, error: "provide  email " })
    email = data.email = email.trim()

    if (!password || password == "") return res.status(400).send({ status: false, error: "provide password" })
    password = data.password = password.trim()

    let savedData = await authorModel.findOne({ email: email, password: password })
    if (!savedData) return res.status(400).send({ status: false, error: "details not match" })

    let token = jwt.sign({ _id: savedData._id }, 'laptop')
    res.setHeader("x-api-key", token)
    res.status(200).send({ status: true, message: token })

  } catch (error) {
    res.status(500).send({ status: false, error: error.message })
  }
}


module.exports.loginAuthor = loginAuthor
module.exports.createAuthor = createAuthor
