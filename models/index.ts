import Realm from 'realm'
import UserStore from './UserStore'
import { UserSchema } from './User'

const repository: Realm = new Realm({
  schema: [
    UserSchema
  ]
})

/**
 * Will initialize an instance of all of our
 * model stores with the repository created
 * above.
 */
export function initializeStore() {
  new UserStore(repository)
}
