const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const { z } = require('zod')

const server = express()

server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true }))

const formBodySchema = z.object({
  email: z.string().email(),
  phone: z.string().regex(/^\d{3} \d{3} \d{3}$/),
  age: z.preprocess(value => parseInt(value), z.number().min(18, 'Must be at least 18 years')),
  shouldCall: z.preprocess(value => value === 'on', z.boolean())
})

function registerContact(contact) {
  return new Promise((resolve, reject) => {
    const shouldFail = Math.floor(Math.random() * 10)

    if (shouldFail > 8) {
      throw new Error('Mocked fail for registering contact')
    }

    setTimeout(() => {
      console.log('Contact registered', contact)
      resolve(contact)
    }, Math.floor(Math.random() * 200))
  })
}

// Middleware który loguje requesty do konsoli
server.use((req, res, next) => {
  console.log('Request at', new Date(), req.path)
  next()
})

server.post('/form', (req, res) => {
  const parseResult = formBodySchema.safeParse(req.body)

  if (!parseResult.success) {
    res.status(400).json({
      message: 'Invalid body',
      issues: parseResult.error.issues
    })
    return
  }

  registerContact(parseResult)
    .then(() => {
      const { phone, email, shouldCall } = parseResult.data

      res.status(200).json({
        message: 'You selected preferred contact by ' + (
          shouldCall
            ? 'phone ' + phone
            : 'email ' + email
        )
      })
    })
    .catch((err) => {
      console.error(err)
      res.status(500).json({
        message: 'Something went wrong',
      })
    })
})

server.use('/', express.static(path.resolve(__dirname, 'static')))

// Middleware który redirects na stronę głowną
server.use((req, res) => {
  res.redirect('/')
})

server.listen(8080, () => {
  console.log('server started')
})