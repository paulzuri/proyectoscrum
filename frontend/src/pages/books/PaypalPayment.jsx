import { PayPalButtons } from "@paypal/react-paypal-js";
import getBaseUrl from "../../utils/baseURL";

const PaypalPayment = ({ totalPrice }) => {
    const createOrder = () => {
        // Order is created on the server and the order id is returned
        return fetch(`${getBaseUrl()}/api/paypal/orders`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            // use the "body" param to optionally pass additional order information
            // like product skus and quantities
            body: JSON.stringify({
                product: {
                    description: "Costo del carrito",
                    cost: totalPrice // Usamos el totalPrice dinámico
                },
            }),
        })
            .then((response) => response.json())
            .then((order) => order.id);
    };
    const onApprove = (data) => {
        // Capture the order on the server
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
                    // Show success message
                    console.log("Pago realizado con éxito. Gracias por tu compra.");


                    // // Optional: Save the payment details to your database
                    // console.log("Detalles del pago:", captureDetails);

                    // Optional: Redirect to a confirmation page
                    // window.location.href = "/confirmation";

                } else {
                    // Show error message
                    alert("Hubo un problema al procesar el pago. Por favor, inténtelo nuevamente.");
                }
            })
            .catch((error) => {
                console.error("Error al capturar la orden:", error);
                alert("Hubo un error al capturar el pago. Inténtelo más tarde.");
            });
    };
    return (
        <
            PayPalButtons createOrder={
                (data, actions) => createOrder(data, actions)
            }
            onApprove={
                (data, actions) => onApprove(data, actions)
            }
        />
    );
}

export default PaypalPayment;