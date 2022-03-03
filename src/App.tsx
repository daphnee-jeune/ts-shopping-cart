import { useState } from 'react'
import { useQuery } from 'react-query'
import Drawer from '@material-ui/core/Drawer'
import LinearProgress from '@material-ui/core/LinearProgress'
import Grid from '@material-ui/core/Grid'
import Badge from '@material-ui/core/Badge'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'
import Item from './Item/Item'
import Cart from './Cart/Cart'
import { Wrapper, StyledButton } from './App.styles'

export type CartItemType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
}

const getProducts = async (): Promise<CartItemType[]> => {
  return await (await fetch('https://fakestoreapi.com/products')).json()
} 

const App = () => {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [cartItems, setCartItems] = useState([] as CartItemType[])
  const { data, isLoading, error } = useQuery<CartItemType[]>('products', getProducts)
  
  const getTotalItems = (items: CartItemType[]) => items.reduce((ack: number, item) => ack + item.amount, 0)
  const handleAddToCart = (clickedItem: CartItemType) => {
    setCartItems(prevItems => {
      const isItemInCart = prevItems.find(item => item.id === clickedItem.id)
      if(isItemInCart) {
        return prevItems.map(item => (
          item.id === clickedItem.id ? 
            { ...item, amount: item.amount + 1 } :
            item
        ))
      }
      return [...prevItems, { ...clickedItem, amount: 1 }]
    })
  }
  const hanldleRemoveFromCart = (id: number) => {
    setCartItems(prevItems => {
      return prevItems.reduce((ack, item) => {
        if (item.id === id) {
          if (item.amount === 1) {
            return ack
          }
          return [...ack, { ...item, amount: item.amount - 1 }]
        } else {
          return [...ack, item]
        }
      }, [] as CartItemType[])
    })
  }

  isLoading && <LinearProgress />
  error && <div>Something went wrong, try again</div>

  return (
    <Wrapper>
      <h1>Some Title</h1>
      <Drawer anchor='right' open={isCartOpen} onClose={() => setIsCartOpen(false)}>
        <Cart 
          cartItems={cartItems}
          addToCart={handleAddToCart}
          removeFromCart={hanldleRemoveFromCart}
        />
      </Drawer>
    <StyledButton onClick={() => setIsCartOpen(true)} >
      <Badge badgeContent={getTotalItems(cartItems)} color='error'>
        <AddShoppingCartIcon />
      </Badge>
    </StyledButton>
      <Grid container spacing={3}>
        {data?.map(item => (
          <Grid item key={item.id} xs={12} sm={4}>
            <Item item={item} handleAddToCart={handleAddToCart} />
          </Grid>
        ))}
      </Grid>
    </Wrapper>
  )
}

export default App
