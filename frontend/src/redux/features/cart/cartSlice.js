import { createSlice } from '@reduxjs/toolkit';
import Swal from "sweetalert2";

const initialState = {
    cartItems: []
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const { product, quantity } = action.payload;
            const existingItem = state.cartItems.find(item => item._id === product._id);
            if (!existingItem) {
                state.cartItems.push({
                    ...product,
                    quantity
                });
                console.log('Added to cart:', { ...product, quantity });
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Producto añadido al carrito",
                    showConfirmButton: false,
                    timer: 1500
                });
            } else {
                Swal.fire({
                    position: "center",
                    icon: "info",
                    title: "Tu producto ya está en el carrito",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
            console.log('Current cart items:', state.cartItems);
        },
        updateCartQuantity: (state, action) => {
            const { productId, quantity } = action.payload;
            const existingItem = state.cartItems.find(item => item._id === productId);
            if (existingItem) {
                existingItem.quantity = quantity;
            }
        },
        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter(item => item._id !== action.payload._id);
        },
        clearCart: (state) => {
            state.cartItems = [];
        }
    }
});

// Selector functions
export const selectCartItems = (state) => state.cart.cartItems;

// Export actions and reducer
export const { addToCart, updateCartQuantity, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;