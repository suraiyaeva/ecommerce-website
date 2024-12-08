import { Button } from "@/components/ui/button";
import {
  deleteProduct,
  getAllProducts,
} from "@/store/features/products/productSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
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
import moment from "moment";
import { MoreHorizontal } from "lucide-react";
import { toast } from "react-toastify";
import formatNumber from "format-number";

function Products() {
  const products = useSelector((state) => state.products.products);
  const status = useSelector((state) => state.products.status);
  const error = useSelector((state) => state.products.error);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = (productId) => {
    dispatch(deleteProduct(productId))
      .unwrap()
      .then((response) => {
        if (response?.success == true) {
          toast.success(response?.message, { autoClose: 2000 });
          dispatch(getAllProducts());
        } else {
          toast.error(response?.message, { autoClose: 2000 });
        }
      })
      .catch((error) => {
        toast.error(error, { autoClose: 2000 });
      });
  };

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
    <>
      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-2xl">Products</h2>
        <Link to="/admin/products/add">
          <Button>Add product</Button>
        </Link>
      </div>
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Sr. #</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Added By</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products &&
              products.products &&
              products.products.map((product, index) => {
                return (
                  <TableRow key={product._id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <img
                        alt="Product image"
                        className="aspect-square rounded-md object-cover"
                        height="64"
                        src={product.picture.secure_url}
                        width="64"
                      />
                    </TableCell>
                    <TableCell className="capitalize">
                      {product.title}
                    </TableCell>
                    <TableCell>{product.description}</TableCell>
                    <TableCell>{formatNumber()(product.price)}</TableCell>
                    <TableCell className="capitalize">
                      {product.category.name}
                    </TableCell>
                    <TableCell>{product.user.name}</TableCell>
                    <TableCell>
                      {moment(product.createdAt).format("DD-MM-YYYY")}
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
                                  `/admin/products/update/${product._id}`
                                );
                              }}
                            >
                              Edit
                            </button>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <button
                              onClick={() => {
                                handleDelete(product._id);
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
      </div>
    </>
  );
}

export default Products;
