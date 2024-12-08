import React from "react";
import { Card, CardContent } from "./ui/card";
import { Link } from "react-router-dom";
import formatNumber from "format-number";

function ProductCard({ product }) {
  return (
    <Link to={`/product/${product._id}`}>
      <Card className="rounded-lg shadow w-full">
        <CardContent className="grid gap-3">
          <img
            src={product.picture.secure_url}
            alt={product.title}
            className="px-8 py-4 rounded-lg"
          />
          <div className="p-3">
            <h5 className="text-2xl mb-4 font-semibold tracking-tight text-gray-900">
              {product.title}
            </h5>
            <div className="flex justify-between items-center">
              <span className="text-xl font-semibold text-gray-900">
                {formatNumber()(product.price)}/-
                <span style={{ fontSize: "16px" }}>TK</span>
              </span>
              <button className="bg-orange-500 hover:bg-orange-700 px-4 py-2 rounded-md">
                View Product
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export default ProductCard;
