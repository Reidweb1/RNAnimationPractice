import 'react-native'
import React from 'react'
import Nock from 'nock'

import User, { UserInterface } from '../../models/User'
import UserService, { baseURL } from '../../services/UserService'

import {
  getUsers,
  postUser,
  updateUser,
  createUserResponse,
  createUserInterface
} from '../../utilities/MockResponses'
import { notDeepEqual } from 'assert';
import Utilities from '../../utilities/Utilities';

/**
 * We need to create this User before the mocks
 * are created so we can reference it once we
 * hit the POST test.
 */
const postNewUser: User = createUserResponse()

/**
 * Similar to the User above, we're creating these here
 * to use it in the Mock defined below.
 */
const updateUserModel: User = createUserResponse()
const updateUserInterface: UserInterface = createUserInterface()

/**
 * Here we'll mock the responses we're expecting
 * to see from the back end so we can run tests for
 * the UserService.
 */
const scope = Nock(baseURL)
  .get('/users').reply(200, getUsers())
  .post('/user').reply(200, postUser(postNewUser))
  .put(`/users/${updateUserModel.id}`).reply(200, updateUser(updateUserModel, updateUserInterface))
  .delete(`/users/${postNewUser.id}`).reply(200, {})

describe('UserService', () => {

  /**
   * Will hit the mocked `http://localhost:8080/users`
   * endpoint and ensure the data returned conforms to
   * the User model, simulating a `GET`.
   */
  it('should GET all the mock users', async () => {
    const users: User[] = await UserService.getUsers()
    expect(users).not.toBe(null)
    expect(users.length).toBeGreaterThan(0)

    const user: User = users[0]
    expect(user.id).not.toBe(null)
    expect(user.username).not.toBe(null)
    expect(user.createdAt).not.toBe(null)
    expect(user.updatedAt).not.toBe(null)
  })

  /**
   * Will hit the mocked `http://localhost:8080/user`
   * return the dummy User created at the top
   * of the file to simulate a `POST`.
   */
  it('should POST a new User', async () => {
    const user: User = await UserService.postUser(postNewUser)
    expect(user).not.toBe(null)
    expect(user.id).toEqual(postNewUser.id)
    expect(user.username).toEqual(postNewUser.username)
  })

  /**
   * Will hit the mocked `http://localhost:8080/users/{mockedId}`
   * it will return updated information to simulate
   * the `PUT`.
   */
  it('should PUT user data to update a User', async () => {
    const updatedUser: User = await UserService.updateUser(updateUserModel.id, updateUserInterface)
    expect(updatedUser.id).toEqual(updateUserModel.id)
    expect(updatedUser.username).not.toEqual(updateUserModel.username)
  })

  /**
   * Will hit the mocked `http://localhost:8080/users/{mockedId}`
   * to simulate a `DELETE` there is no response to this.
   * A non-error result means it was a success.
   */
  it('should DELETE an existing user', async () => {
    try {
      await UserService.deleteUser(postNewUser.id)
    } catch (error) {
      expect(error).toBe(null)
    }
  })

})