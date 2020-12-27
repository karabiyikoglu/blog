import jsonPlaceHolder from '../apis/jsonPlaceholder';

export const fetchPosts = () => {
  return async (dispatch) => {
    const response = await jsonPlaceHolder.get('/posts');

    dispatch({ type: 'FETCH_POSTS', payload: response });
  };
};
