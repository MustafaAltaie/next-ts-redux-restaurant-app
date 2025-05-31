'use client';
import { useReadOrdersQuery, useDeleteOrderMutation } from "../../../features/order/orderApi";
import { Order } from "../../../types/Order";
import { CartItem } from "../../../types/Cart";
import AuthGuard from "../components/authGuard/AuthGuard";
import './orderScreen.css';
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const page = () => {
  const { data, isLoading } = useReadOrdersQuery();
  const [deleteOrder] = useDeleteOrderMutation();
  const orders: Order[] = data ?? [];
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  const handleDeleteOrder = async(id: string) => {
    if(!id) return;
    const isConfirmed = confirm('Confirm deleting order?');
    if(!isConfirmed) return;
    setDeleting(true);
    try {
      await deleteOrder(id).unwrap();
    } catch (err) {
      console.error('Error deleting order:', err);
      alert('Error deleting order');
    } finally {
      setDeleting(false);
    }
  }

  return (
    <AuthGuard>
    <div className="orderSection">
      <h3 onClick={() => router.push('/')}>Restaurant logo</h3>
      {deleting &&
      <div className="deletingOrderText flexCenter">
        <h1>Deleting Order...</h1>
      </div>}
      {orders.length === 0 &&
      <h1 className="centeredElement">No orders</h1>}
      {isLoading && <p>Loading...</p>}
      <div className="orderwrapper flexColumn10">
        {orders?.map((order: Order) => 
          <div key={order._id} className="order flexColumn10" onClick={() => handleDeleteOrder(order._id!)}>
            <div className="orderPart1">
              <h1>{order.name}</h1>
              <h3>Order type: <span>{order.orderType}</span>{order.orderType === 'delivery' ? " 🚗" : " 🍜"}</h3>
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
        )}
      </div>
    </div>
    </AuthGuard>
  )
}

export default page;