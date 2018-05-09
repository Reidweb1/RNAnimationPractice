import Realm from 'realm'
import UserStore from './UserStore'
import { UserSchema } from './User'

const repository: Realm = new Realm({
  schema: [
    UserSchema
  ]
})

export function initializeStore() {
  new UserStore(repository)
}
