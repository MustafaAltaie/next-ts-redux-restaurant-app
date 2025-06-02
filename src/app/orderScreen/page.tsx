'use client';
import { useReadOrdersQuery, useDeleteOrderMutation } from "../../../features/order/orderApi";
import { Order } from "../../../types/Order";
import AuthGuard from "../components/authGuard/AuthGuard";
import './orderScreen.css';
import { useRouter } from "next/navigation";
import { useState } from "react";
import OrderItem from "./OrderItem";

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
      {orders.length === 0 && !isLoading &&
      <h1 className="centeredElement">No orders</h1>}
      {isLoading && <p>Loading...</p>}
      <div className="orderwrapper flexColumn10">
        {orders?.map((order: Order) => 
          <OrderItem
            key={order._id}
            order={order}
            handleDeleteOrder={handleDeleteOrder}
          />
        )}
      </div>
    </div>
    </AuthGuard>
  )
}

export default page;