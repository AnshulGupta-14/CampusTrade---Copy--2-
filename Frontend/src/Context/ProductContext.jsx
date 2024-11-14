import axios from "../Utils/Axios";
import { createContext, useEffect, useState } from "react";
import { errorHandler } from "../Utils/HandleError";

export const ProductContext = createContext();

const ProductProvider = (props) => {
  const [products, setproducts] = useState([]);

  useEffect(() => {
    axios
      .get("/products/get-products")
      .then((res) => {
        setproducts(res.data.data);
      })
      .catch((err) => {
        errorHandler(err);
      });
  }, []);

  console.log(products);
  

  return (
    <ProductContext.Provider value={{products, setproducts}}>
      {props.children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
