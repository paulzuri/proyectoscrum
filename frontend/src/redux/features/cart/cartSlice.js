import { createSlice } from '@reduxjs/toolkit';
import Swal from "sweetalert2";

// Cargar el carrito desde localStorage
const loadCartFromLocalStorage = () => {
    const savedCart = localStorage.getItem('cartItems');
    return savedCart ? JSON.parse(savedCart) : [];
};

// Inicializamos el estado con los productos guardados en el localStorage
const initialState = {
    cartItems: loadCartFromLocalStorage()
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
            
            // Guardar los cambios en localStorage
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },

        updateCartQuantity: (state, action) => {
            const { productId, quantity } = action.payload;
            const existingItem = state.cartItems.find(item => item._id === productId);
            if (existingItem) {
                existingItem.quantity = quantity;
                // Guardar los cambios en localStorage
                localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
            }
        },

        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter(item => item._id !== action.payload._id);
            // Guardar los cambios en localStorage
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },

        clearCart: (state) => {
            state.cartItems = [];
            // Eliminar el carrito del localStorage
            localStorage.removeItem('cartItems');
        }
    }
});

// Selector functions
export const selectCartItems = (state) => state.cart.cartItems;

// Export actions and reducer
export const { addToCart, updateCartQuantity, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
