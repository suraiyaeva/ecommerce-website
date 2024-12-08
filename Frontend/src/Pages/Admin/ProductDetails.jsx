import { getSingleProduct } from "@/store/features/products/productSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import formatNumber from "format-number";
import { addToCart } from "@/store/features/cart/cartSlice";
import { toast } from "react-toastify";

function ProductDetails() {
  const [quantity, setQuantity] = useState(1);
  const [ProductDetails, setProductDetails] = useState({
    title: "",
    category: "",
    picture: "",
    description: "",
    price: "",
  });
  const dispatch = useDispatch();
  const { productId } = useParams();
  const products = useSelector((state) => state.products.products);
  const status = useSelector((state) => state.products.status);
  const error = useSelector((state) => state.products.error);

  const handleDecrement = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };
  const handleIncrement = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleAddToCart = () => {
    dispatch(addToCart({ productId, title, price, pictureUrl, quantity }));
    toast.success("item added to cart successfully", { autoClose: 1500 });
  };

  useEffect(() => {
    dispatch(getSingleProduct(productId));
  }, [productId, dispatch]);

  useEffect(() => {
    if (products && products.product) setProductDetails(products.product);
  }, [products]);

  const { title, price, category, picture, description } = ProductDetails;
  const pictureUrl = picture?.secure_url || "";
  const categoryName = category?.name || "";

  if (status == "loading") {
    return (
      <div>
        <p className="flex justify-center items-center h-full">
          Loading Products......
        </p>
      </div>
    );
  }
  if (error == "error") {
    return (
      <div>
        <p className="flex justify-center items-center h-full">
          Error While Fetching Products...
        </p>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h1 className="text-center text-5xl py-7 font-semibold">
        Product Details
      </h1>
      <div className="flex py-5">
        <div className="w-1/2">
          <img src={pictureUrl} alt={title} className="mx-auto" />
        </div>
        <div className="w-1/2">
          <h2 className="text-3xl mb-3 font-semibold">{title}</h2>
          <p className="capitalize mb-3">
            Price:
            <span className="font-semibold">{formatNumber()(price)}</span>
            <span className="text-grey-400" style={{ fontSize: "14px" }}>
              TK/item
            </span>
          </p>
          <p className="capitalize mb-3">
            Category:
            <span className="font-semibold">{category.name}</span>
          </p>
          <p className="capitalize mb-3">{description}</p>
          <div className="mb-3">
            <button
              className="px-2 py-1 bg-slate-400 rounded"
              onClick={handleDecrement}
            >
              -
            </button>
            <input
              type="number"
              className="w-20 border py-1 text-center"
              readOnly
              value={quantity}
              min={1}
            />
            <button
              className="px-2 py-1 bg-slate-400 rounded"
              onClick={handleIncrement}
            >
              +
            </button>
          </div>
          <div>
            <button
              onClick={handleAddToCart}
              className="w-80 bg-orange-400 hover:bg-orange-600 py-2 rounded"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
