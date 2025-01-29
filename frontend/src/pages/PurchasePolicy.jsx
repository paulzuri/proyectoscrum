import React from 'react';

const PurchasePolicy = () => {
    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Política de Compra</h1>
            <p>Bienvenido a Frizi. Al realizar una compra en nuestra tienda virtual, aceptas los siguientes términos y condiciones:</p>

            <h2 className="text-xl font-semibold mt-4 mb-2">1. Proceso de Compra</h2>
            <p>Para realizar una compra en Frizi, debes seleccionar los productos que deseas adquirir y añadirlos a tu carrito de compras. Una vez que hayas finalizado tu selección, procede al checkout para completar tu pedido proporcionando la información requerida.</p>

            <h2 className="text-xl font-semibold mt-4 mb-2">2. Métodos de Pago</h2>
            <p>Frizi acepta los siguientes métodos de pago:</p>
            <ul className="list-disc list-inside ml-4">
                <li>Tarjetas de crédito y débito (Visa, MasterCard, American Express)</li>
                <li>PayPal</li>
                <li>Transferencias bancarias</li>
            </ul>
            <p>Todos los pagos se procesan de manera segura y encriptada para proteger tu información personal y financiera.</p>

            <h2 className="text-xl font-semibold mt-4 mb-2">3. Confirmación de Pedido</h2>
            <p>Una vez que hayas completado tu compra, recibirás un correo electrónico de confirmación con los detalles de tu pedido. Si no recibes este correo, por favor verifica tu carpeta de spam o contáctanos para obtener asistencia.</p>

            <h2 className="text-xl font-semibold mt-4 mb-2">4. Envíos y Entregas</h2>
            <p>Frizi se compromete a procesar y enviar los pedidos en un plazo de 1 a 3 días hábiles. Los tiempos de entrega pueden variar según la ubicación y el método de envío seleccionado. Los costos de envío se calcularán al momento del checkout.</p>

            <h2 className="text-xl font-semibold mt-4 mb-2">5. Devoluciones y Reembolsos</h2>
            <p>Si no estás satisfecho con tu compra, puedes devolver los productos dentro de los 30 días posteriores a la recepción para obtener un reembolso completo. Los productos deben estar en su estado original y sin usar. Los costos de envío de devolución son responsabilidad del cliente. Para iniciar una devolución, por favor contáctanos a través de nuestro formulario de contacto.</p>

            <h2 className="text-xl font-semibold mt-4 mb-2">6. Cancelaciones</h2>
            <p>Si deseas cancelar tu pedido, por favor contáctanos lo antes posible. Si el pedido ya ha sido procesado y enviado, no podremos cancelar la compra, pero podrás devolver los productos una vez que los recibas.</p>

            <h2 className="text-xl font-semibold mt-4 mb-2">7. Productos Dañados o Defectuosos</h2>
            <p>Si recibes un producto dañado o defectuoso, por favor contáctanos dentro de los 7 días posteriores a la recepción para que podamos resolver el problema. Te pediremos que proporciones una descripción del daño o defecto y, en algunos casos, fotos del producto.</p>

            <h2 className="text-xl font-semibold mt-4 mb-2">8. Privacidad</h2>
            <p>En Frizi, nos tomamos en serio tu privacidad. Consulta nuestra Política de Privacidad para obtener más información sobre cómo recopilamos, utilizamos y protegemos tu información personal.</p>

            <h2 className="text-xl font-semibold mt-4 mb-2">9. Contacto</h2>
            <p>Si tienes alguna pregunta o inquietud sobre nuestra Política de Compra, por favor contáctanos a través de nuestro formulario de contacto en el sitio web.</p>
        </div>
    );
};

export default PurchasePolicy;