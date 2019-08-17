import { createSelector } from 'reselect';

// input selector(IS)
const selectCart = state => state.cart;

// output selector : Use IS + createSelector()
export const selectCartItems = createSelector(
  [selectCart],
  cart => cart.cartItems
);

export const selectCartHidden = createSelector(
  [selectCart],
  cart => cart.hidden
);

export const selectCartItemsCount = createSelector(
  [selectCartItems],
  cartItems =>
    cartItems.reduce(
      (accumulatedQuantity, item) => accumulatedQuantity + item.quantity,
      0
    )
);

export const selectCartTotal = createSelector(
  [selectCartItems],
  cartItems =>
    cartItems.reduce(
      (accumulatedTotal, item) => accumulatedTotal + item.quantity * item.price,
      0
    )
);
