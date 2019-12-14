import {
  STORE_ITEM,
  CREATE_GALLERY_ITEM,
  STORE_GALLERY_ITEM,
  STORE_TEXT,
  CHANGE_GALLERY_INDEX,
  CHANGE_ITEM_INDEX,
  EDIT_ITEMS
} from '../actions/types';

const initialState = {
  items: [],
};

export default function (state = initialState, action) {
  let allData = [...state.items];

  switch (action.type) {
    case STORE_ITEM:
      return {
        ...state,
        items: state.items == undefined ? [action.payload] : [...state.items, action.payload],
      };

    case STORE_TEXT:
      allData[action.index] = action.payload;
      return {
        ...state,
        items: allData,
      }
    case STORE_GALLERY_ITEM:
      allData.find(d => d.id == action.payload.id).items = action.payload.items;
      return {
        ...state,
        items: allData,
      }
    case CREATE_GALLERY_ITEM:
      allData[action.index] = action.payload;
      return {
        ...state,
        items: allData,
      }
    case CHANGE_GALLERY_INDEX:
      allData[action.index] = action.payload;
      return {
        ...state,
        items: allData,
      }

    case CHANGE_ITEM_INDEX:
      console.log("changing index ", action.payload)
      return {
        ...state,
        items: action.payload,
      };
    case EDIT_ITEMS:
      console.log("Storing items ", action.payload)
      return {
        ...state,
        items: action.payload,
      };
    default:
      return state;
  }
}