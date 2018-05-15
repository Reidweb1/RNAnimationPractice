import User, { UserInterface } from './User'

const userStoreKey: string = 'User'

export default class UserStore {

  // TODO: switch to Realm Type
  public repository: any

  constructor(repository: any) {
    this.repository = repository
  }

  /**
   * Will find all the User models saved in
   * the repository passed stored on this
   * instance
   */
  public findAll = (): User[] => {
    return this.repository.objects(userStoreKey)
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
  public update = async (user: User, newData: UserInterface): Promise<User> => {
    if (!this.userIdExists(user.id)) {
      throw new Error('No User with this UUID exists.')
    }
    return this.repository.write(() => {
      user.username = newData.username
    })
  }

  /**
   * Will check to see if a User already exists in the
   * repository with the given username.
   */
  private usernameExists = (username: string): boolean => {
    const usernameFilter: string = 'username = \'' + username + '\''
    const users: User[] =  this.repository.objects(userStoreKey).filtered(usernameFilter)
    return users.length > 0 ? true : false
  }

  /**
   * Will check to see if a User already exists in the
   * repository with the given Id.
   */
  private userIdExists = (userId: string): boolean => {
    const userIdFilter: string = 'id = \'' + userId + '\''
    const users: User[] = this.repository.objects(userStoreKey).filtered(userIdFilter)
    return users.length > 0 ? true : false
  }

}
