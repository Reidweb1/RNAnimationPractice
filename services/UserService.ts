import Axios, { AxiosResponse, AxiosError } from 'axios'
import User, { UserInterface } from '../models/User'

export const baseURL: string = 'http://localhost:8080'

export default class UserService {

  /**
   * Will `GET` all the Users from the back end. Will
   * return the data object from the response.
   */
  static async getUsers(): Promise<User[]> {
    const url: string = `${baseURL}/users`
    return Axios.get(url)
      .then((response: AxiosResponse) => {
        return response.data
      })
  }

  /**
   * Will `POST` a new User to the back end.
   * @param {User} user
   */
  static async postUser(user: User): Promise<User> {
    return Axios.post(baseURL + '/user', {
      id: user.id,
      username: user.username,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    })
    .then((response: AxiosResponse) => {
      return response.data
    })
  }

  /**
   * Will `PUT` the new User data in the back end
   * to update an existing User.
   * @param {string} userId
   * @param {UserInterface} user
   */
  static async updateUser(userId: string, user: UserInterface): Promise<User> {
    const url: string = `${baseURL}/users/${userId}` 
    return Axios.put(url, {
      userData: user
    })
    .then((response: AxiosResponse) => {
      return response.data
    })
  }

  /**
   * Will `DELETE` the User data for the given Id.
   * @param {string} userId
   */
  static async deleteUser(userId: string): Promise<void> {
    const url = `${baseURL}/users/${userId}`
    return Axios.delete(url)
      .then(() => {
        return
      })
  }

}
