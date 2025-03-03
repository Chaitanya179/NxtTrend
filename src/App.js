import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  addCartItem = product => {
    this.setState(prevState => {
      const {cartList} = prevState
      const present = cartList.findIndex(i => i.id === product.id)
      let updatedCart = []
      if (present !== -1) {
        updatedCart = cartList.map(i => {
          if (i.id === product.id) {
            return {...i, quantity: i.quantity + product.quantity}
          }
          return i
        })
        return {cartList: updatedCart}
      }
      return {cartList: [product, ...prevState.cartList]}
    })
    //   TODO: Update the code here to implement addCartItem
  }

  removeCartItem = id => {
    console.log(id)
    const {cartList} = this.state
    const updatedCart = cartList.filter(i => i.id !== id)
    this.setState({cartList: updatedCart})
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  incrementCartItemQuantity = id => {
    const {cartList} = this.state
    const updatedCart = cartList.map(i => {
      if (i.id === id) {
        return {...i, quantity: i.quantity + 1}
      }
      return i
    })
    this.setState({cartList: updatedCart})
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    const updatedCart = cartList.map(i => {
      if (i.id === id) {
        return {...i, quantity: i.quantity - 1}
      }
      return i
    })
    const countUpdated = updatedCart.filter(i => i.quantity >= 1)
    this.setState({cartList: countUpdated})
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          removeAllCartItems: this.removeAllCartItems,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
