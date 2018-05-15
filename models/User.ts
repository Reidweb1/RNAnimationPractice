import Utilities from '../utilities/Utilities'
import Realm from 'realm'

/**
 * This interface allows us to add a type to the data needed
 * to create or update a User. It contains all of the publicly
 * accessible properties.
 */
export interface UserInterface {
  username: string
}

/**
 * This is a generic User model used to outline
 * how the local Realm store will be formatted.
 */
export default class User {

  /**
   * The User will have a UUID property, a username property
   * and createdAt property that is set when it's constructed.
   * It will also have an updatedAt property that will be re written
   * whenever the User model is edited
   */
  public id: string
  public username: string
  public createdAt: Date
  public updatedAt: Date

  constructor(username: string) {
    this.id = Utilities.getUUID()
    this.username = username
    this.createdAt = new Date()
    this.updatedAt = new Date()
  }

}

/**
 * This will define the model schema that we'll
 * use to initialize the Realm repository in
 * ./index.ts
 */
const UserSchema: Realm.ObjectSchema = {
  name: 'User',
  primaryKey: 'id',
  properties: {
    id: { type: 'string', indexed: true },
    username: 'string',
    createdAt: 'date',
    updatedAt: 'date'
  }
}

export {
  UserSchema
}