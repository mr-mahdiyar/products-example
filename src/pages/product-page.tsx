import axios from "axios";
import { useEffect, useState } from "react";

type ProductPageProps = {};

type ProductItem = {
  id: string;
  title: string;
  price: number;
  qty: number;
};

const ProductPage: React.FC<ProductPageProps> = ({}) => {
  const [products, setProducts] = useState([] as ProductItem[]);
  useEffect(() => {
    axios
      .get<ProductItem[]>("http://localhost:3000/products")
      .then(function (resp) {
        setProducts(resp.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <h1 className="text-xl">Products List</h1>
      {products.map((item) => (
        <div className="m-2 p-2 border-2 rounded-lg">
          <h2>{item.title}</h2>
          <h3 className="text-green-700 font-bold">Price: {item.price}</h3>
          <h3 className="font-bold">Qty in Stock: {item.qty}</h3>
        </div>
      ))}
    </div>
  );
};

export default ProductPage;
