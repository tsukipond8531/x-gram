import { makeAutoObservable } from 'mobx'
import { hydrateStore, isHydrated } from 'mobx-persist-store'
import { makePersistExcept } from './StoreUtils'
export default class UserStore {
  isLogged = false
  userInfo = {}
  passcode = '123456'
  passcodeEnabled = true
  bookmarkPosts = []
  constructor() {
    makeAutoObservable(this)
    makePersistExcept(this, 'UserStore', [])
  }
  setUserInfo(userInfo, isLogged = true) {
    this.userInfo = userInfo
    this.isLogged = isLogged
  }
  logout() {
    this.userInfo = {}
    this.isLogged = false
  }
  setPasscode(passcode) {
    this.passcode = passcode
    this.passcodeEnabled = true
  }
  disablePasscode() {
    this.passcodeEnabled = false
  }
  addBookmarkPost(post) {
    this.bookmarkPosts = [...this.bookmarkPosts, post]
  }
  removeBookmarkPost(postId) {
    this.bookmarkPosts = this.bookmarkPosts.filter(post => post.id !== postId)
  }
  // check for hydration (required)
  get isHydrated() {
    return isHydrated(this)
  }
  // hydrate the store (required)
  async hydrateStore() {
    await hydrateStore(this)
  }
}
