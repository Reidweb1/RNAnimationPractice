import User, { UserInterface } from '../models/User'
import Realm from 'realm'

/**
 * Used as a key for all of the User models
 * stored in Realm.
 */
const userStoreKey: string = 'User'

export default class UserStore {

  public repository: Realm

  constructor(repository: Realm) {
    this.repository = repository
  }

  /**
   * Will find all the User models saved in
   * the repository passed stored on this
   * instance
   */
  public findAll = (): User[] => {
    const users = this.repository.objects(userStoreKey)
    return Array.from(users) as User[]
  }

  /**
   * Find a single user by the User's UUID.
   */
  public findUserById = (userId: string): User => {
    const users = this.repository.objects(userStoreKey)
    if (users.length === 0) {
      return null
    }
    return users[0] as User
  }

  /**
   * Will create a new User model and save it
   * in the repository passed stored on this
   * instance
   */
  public create = (user: UserInterface): void => {
    if (this.usernameExists(user.username)) {
      throw new Error('A User with that username already exists.')
    }
    this.repository.write(() => {
      this.repository.create(userStoreKey, new User(user.username))
    })
    return
  }

  /**
   * Will update an existing User model and save it
   * in the repository passed stored on this
   * instance. This function is async and will return
   * when the User is updated.
   */
  public update = (user: User, newData: UserInterface): User => {
    if (!this.userIdExists(user.id)) {
      throw new Error('No User with this UUID exists.')
    }
    this.repository.write(() => {
      user.username = newData.username
    })
    return user
  }

  /**
   * Will check to see if a User already exists in the
   * repository with the given username.
   */
  private usernameExists = (username: string): boolean => {
    const usernameFilter: string = 'username = \'' + username + '\''
    const users: Realm.Results<{}> =  this.repository.objects(userStoreKey).filtered(usernameFilter)
    return users.length > 0 ? true : false
  }

  /**
   * Will check to see if a User already exists in the
   * repository with the given Id.
   */
  private userIdExists = (userId: string): boolean => {
    const userIdFilter: string = 'id = \'' + userId + '\''
    const users: Realm.Results<{}> = this.repository.objects(userStoreKey).filtered(userIdFilter)
    return users.length > 0 ? true : false
  }

}
