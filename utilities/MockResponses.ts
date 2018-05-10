import * as faker from 'faker'
import Utilities from '../utilities/Utilities'

import User from '../models/User'

/**
 * Will mock the Response from the User `GET`
 * request. This will create and return 5 dummy
 * Users under the `data` key.
 */
export const getUsers = () => {
  const users: User[] = createUsers(5)
  return {
    data: users
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

/**
 * Will create a fake User model to use
 * in the network mocks.
 */
const createUserResponse = (): User => {
  return {
    id: Utilities.getUUID(),
    username: faker.internet.userName(),
    createdAt: faker.date.recent(7),
    updatedAt: faker.date.recent(4)
  }
} 