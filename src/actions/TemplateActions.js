import { STORE_ITEM, STORE_GALLERY_ITEM, CREATE_GALLERY_ITEM} from './types';

export const storeText = (text) => dispatch => {
      dispatch({
        type: STORE_ITEM,
        payload: text,
      })
};

export const storeGalleryItem = (item) => dispatch => {
  dispatch({
    type: STORE_GALLERY_ITEM,
    payload: item,
  })
};

export const createGalleryItem = (item, index) => dispatch =>{
  dispatch({
    type: CREATE_GALLERY_ITEM,
    payload: item,
    index: index
  })
};