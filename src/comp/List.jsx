import { useSelector, useDispatch } from "react-redux";
// import { setAPIData } from "../redux/APIDataSlice";
import { useEffect } from "react";
import "../assets/index.css";
import {
  addItemToCart,
  clearCart,
  removeQuantity,
  removeProduct,
  calculateTotal,
} from "../features/Cart/cartDataSlice";
import { Box, Button, Container } from "@mui/material";
import { fetchAPIDataOnLoad } from "../features/API/APIDataSlice";

const List = () => {
  const dispatch = useDispatch();
  const { value, isLoading } = useSelector((state) => state.APIData);
  const { cartItems } = useSelector((state) => state.CartData);
  const TotalPrice = useSelector((state) => state.CartData.cartTotalPrice);

  useEffect(() => {
    dispatch(fetchAPIDataOnLoad());
  }, []);

  useEffect(() => {
    dispatch(calculateTotal());
  }, [cartItems]);

  const product = {
    margin: "10px",
    padding: "5px",
    backgroundColor: "grey",
    color: "white",
  };

  const cart = {
    display: "flex",
    gap: "10px",
    alignItems: "center",
  };

  const button = {
    height: "25px",
    textAlign: "center",
  };

  return (
    <>
      {isLoading ? (
        "Loading data from API"
      ) : (
        <>
          <Container
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: "40px",
              justifyContent: "center ",
            }}
          >
            {value ? (
              value.map((item, index) => {
                return (
                  <Box
                    key={index}
                    sx={{
                      width: 300,
                      height: 300,
                      backgroundColor: "grey",
                      "&:hover": {
                        backgroundColor: "",
                        opacity: [0.9, 0.8, 0.7],
                      },
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <p className="item-title">{item.title}</p>
                    <img src={item.image} className="item-image" alt="" />
                    <Button
                      variant="contained"
                      onClick={() => dispatch(addItemToCart(item))}
                    >
                      Add to cart
                    </Button>
                  </Box>
                );
              })
            ) : (
              <h4>Loading</h4>
            )}
          </Container>

          <h3>Cart:</h3>
          {cartItems &&
            cartItems.map((item, index) => {
              return (
                <div key={index} style={cart}>
                  <p>{item.title}</p>
                  <button
                    style={button}
                    onClick={() => dispatch(removeQuantity(item))}
                    disabled={cartItems[index].quantity === 1 ? true : false}
                  >
                    -
                  </button>
                  <p>{cartItems[index].quantity}</p>
                  <button
                    style={button}
                    onClick={() => dispatch(addItemToCart(item))}
                  >
                    +
                  </button>
                  <p>Price: {cartItems[index].subTotal.toFixed(2)}</p>
                  <button onClick={() => dispatch(removeProduct(item))}>
                    Remove
                  </button>
                </div>
              );
            })}
          <h4>Total price: {TotalPrice.toFixed(2)}</h4>

          <button onClick={() => dispatch(clearCart())}>Clear cart</button>
        </>
      )}
    </>
  );
};

export default List;
