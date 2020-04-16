import register from './register'
import login from './login'
import main from './main'
import pages from './pages'
import jobs from './jobs'
import requests from './requests'
import errors from './errors'

export default {
  ...main,
  ...pages,
  ...register,
  ...login,
  ...jobs,
  ...requests,
  ...errors
}
