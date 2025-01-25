import { PayPalButtons } from "@paypal/react-paypal-js";
import getBaseUrl from "../../utils/baseURL";

const PaypalPayment = ({ totalPrice, onSuccessfulPayment, disabled }) => {
    const createOrder = () => {
        return fetch(`${getBaseUrl()}/api/paypal/orders`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                product: {
                    description: "Costo del carrito",
                    cost: totalPrice,
                },
            }),
        })
            .then((response) => response.json())
            .then((order) => order.id);
    };

    const onApprove = (data) => {
        return fetch(`${getBaseUrl()}/api/paypal/orders/${data.orderID}/capture`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                orderID: data.orderID,
            }),
        })
            .then((response) => response.json())
            .then((captureDetails) => {
                if (captureDetails.status === "COMPLETED") {
                    console.log("Pago realizado con éxito");
                    if (onSuccessfulPayment) {
                        onSuccessfulPayment();
                    }
                } else {
                    alert("Hubo un problema al procesar el pago.");
                }
            })
            .catch((error) => {
                console.error("Error al capturar la orden:", error);
                alert("Hubo un error al capturar el pago. Inténtelo más tarde.");
            });
    };

    return (
        <PayPalButtons 
            createOrder={createOrder}
            onApprove={onApprove}
            disabled={disabled} // Aquí se pasa el estado disabled
        />
    );
}

export default PaypalPayment;
