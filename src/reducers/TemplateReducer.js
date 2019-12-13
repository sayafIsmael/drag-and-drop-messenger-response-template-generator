import {
  STORE_ITEM,
  CREATE_GALLERY_ITEM,
  STORE_GALLERY_ITEM,
} from '../actions/types';

const initialState = {
  items: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case STORE_ITEM:
      return {
        ...state,
        items: state.items == undefined ? [action.payload] : [...state.items, action.payload],
      };
    case STORE_GALLERY_ITEM:
      let data = [...state.items];
      data.find(d => d.id == action.payload.id).items = action.payload.items;
      return {
        ...state,
        items: data,
      }
    case CREATE_GALLERY_ITEM:
      let itemsData = [...state.items];
      itemsData[action.index] = action.payload;
      return {
        ...state,
        items: itemsData,
      }
    default:
      return state;
  }
}