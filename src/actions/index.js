import lodash from 'lodash';
import jsonPlaceHolder from '../apis/jsonPlaceholder';

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
  await dispatch(fetchPosts());
  //const userIds = lodash.uniq(lodash.map(getState().posts, 'userId'));
  //console.log(userIds);
  //userIds.forEach((id) => dispatch(fetchUser(id)));

  lodash
    .chain(getState().posts) //chain special method that it passes the return value of previous method as a first argument
    .map('userId')
    .uniq()
    .forEach((id) => dispatch(fetchUser(id)))
    .value(); //in order to execute chaing methods
};

export const fetchPosts = () => async (dispatch) => {
  const response = await jsonPlaceHolder.get('/posts');

  dispatch({ type: 'FETCH_POSTS', payload: response.data });
};

export const fetchUser = (id) => async (dispatch) => {
  const response = await jsonPlaceHolder.get(`/users/${id}`);

  dispatch({ type: 'FETCH_USER', payload: response.data });
};

//memoized version
// export const fetchUser = (id) => (dispatch) => {
//   _fetchUser(id, dispatch);
// };

// const _fetchUser = lodash.memoize(async (id, dispatch) => {
//   const response = await jsonPlaceHolder.get(`/users/${id}`);

//   dispatch({ type: 'FETCH_USER', payload: response.data });
// });
