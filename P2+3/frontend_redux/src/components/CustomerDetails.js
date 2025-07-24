import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CustomerDetails = () => {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3001/customers/${id}`)
      .then((res) => res.json())
      .then((data) => setCustomer(data));
  }, [id]);

  if (!customer) return <p>Loading...</p>;

  return (
    <div className="customer-card">
      <h3>Customer Details</h3>
      <p>
        <strong>ID:</strong> {customer.id}
      </p>
      <p>
        <strong>Name:</strong> {customer.name}
      </p>
      <p>
        <strong>Address:</strong> {customer.address}
      </p>

      {customer.orders && customer.orders.length > 0 && (
        <div>
          <h4>Orders</h4>
          <ul>
            {customer.orders.map((order, index) => (
              <li key={index}>
                Product ID: {order.product_id}, Quantity: {order.quantity}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CustomerDetails;
