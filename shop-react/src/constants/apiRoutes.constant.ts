export const API_ROUTES = {
  auth: {
    me: "/auth/me",
    login: "/auth/login",
    register: "/auth/register",
    forgotPassword: "/auth/forgot-password",
    resetPassword: "/auth/reset-password",
  },
  catalog: {
    catalog: "/catalog",
  },
  cart: {
    cart: "/cart",
    items: "/cart/items",
    address: "/cart/address",
  },
  order: {
    orders: "/orders",
    order: "/orders/:orderId",
  },
};
