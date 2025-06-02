import { Order } from "../../../types/Order";
import { CartItem } from "../../../types/Cart";
import Image from "next/image";

interface OrderProps {
    order: Order,
    handleDeleteOrder: (id: string) => void
}

const OrderItem = ({ order, handleDeleteOrder }: OrderProps) => {
    return (
        <div key={order._id} className="order flexColumn10" onClick={() => handleDeleteOrder(order._id!)}>
            <div className="orderPart1">
              <h1>{order.name}</h1>
              <h3><span>{order.orderType.toUpperCase()}</span>{order.orderType === 'delivery' ? " 🚗" : " 🍜"}</h3>
            </div>
            <div className="orderPart2">
              <div className="flexColumn10">
                {order.table &&
                <p>Table number: <span>{order.table}</span></p>}
                {order.address &&
                <p>Address: <span>{order.address}</span></p>}
                {order.mobile &&
                <p>Mobile: <span>{order.mobile}</span></p>}
                {order.portCode &&
                <p>Port code: <span>{order.portCode}</span></p>}
                <p>Total quantity: <span>{order.totalQuantity}</span></p>
                <h3>Subtotal: <span>{order.subTotal}:-</span></h3>
              </div>
              <ul className="flexColumn10">
                {order.items.map((item: CartItem) =>
                  <li key={item.image} className="flexSpaceBetween">
                    <Image
                      src={item.image!}
                      alt="Item image"
                      width={50}
                      height={50}
                      priority
                    />
                    <p>{item.title}</p>
                    <p>{item.quantity} st</p>
                  </li>
                )}
              </ul>
            </div>
            {order.message &&
            <p>Message: <span>{order.message}</span></p>}
            <h5 className="orderDate">{new Date(order.createdAt!).toLocaleString()}</h5>
        </div>
    )
}

export default OrderItem;