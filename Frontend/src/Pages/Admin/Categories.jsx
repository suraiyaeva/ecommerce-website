import { Button } from "@/components/ui/button";
import moment from "moment";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  AddCategory,
  DeleteCategory,
  getAllCategories,
} from "@/store/features/categories/categoriesSlice";
import { MoreHorizontal } from "lucide-react";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Categories() {
  const [inputValues, setInputValues] = useState({});
  const categories = useSelector((state) => state.categories.categories);
  const status = useSelector((state) => state.categories.status);
  const error = useSelector((state) => state.categories.error);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputValues((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(AddCategory(inputValues))
      .unwrap()
      .then((response) => {
        if (response?.success == true) {
          toast.success(response?.message, { autoClose: 2000 });
          setInputValues({});
          dispatch(getAllCategories());
        } else {
          toast.error(response?.message, { autoClose: 2000 });
        }
      })
      .catch((error) => {
        toast.error(error, { autoClose: 2000 });
      });
  };

  const handleDelete = (slug) => {
    dispatch(DeleteCategory(slug))
      .unwrap()
      .then((response) => {
        if (response?.success == true) {
          toast.success(response?.message, { autoClose: 2000 });
          setInputValues({});
          dispatch(getAllCategories());
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
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Add Category</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="flex">
                <Input
                  className="me-2"
                  id="name"
                  type="text"
                  placeholder="Category Name"
                  required
                  name="name"
                  value={inputValues.name}
                  onChange={handleChange}
                />
                <Button>Add Category</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      <section>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Sr. #</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Date Added</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories &&
              categories.categories &&
              categories.categories.map((category, index) => {
                return (
                  <TableRow key={category._id}>
                    <TableCell>{index + 1}</TableCell>

                    <TableCell className="capitalize">
                      {category.name}
                    </TableCell>
                    <TableCell>{category.slug}</TableCell>
                    <TableCell>
                      {moment(category.createdAt).format("DD-MM-YYYY")}
                    </TableCell>

                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <Button
                            aria-haspopup="true"
                            size="icon"
                            variant="ghost"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle Menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>
                            <button
                              onClick={() => {
                                navigate(
                                  `/admin/categories/update/${category.slug}`
                                );
                              }}
                            >
                              Edit
                            </button>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <button
                              onClick={() => {
                                handleDelete(category.slug);
                              }}
                            >
                              Delete
                            </button>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </section>
    </>
  );
}

export default Categories;
