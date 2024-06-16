import axios from "axios";
import { useEffect, useState, Dispatch, SetStateAction } from "react";
import FormInput from "../components/form-input";
import { useLocation, useNavigate } from "react-router-dom";
import { useId } from "react"
import { addProduct } from "../services/products";
type ProductPageProps = {};

export type ProductItem = {
  id: string;
  title: string;
  price: number;
  qty: number;
};
type FomrInputsType = {
  lable: string;
  name: string;
  type: string;
  value: string | number;
  setValue: Dispatch<SetStateAction<string>>;
};
const ProductPage: React.FC<ProductPageProps> = ({}) => {
  const { pathname } = useLocation();
  const [products, setProducts] = useState([] as ProductItem[]);
  const [productName, setProductName] = useState<string>("")
  const [productPrice, setProductPrice] = useState<string>("");
  const [productQuantity, setProductQuantity] = useState<string>("");
  const navigate = useNavigate();
  const productId = useId() as string;

  const FormInputs: FomrInputsType[] = [
    {
      lable: "Product name: ",
      name: "productName",
      type: "text",
      value: productName,
      setValue: setProductName
    },
    {
      lable: "Product price: ",
      name: "productPrice",
      type: "number",
      value: productPrice,
      setValue: setProductPrice
    },
    {
      lable: "Product quantity: ",
      name: "productQuantity",
      type: "number",
      value: productQuantity,
      setValue: setProductQuantity
    },
  ];

  useEffect(() => {
    axios
      .get<ProductItem[]>("http://localhost:3005/products")
      .then(function (resp) {
        setProducts(resp.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [products]);
  function submitHandler (event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const product: ProductItem = {
      id: productId,
      title: productName,
      price: parseFloat(productPrice),
      qty: parseFloat(productQuantity)
    }
    addProduct(product)
    setProductName("");
    setProductPrice("");
    setProductQuantity("");
    navigate("/product")
  }
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
          <form className="w-1/4" onSubmit={submitHandler}>
            <div className="text-center">
              <h3>Create a new product</h3>
            </div>
            {FormInputs.map((input) => (
              <FormInput
                lable={input.lable}
                name={input.name}
                type={input.type}
                value={input.value}
                setValue={input.setValue}
              />
            ))}
            <div className="text-right">
              <button className="mt-4 bg-green-600 text-green-50 p-2 rounded-xl hover:bg-green-800 ">
                submit
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default ProductPage;
