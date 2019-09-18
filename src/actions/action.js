import { ADD_USER, GET_FEEDS } from './types';

export const addUserInfo = userInfo => {
  return {
    type: ADD_USER,
    payload: userInfo
  }
}

export const getFeeds = feeds => {
    return {
        type: GET_FEEDS,
        payload: feeds
    }
}