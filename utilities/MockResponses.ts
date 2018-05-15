import * as faker from 'faker'
import Utilities from '../utilities/Utilities'

import User, { UserInterface } from '../models/User'

/**
 * Will mock the Response from the User `GET`
 * request. This will create and return 5 dummy
 * Users under the `data` key.
 */
export const getUsers = () => {
  const users: User[] = createUsers(5)
  return users
}

/**
 * Will mock the response from a `POST`,
 * effectively just returning the user provided
 * @param {User} user
 */
export const postUser = (user: User) => {
  return user
}

/**
 * Will mock the response from a `PUT`.
 * @param {User} userId
 * @param {UserInterface} updateData 
 */
export const updateUser = (user: User, updateData: UserInterface) => {
  return {
    id: user.id,
    username: updateData.username,
    createdAt: faker.date.recent(7),
    updatedAt: new Date()
  }
}

/**
 * Will create a fake User model to use
 * in the network mocks.
 */
export const createUserResponse = (): User => {
  return {
    id: Utilities.getUUID(),
    username: faker.internet.userName(),
    createdAt: faker.date.recent(7),
    updatedAt: faker.date.recent(4)
  }
} 

/**
 * Will create a fake UserInterface to use
 * in the network mocks.
 */
export const createUserInterface = (): UserInterface => {
  return {
    username: faker.internet.userName()
  }
}

/**
 * Will create the number of dummy Users
 * passed in to the function.
 * @param {number} numberOfUsers
 */
const createUsers = (numberOfUsers: number): User[] => {
  const users: User[] = []
  for (let index = 0; index < numberOfUsers; index++) {
    users.push(createUserResponse())
  }
  return users
}
