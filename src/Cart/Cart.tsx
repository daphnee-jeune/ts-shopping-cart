
import { Wrapper } from './Cart.styles'
import CartItem from '../CartItem/CartItem'
import { CartItemType } from '../App'

type CartProps = {
    cartItems: CartItemType[]
    addToCart: (clickedItem: CartItemType) => void
    removeFromCart: (id: number) => void
}

const Cart: React.FC<CartProps> = ({ cartItems, addToCart, removeFromCart }) => {

    const calculateTotalPrice = (items: CartItemType[]) => {
        return items.reduce((ack: number, item) => ack + item.amount * item.price, 0)
    }

    return (
        <Wrapper>
            <h2>Your shopping cart</h2>
            { cartItems.length === 0 ? <p>You have an empty shopping cart</p> : null }
            {cartItems.map(item => (
                <CartItem 
                    key={item.id}
                    item={item}
                    addToCart={addToCart}
                    removeFromCart={removeFromCart}
                />
            ) )}
            <h2>Total: ${calculateTotalPrice(cartItems).toFixed(2)}</h2>
        </Wrapper>
    )
}

export default Cart