import {
  removeFromCart,
  updateQuantity,
} from "@/store/features/cart/cartSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import formatNumber from "format-number";

function CartPage() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const handleChangeQuantity = (productId, quantity) => {
    if (quantity < 1) return;
    dispatch(updateQuantity({ productId, quantity }));
  };

  const handleRemoveCart = (productId) => {
    dispatch(removeFromCart(productId));
    toast.info("Items removed from cart successfully", { autoClose: 1000 });
  };

  const totalAmount = cartItems.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);
  if (cartItems.length === 0) {
    return (
      <div className="flex justify-center items-center h-[450px]">
        <p className="text-3xl text-center">
          Your cart is empty
          <br />
          <Link to="/shop" className="text-orange-400 text-xl">
            Continue Shopping
          </Link>
        </p>
      </div>
    );
  }
  return (
    <>
      <div className="container px-5 py-5">
        <h1 className="text-4xl text-center font-semibold py-5"></h1>
        <div className="flex flex-col space-y-4">
          {cartItems.map((item) => {
            return (
              <div
                key={item.productId}
                className="flex items-center justify-between bg-white p-4 shadow rounded-lg"
              >
                <img
                  className="w-32 h-32 object-contain rounded"
                  src={item.pictureUrl}
                  alt={item.title}
                />
                <div className="flex-1 px-4">
                  <h2 className="text-xl font-semibold">{item.title}</h2>
                  <p className="text-red-300">
                    Price:{" "}
                    <span className="font-semibold">
                      {formatNumber()(item.price)}
                    </span>{" "}
                    <span
                      className="text-grey-400"
                      style={{ fontSize: "14px" }}
                    >
                      TK/item
                    </span>
                  </p>
                  <p className="text-red-300">
                    Total:{" "}
                    <span className="font-semibold">
                      {formatNumber()(item.price * item.quantity)}
                    </span>{" "}
                    <span
                      className="text-grey-400"
                      style={{ fontSize: "14px" }}
                    >
                      TK
                    </span>
                  </p>
                  <div className="flex items-center mt-2">
                    <button
                      onClick={() => {
                        handleChangeQuantity(item.productId, item.quantity - 1);
                      }}
                      className="px-2 py-1 bg-amber-500 rounded hover:bg-orange-500"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      className="w-12 text-center mx-2"
                      value={item.quantity}
                      onChange={() => {
                        handleChangeQuantity(
                          item.productId,
                          parseInt(e.target.value)
                        );
                      }}
                    />
                    <button
                      onClick={() => {
                        handleChangeQuantity(item.productId, item.quantity + 1);
                      }}
                      className="px-2 py-1 bg-amber-500 rounded hover:bg-orange-500"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  className="text-red-400 hover:text-red-500 text-end"
                  onClick={() => {
                    handleRemoveCart(item.productId);
                  }}
                >
                  Remove
                </button>
              </div>
            );
          })}
          <div className="flex justify-between items-center mt-5">
            <h2 className="flex-2xl font-semibold">
              Total:{" "}
              <span className="font-semibold">
                {formatNumber()(totalAmount)}
              </span>{" "}
              <span className="text-red-400" style={{ fontSize: "14px" }}>
                TK
              </span>
            </h2>
            <Link
              className="bg-orange-400 text-black px-4 py-2 rounded"
              to="/checkout"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default CartPage;
