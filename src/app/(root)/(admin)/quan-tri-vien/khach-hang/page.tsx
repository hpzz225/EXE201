"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Customer = {
  id: number;
  name: string;
  email: string;
};
const data = {
  data: [
    {
      userId: 2,
      name: "string",
      email: "string@gmail.com",
      password:
        "473287f8298dba7163a897908958f7c0eae733e25d2e027992ea2edc9bed2fa8",
      phone: "string",
      role: "Customer",
      status: "Active",
    },
    {
      userId: 3,
      name: "p",
      email: "p@gmail.com",
      password:
        "473287f8298dba7163a897908958f7c0eae733e25d2e027992ea2edc9bed2fa8",
      phone: "09090909",
      role: "Customer",
      status: "Active",
    },
  ],
  success: true,
  message: "Customers retrieved successfully",
};

const KhachHang = () => {
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch(
          "https://moonwash.azurewebsites.net/api/User/customers",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              // Nếu API yêu cầu token:
              Authorization: `Bearer <eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6IjQiLCJFbWFpbCI6InRob25naHRzZTE3Mjc4N0BmcHQuZWR1LnZuIiwiUGhvbmUiOiIxMjM0NTY3ODkwIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiQWRtaW4iLCJleHAiOjE3MzMxNDE0OTgsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6NTI5NSIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6NTI5NSJ9.8UNnO_Fx8nUS-cZX-Vb0-NqGF1M0rFUSjp6V3q-wcSQ>`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.status}`);
        }

        const data = await response.json();
        setCustomers(data);
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching customers: {error}</div>;
  }
  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold mb-4">Customer List</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customers.map((customer) => (
            <TableRow key={customer.userId}>
              <TableCell>{customer.userId}</TableCell>
              <TableCell>{customer.name}</TableCell>
              <TableCell>{customer.email}</TableCell>
              <TableCell>{customer.phone}</TableCell>
              <TableCell>{customer.role}</TableCell>
              <TableCell>{customer.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default KhachHang;
