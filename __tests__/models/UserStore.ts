import 'react-native'
import React from 'react'
import Realm from 'realm'
import Utilities from '../../utilities/Utilities'
import UserStore from '../../models/UserStore'
import User, { UserSchema, UserInterface } from '../../models/User'

const repository: Realm = new Realm({
  schema: [
    UserSchema
  ]
})

describe('UserStore', () => {

  /**
   * We need to wipe the Realm store before
   * beginning the tests.
   */
  beforeAll(() => {
    repository.write(() => {
      repository.deleteAll()
    })
  })

  /**
   * Should init a new UserStore.
   */
  it('should create new Realm store', () => {
    const store: UserStore = new UserStore(repository)
    expect(store).not.toBe(null)
  })

  /**
   * Should get an empty array since there are no
   * Users yet.
   */
  it('should find no users since store is empty', () => {
    const store: UserStore = new UserStore(repository)
    const empty: User[] = store.findAll()
    expect(empty).not.toBe(null)
    expect(empty.length).toEqual(0)
  })

  /**
   * Should create a new User and then find that new
   * user to make sure the data was saved correctly.
   */
  it('should create a new user with dummy data', () => {
    const store: UserStore = new UserStore(repository)
    const username: string = 'testUser'
    const dummyUser: UserInterface = { username: username }
    store.create(dummyUser)
    
    const users = store.findAll()
    expect(users).not.toBe(null)
    expect(users.length).toEqual(1)

    const user: User = users[0]
    expect(user.username).toEqual(username)
  })

  /**
   * Should throw an error since we're trying to create
   * another User with the same username we used above.
   */
  it('should throw a collision error based on username', () => {
    const store: UserStore = new UserStore(repository)
    const username: string = 'testUser'
    const repeatUser: UserInterface = { username: username }
    try {
      store.create(repeatUser)
    } catch (error) {
      expect(error).not.toBe(null)
    }
  })

  /**
   * Should find the User that we created above.
   * Then we'll change it's username - and verify
   * the change went through.
   */
  it('should update the existing user', () => {
    const store: UserStore = new UserStore(repository)
    const newUsername: string = 'newTestUser'
    const updateInterface: UserInterface = { username: newUsername }
    const users: User[] = store.findAll()
    const currentUser: User = users[0]

    const updatedUser: User = store.update(currentUser, updateInterface)
    expect(updatedUser).not.toBe(null)
    expect(updatedUser.username).toEqual(newUsername)
  })

  /**
   * Should fetch the first User then use that
   * User's UUID to fetch it again.
   */
  it('should find a user by a User\'s UUID', () => {
    const store: UserStore = new UserStore(repository)
    const users: User[] = store.findAll()
    const user: User = users[0]

    const sameUser = store.findUserById(user.id)
    expect(sameUser).not.toBe(null)
    expect(sameUser.username).toEqual(user.username)
  })

  /**
   * Should throw an error since there will be no
   * User with the ID we're creating.
   */
  it('should throw a No Id Found error', () => {
    const store: UserStore = new UserStore(repository)
    const nonExistingUUID: string = Utilities.getUUID()
    try {
      store.findUserById(nonExistingUUID)
    } catch (error) {
      expect(error).not.toBe(null)
    }
  })

})
