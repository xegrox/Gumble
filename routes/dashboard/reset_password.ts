import { Router } from "express";
import { Configuration } from "models/configuration";
import { randomBytes } from 'crypto'
import { promisify } from 'util'
import sendMail from 'sendmail'
import { encodePassword } from "config/passportConfig";

const router = Router()

router.get('/', async (req, res) => {
  let config = await Configuration.findOne()
  if (!config.recovery_email) {
    res.render('dashboard/reset_pass_verify', {
      layout: 'main',
      error: true
    })
  } else {
    let token = encodeURIComponent(await genToken())
    let url = `${req.protocol}://${req.get('host')}/dashboard/reset_password/form?token=${token}`
    sendMail({silent: true})({
      from: 'password_reset@gumble.system',
      to: config.recovery_email,
      subject: 'Password reset for Gumble admin',
      html: `
      <p>
      Someone requested a <b>password reset for the admin account</b> of your Gumble system.
      <br>
      Click the button below to reset the password (Expires in 5min)
      <br><br>
      <div style="border-radius: 2px;" bgcolor="#1F83FF">
        <a href="${url}" target="_blank" style="padding: 8px 12px; border: 1px solid #1F83FF;border-radius: 2px;font-family: Arial, Helvetica, sans-serif;font-size: 14px; color: #ffffff;text-decoration: none;font-weight:bold;display: inline-block;">
          Reset password             
        </a>
      </td>
      <br><br>
      Or alternatively, paste this link into your browser
      <br><br>
      <a href="${url}">${url}</a>
      <br><br>
      <small>If you believe this to be a mistake, please ignore this email.</small>
    </p>
      `
    }, (err) => {
      if (err) delToken()
      res.render('dashboard/reset_pass_verify', {
        layout: 'main',
        email: getDisplayEmail(config.recovery_email),
        error: !!err
      })
    })
  }
})

router.get('/form', (req, res) => {
  res.render('dashboard/reset_pass_form', {
    layout: 'main',
    valid: recoveryToken == req.query.token,
    token: req.query.token
  })
})

router.post('/form', async (req, res) => {
  if (recoveryToken == req.body.token) {
    let config = await Configuration.findOne()
    config.admin_pass = encodePassword(req.body.password)
    config.save()
    delToken()
    req.logout(() => {})
    res.render('dashboard/reset_pass_form_success', {layout: 'main'})
  } else {
    res.redirect('./form')
  }
})

let recoveryToken: string = null
function delToken() {console.log('Recovery token revoked: ' + recoveryToken); recoveryToken = null}
async function genToken() {
  const ran = promisify(randomBytes)
  const value = await ran(48);
  let token = value.toString('base64');
  recoveryToken = token
  console.log('Recovery token assigned: ' + token)
  setTimeout(() => {
    console.log('Recovery token timeout: ' + token);
    delToken()
  }, 300000);
  return token
}

function getDisplayEmail(email: string) {
  let split = email.split('@')
  let name = split[0]
  let domain = split[1]
  return name.substring(0, 3).padEnd(10, '*') + '@' + domain
}

export default router