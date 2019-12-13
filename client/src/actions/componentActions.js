import { CLEAR_ERRORS } from "./types";
export const setCurrentComponent = component => {
  return {
    type: "SET_CURRENT_COMPONENT",
    payload: component
  };
};
