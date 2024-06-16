import axios from "axios";
import { useEffect, useState } from "react";
import FormInput from "../components/form-input";
import { useLocation } from "react-router-dom";

type ProductPageProps = {};

type ProductItem = {
  id: string;
  title: string;
  price: number;
  qty: number;
};
type FomrInputsType = {
  lable: string;
  name: string;
  type: string;
};
const FormInputs: FomrInputsType[] = [
  {
    lable: "Product name: ",
    name: "productName",
    type: "text",
  },
  {
    lable: "Product price: ",
    name: "productPrice",
    type: "number",
  },
  {
    lable: "Product quantity: ",
    name: "productQuantity",
    type: "number",
  },
];
const ProductPage: React.FC<ProductPageProps> = ({}) => {
  const { pathname } = useLocation();
  const [products, setProducts] = useState([] as ProductItem[]);
  useEffect(() => {
    axios
      .get<ProductItem[]>("http://localhost:3005/products")
      .then(function (resp) {
        setProducts(resp.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <div>
      {pathname === "/product" && (
        <>
          <h1 className="text-xl">Products List</h1>
          {products.map((item) => (
            <div className="m-2 p-2 border-2 rounded-lg">
              <h2>{item.title}</h2>
              <h3 className="text-green-700 font-bold">Price: {item.price}</h3>
              <h3 className="font-bold">Qty in Stock: {item.qty}</h3>
            </div>
          ))}
        </>
      )}
      {pathname === "/product/create" && (
        <>
          <form action="" className="w-1/4">
            <div className="text-center">
              <h3>Create a new product</h3>
            </div>
            {FormInputs.map((input) => (
              <FormInput
                lable={input.lable}
                name={input.name}
                type={input.type}
              />
            ))}
            <div className="text-right">
              <button className="mt-4 bg-green-600 text-green-50 p-2 rounded-xl hover:bg-green-800 ">submit</button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default ProductPage;
