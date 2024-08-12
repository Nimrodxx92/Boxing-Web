// src/components/AdminDashboard.jsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDashboardSummary,
  fetchAllPayments,
  fetchUser,
} from "../redux/adminSlice";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const dashboardSummary = useSelector((state) => state.admin.dashboardSummary);
  const payments = useSelector((state) => state.admin.payments);
  const users = useSelector((state) => state.admin.user);
  const status = useSelector((state) => state.admin.status);
  const error = useSelector((state) => state.admin.error);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchDashboardSummary());
      dispatch(fetchAllPayments());
      dispatch(fetchUser());
    }
  }, [dispatch, status]);

  // Filtrar usuarios por tipo
  const adminUsers = users.filter((user) => user.type === "Admin");
  const clientUsers = users.filter((user) => user.type === "Client");

  return (
    <div>
      <h1>Admin Dashboard</h1>
      {status === "loading" && <p>Loading...</p>}
      {status === "failed" && <p>Error: {error}</p>}
      {status === "succeeded" && (
        <div>
          <h2>Dashboard Summary</h2>
          <p>Approved Orders: {dashboardSummary.approvedOrdersCount}</p>
          <p>Rejected Orders: {dashboardSummary.rejectedOrdersCount}</p>
          <p>Registered Users: {dashboardSummary.registeredUsersCount}</p>

          <h2>Payments</h2>
          {/* Render payments data */}
          {payments.map((payment) => (
            <div key={payment.id}>
              <p>
                {payment.id}: {payment.amount}
              </p>
            </div>
          ))}

          <h2>Admin Users</h2>
          {/* Render admin users */}
          {adminUsers.length > 0 ? (
            adminUsers.map((admin) => (
              <div key={admin.id}>
                <p>
                  {admin.name} {admin.surname}
                </p>
                <p>{admin.email}</p>
              </div>
            ))
          ) : (
            <p>No Admin users found.</p>
          )}

          <h2>Client Users</h2>
          {/* Render client users */}
          {clientUsers.length > 0 ? (
            clientUsers.map((client) => (
              <div key={client.id}>
                <p>
                  {client.name} {client.surname}
                </p>
                <p>{client.email}</p>
              </div>
            ))
          ) : (
            <p>No Client users found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
