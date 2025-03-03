import './index.css'
import CartContext from '../../context/CartContext'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      const cost = cartList.reduce(
        (acc, item) => acc + item.quantity * item.price,
        0,
      )
      const cart = cartList.length
      return (
        <div className="cardHolder">
          <div className="card">
            <h1 className="costHead">{`Order Total: Rs ${cost}/-`}</h1>
            <p className="cartitems">{`${cart} items in cart`}</p>
            <button className="checkout" type="button">
              Checkout
            </button>
          </div>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
