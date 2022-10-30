import { request, Method } from '../Axios'
import Endpoint from '../Endpoint'

export const getStories = page =>
  request(Endpoint().getStories, Method.GET, { page })

export const getPosts = () => request(Endpoint().getHomePosts, Method.GET)

export const getPostDetail = id =>
  request(Endpoint().getPostDetail(id), Method.GET)
