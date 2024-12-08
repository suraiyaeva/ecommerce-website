import ProductCard from "@/components/ProductCard";
import { getAllProducts } from "@/store/features/products/productSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function Shop() {
  const products = useSelector((state) => state.products.products);
  const status = useSelector((state) => state.products.status);
  const error = useSelector((state) => state.products.error);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

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
    <div className="container px-5 py-5">
      <h1 className="text-3xl font-semibold text-center py-7">
        Latest <span className="text-orange-500">Mobiles</span>
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {products &&
          products.products &&
          products.products.map((product) => {
            return (
              <div key={product._id}>
                <ProductCard product={product} />
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Shop;
