import 'module-alias/register'
import { MongoDB } from './config/DbConnection'
import { application } from './config/ExpressApp'

// eslint-disable-next-line no-new
new MongoDB()

application.listen(application.get('port'), () => {
  console.log('App is running at http://localhost:%d', application.get('port'))
})
