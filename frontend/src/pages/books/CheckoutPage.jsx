import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Swal from 'sweetalert2';
import { useCreateOrderMutation } from '../../redux/features/orders/ordersApi';
import Paypal from './Paypal';

import {
    APIProvider,
    ControlPosition,
    MapControl,
    AdvancedMarker,
    Map,
    useMap,
    useMapsLibrary,
    useAdvancedMarkerRef,
} from "@vis.gl/react-google-maps";

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;


const CheckoutPage = () => {
    const cartItems = useSelector(state => state.cart.cartItems);
    const totalPrice = cartItems.reduce((acc, item) => acc + item.newPrice * item.quantity, 0).toFixed(2);

    const { currentUser } = useAuth();
    const { register, handleSubmit, watch, formState: { errors }, setValue } = useForm();
    const [createOrder, { isLoading, error }] = useCreateOrderMutation();
    const navigate = useNavigate();
    const [isChecked, setIsChecked] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);

    const addressRef = useRef(null); // Referencia para el campo de texto
    const [selectedPlace, setSelectedPlace] = useState(null);
    const [markerRef, marker] = useAdvancedMarkerRef();

    const quitoCoordinates = { lat: -0.180653, lng: -78.467834 }; // Coordenadas de Quito, Ecuador

    useEffect(() => {
        const data = watch();
        const requiredFields = ['name', 'phone', 'address', 'referencia'];
        const allFieldsFilled = requiredFields.every(field => data[field]?.trim() !== '');
        setIsFormValid(allFieldsFilled && isChecked);
    }, [watch(), isChecked]);

    useEffect(() => {
        if (cartItems.length === 0) {
            navigate("/cart");
        }
    }, [cartItems, navigate]);

    const handlePlaceSelect = (place) => {
        if (!place) return;

        // Actualiza el estado del lugar seleccionado
        setSelectedPlace(place);

        // Llena el campo de dirección automáticamente
        if (addressRef.current) {
            addressRef.current.value = place.formatted_address || place.name;
        }
    };

    const handleCheckboxChange = (e) => {
        setIsChecked(e.target.checked);
    };

    const getBaseUrl = () => {
        return import.meta.env.VITE_API_BASE_URL || 'http://localhost:5050';
    };

    const reduceStock = async () => {
        for (const item of cartItems) {
            try {
                console.log(`Reducing stock for product ID: ${item._id}, Quantity: ${item.quantity}`);
                const response = await axios.post(`${getBaseUrl()}/api/products/reduce-stock`, {
                    id: item._id,
                    quantity: item.quantity
                });
                console.log('Stock reduced:', response.data);
            } catch (error) {
                console.error('Error reducing stock:', error);
                if (error.response && error.response.data.message === "Insufficient stock") {
                    Swal.fire({
                        title: "Error",
                        text: "Insufficient stock, try again later.",
                        icon: "error",
                        confirmButtonText: "OK"
                    });
                } else {
                    Swal.fire({
                        title: "Error",
                        text: "Failed to reduce stock for some items.",
                        icon: "error",
                        confirmButtonText: "OK"
                    });
                }
                return false; // Return false if there's an error
            }
        }
        return true; // Return true if stock reduction is successful
    };

    const handleSuccessfulPayment = async () => {
        // Reduce stock before creating the order
        const stockReduced = await reduceStock();
        if (!stockReduced) {
            return; // Exit if stock reduction failed
        }

        const data = watch();
        const newOrder = {
            name: data.name,
            email: currentUser?.email,
            address: addressRef.current.value,
            referencia: data.referencia,
            phone: data.phone,
            products: cartItems.map(item => ({ productId: item._id, quantity: item.quantity })),
            totalPrice: totalPrice,
        };

        try {
            console.log("Creating order with data:", newOrder);
            const response = await createOrder(newOrder).unwrap();
            Swal.fire({
                title: "Orden Confirmada",
                text: "Tu orden a sido procesada con exito!",
                icon: "success",
                confirmButtonText: "OK"
            });
            navigate("/orders");
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: "Error al crear la orden, intente nuevamente.",
                icon: "error",
                confirmButtonText: "OK"
            });
        }
    };

    const onSubmit = async (data) => {
        await handleSuccessfulPayment();
    };

    const MapHandler = ({ place, marker }) => {
        const map = useMap();

        useEffect(() => {
            if (!map || !place || !marker) return;

            if (place.geometry?.viewport) {
                map.fitBounds(place.geometry?.viewport);
            }

            marker.position = place.geometry?.location;
        }, [map, place, marker]);

        return null;
    };

    const PlaceAutocomplete = ({ inputRef, onPlaceSelect }) => {
        const [placeAutocomplete, setPlaceAutocomplete] = useState(null);
        const places = useMapsLibrary("places");

        useEffect(() => {
            if (!places || !inputRef?.current) return;

            const options = {
                fields: ["geometry", "name", "formatted_address"],
            };

            const autocomplete = new places.Autocomplete(inputRef.current, options);
            setPlaceAutocomplete(autocomplete);

            // Evento para manejar la selección del lugar
            autocomplete.addListener("place_changed", () => {
                const place = autocomplete.getPlace();
                onPlaceSelect(place);
            });
        }, [places, inputRef, onPlaceSelect]);

        return null; // Este componente no necesita renderizar nada directamente
    };


    const maps = useMapsLibrary("maps");
    useEffect(() => {
        if (!maps) {
            console.log("Google Maps library is not loaded.");
        } else {
            console.log("Google Maps library loaded successfully.");
        }
    }, [maps]);




    return (
        <section>
            <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
                <div className="container max-w-screen-lg mx-auto">
                    <div>
                        <div>
                            <h2 className="font-semibold text-xl text-gray-600 mb-2">Información de Envío</h2>
                            <p className="text-gray-500 mb-2">Precio Total: ${totalPrice}</p>
                            <p className="text-gray-500 mb-6">Items: {cartItems.reduce((total, item) => total + item.quantity, 0)}</p>
                            <APIProvider apiKey={API_KEY} solutionChannel="GMP_devsite_samples_v3_rgmautocomplete">
                                <PlaceAutocomplete inputRef={addressRef} onPlaceSelect={handlePlaceSelect} />
                                <div className="map-container" style={{ height: "300px", width: "100%", marginTop: "20px" }}>
                                    <Map
                                        mapId={"bf51a910020fa25a"}
                                        defaultZoom={12}
                                        defaultCenter={quitoCoordinates}
                                        mapContainerStyle={{ height: "100%", width: "100%" }}
                                    >
                                        <AdvancedMarker
                                            ref={markerRef}
                                            draggable={true}
                                            position={selectedPlace?.geometry?.location || quitoCoordinates}
                                            onDragEnd={(event) => {
                                                const newPosition = event.latLng;
                                                if (newPosition) {
                                                    setSelectedPlace({
                                                        geometry: {
                                                            location: {
                                                                lat: newPosition.lat(),
                                                                lng: newPosition.lng(),
                                                            },
                                                        },
                                                    });
                                                }
                                            }}
                                        />
                                        <MapHandler place={selectedPlace} marker={marker} />
                                    </Map>
                                </div>
                                <div className="mt-4 flex items-center">
                                    <button
                                        onClick={async () => {
                                            if (selectedPlace?.geometry?.location) {
                                                const { lat, lng } = selectedPlace.geometry.location;
                                                const geocoder = new window.google.maps.Geocoder();
                                                try {
                                                    const { results } = await geocoder.geocode({ location: { lat, lng } });
                                                    if (results && results.length > 0) {
                                                        const address = results[0].formatted_address;
                                                        // Completa el campo de dirección con la dirección obtenida
                                                        if (addressRef.current) {
                                                            addressRef.current.value = address;
                                                        }
                                                    } else {
                                                        console.log("No se encontraron resultados para las coordenadas proporcionadas.");
                                                    }
                                                } catch (error) {
                                                    console.error("Error al obtener la dirección:", error);
                                                }
                                            } else {
                                                console.log("El marcador no tiene una posición definida.");
                                            }
                                        }}
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded text-sm"
                                    >
                                        Actualizar Ubicación
                                    </button>
                                    <p className="ml-4 text-gray-500">Utilice este botón una vez situado el marcador en su domicilio.</p>
                                </div>


                            </APIProvider>
                        </div>
                        <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3 my-8">
                                <div className="text-gray-600">
                                    <p className="font-medium text-lg">Detalles Personales</p>
                                    <p>Por favor completar todos los campos.</p>
                                </div>
                                <div className="lg:col-span-2">
                                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                                        <div className="md:col-span-5">
                                            <label htmlFor="full_name">Nombre Completo</label>
                                            <input
                                                {...register("name", { required: true })}
                                                type="text" name="name" id="name" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" 
                                                placeholder="Ingrese nombre y apellido"/>
                                                
                                        </div>
                                        <div className="md:col-span-5">
                                            <label html="email">Correo Electrónico</label>
                                            <input
                                                type="text" name="email" id="email" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                                disabled
                                                defaultValue={currentUser?.email}
                                                placeholder="email@domain.com" />
                                        </div>
                                        <div className="md:col-span-5">
                                            <label html="phone">Número de Teléfono</label>
                                            <input
                                                {...register("phone", { required: true })}
                                                type="number" name="phone" id="phone" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="+123 456 7890" />
                                        </div>
                                        <div className="md:col-span-3">
                                            <label htmlFor="address">Dirección - Calles</label>
                                            <input
                                                {...register("address", { required: true })}
                                                type="text"
                                                name="address"
                                                id="address"
                                                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                                ref={addressRef} // Asigna la referencia aquí
                                            />
                                        </div>
                                        <div className="md:col-span-3">
                                            <label htmlFor="referencia">Referencias</label>
                                            <input
                                                {...register("referencia", { required: true })}
                                                type="text"
                                                name="referencia"
                                                id="referencia"
                                                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                                placeholder="Ingrese referencias adicionales"
                                            />
                                        </div>

                                        <div className="md:col-span-5 mt-3">
                                            <div className="inline-flex items-center">
                                                <input
                                                    onChange={(e) => setIsChecked(e.target.checked)}
                                                    type="checkbox" name="billing_same" id="billing_same" className="form-checkbox" />
                                                <label htmlFor="billing_same" className="ml-2">
                                                    Acepto los <Link to="/terms-and-conditions" className='underline underline-offset-2 text-blue-600'>Términos y Condiciones</Link> y la <Link to="/purchase-policy" className='underline underline-offset-2 text-blue-600'>Política de Compra</Link>.
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-gray-600">
                                    <p className="font-medium text-lg">Finalizar Compra</p>
                                </div>
                                <div className="mt-4">
                                    <Paypal
                                        totalPrice={totalPrice}
                                        onSuccessfulPayment={handleSuccessfulPayment}
                                        disabled={!isFormValid}
                                    />
                                </div>
                            </form>
                            {/* <form onSubmit={handleSubmit(onSubmit)}>
                                <button type="submit" disabled={!isFormValid}>Place Order</button>
                            </form> */}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CheckoutPage;