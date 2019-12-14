import {
  STORE_ITEM,
  STORE_GALLERY_ITEM,
  CREATE_GALLERY_ITEM,
  STORE_TEXT,
  CHANGE_GALLERY_INDEX,
  CHANGE_ITEM_INDEX,
  EDIT_ITEMS
} from './types';

export const storeItem = (item) => dispatch => {
  dispatch({
    type: STORE_ITEM,
    payload: item,
  })
};

export const storeText = (item, index) => dispatch => {
  dispatch({
    type: STORE_TEXT,
    payload: item,
    index: index
  })
};

export const storeGalleryItem = (item) => dispatch => {
  dispatch({
    type: STORE_GALLERY_ITEM,
    payload: item,
  })
};

export const createGalleryItem = (item, index) => dispatch => {
  dispatch({
    type: CREATE_GALLERY_ITEM,
    payload: item,
    index: index
  })
};

export const changeGalleryIndex = (item, index) => dispatch => {
  dispatch({
    type: CHANGE_GALLERY_INDEX,
    payload: item,
    index: index
  })
};

export const changeItemIndex = (items) => dispatch => {
  dispatch({
    type: CHANGE_ITEM_INDEX,
    payload: items,
  })
};

export const editItems = (items) => dispatch => {
  dispatch({
    type: CHANGE_ITEM_INDEX,
    payload: items,
  })
};