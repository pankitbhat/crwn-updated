import { createSelector } from "reselect";

const selectUser = state => state.user;

//!!     Input -> Array of Selectors and a transform function.
//TODO   If redux state is mutated in a way that causes the value of input selector to change
//TODO  the selector calls the transform function with the values of input selecctor as arguements
//TODO  and returns result.
//TODO  If input values are same as previous call to selector , it will return the
//TODO  previously computed value instead of calling the transform function

export const selectCurrentUser = createSelector(
  [selectUser],
  user => user.currentUser
);
