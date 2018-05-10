import 'react-native'
import React from 'react'
import Nock from 'nock'

import User from '../../models/User'
import UserService, { baseURL } from '../../services/UserService'

import {
  getUsers,
  postUser
} from '../../utilities/MockResponses'

/**
 * Here we'll mock the responses we're expecting
 * to see from the back end so we can run tests for
 * the UserService.
 */
const scope = Nock(baseURL)
  .get('/users').reply(200, getUsers())
  .post('/user').reply(200, postUser())

describe('UserService', () => {

  /**
   * Will hit the mocked `http://localhost:8080/users`
   * endpoint and ensure the data returned conforms to
   * the User model.
   */
  it('should GET all the users', async () => {
    const users: User[] = await UserService.getUsers()
    expect(users).not.toBe(null)
    expect(users.length).toBeGreaterThan(0)

    const user: User = users[0]
    expect(user.id).not.toBe(null)
    expect(user.username).not.toBe(null)
    expect(user.createdAt).not.toBe(null)
    expect(user.updatedAt).not.toBe(null)
  })

  it('should POST a new User', async () => {

  })

})