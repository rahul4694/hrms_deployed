import { ADD_KRA, VIEW_KRA } from "../actions/types";

const initialstate = {
  fillKra: [],
  viewKraData: []
};

export default function(state = initialstate, action) {
  switch (action.type) {
    case ADD_KRA: {
      if (action.payload.length > 1) {
        return { ...state, fillKra: [...action.payload] };
      } else {
        state.fillKra.map(ele => {
          if (ele._id === action.payload.id) {
            ele.value = action.payload.value;
          }
        });
      }
      return state;
    }

    case VIEW_KRA: {
      if(action.payload===null){
        return initialstate
      }
      return { ...state, viewKraData: action.payload };
    }
    default:
      return state;
  }
}
