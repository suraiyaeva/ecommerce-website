import { Button } from "@/components/ui/button";

import { Link, useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";

import { toast } from "react-toastify";

import { useDispatch, useSelector } from "react-redux";
import { getAllCategories } from "@/store/features/categories/categoriesSlice";
import { addProduct } from "@/store/features/products/productSlice";

function AddProduct() {
  const [inputValues, setInputValues] = useState({});

  const categories = useSelector((state) => state.categories.categories);
  const productStatus = useSelector((state) => state.products.status);
  const status = useSelector((state) => state.categories.status);
  const error = useSelector((state) => state.categories.error);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputValues((values) => ({ ...values, [name]: value }));
  };

  const handleCategoryChange = (value) => {
    setInputValues((values) => ({ ...values, category: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addProduct(inputValues))
      .unwrap()
      .then((response) => {
        if (response?.success == true) {
          toast.success(response?.message, { autoClose: 2000 });
          setInputValues({});
          setTimeout(() => {
            navigate("/admin/products");
          }, 2000);
        } else {
          toast.error(response?.message, { autoClose: 2000 });
        }
      })
      .catch((error) => {
        toast.error(error, { autoClose: 2000 });
      });
  };
  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  if (status == "loading") {
    return (
      <div>
        <p className="flex justify-center items-center h-full">
          Loading Categories
        </p>
      </div>
    );
  }
  if (error == "error") {
    return (
      <div>
        <p className="flex justify-center items-center h-full">
          Error While Fetching Categories...
        </p>
      </div>
    );
  }
  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-xl">Product Details</CardTitle>
          <CardDescription>Enter your info to add a product</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="Enter product title"
                  required
                  name="title"
                  type="text"
                  value={inputValues.title || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="price">Price</Label>
                  <Input
                    id="price"
                    type="number"
                    placeholder="Enter product price"
                    required
                    name="price"
                    value={inputValues.price || ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="category">Category</Label>
                  <Select onValueChange={handleCategoryChange}>
                    <SelectTrigger className="Select Category">
                      <SelectValue placeholder="Select a Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories &&
                        categories.categories &&
                        categories.categories.map((category) => {
                          return (
                            <SelectItem
                              className="capitalize"
                              key={category._id}
                              value={category._id}
                            >
                              {category.name}
                            </SelectItem>
                          );
                        })}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="picture">Picture</Label>
                <Input
                  id="picture"
                  type="file"
                  required
                  name="picture"
                  onChange={(e) => {
                    handleChange({
                      target: {
                        name: "picture",
                        value: e.target.files[0],
                      },
                    });
                  }}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  className="min-h-32"
                  placeholder="Enter product description"
                  name="description"
                  value={inputValues.description || ""}
                  onChange={handleChange}
                />
              </div>

              <Button
                type="submit"
                className="max-w-36"
                disabled={productStatus == "loading" ? true : false}
              >
                {productStatus == "loading"
                  ? "Adding Product...."
                  : "Add a Product"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </>
  );
}

export default AddProduct;
