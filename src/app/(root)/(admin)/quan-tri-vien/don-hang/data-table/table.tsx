'use client';
import React, { useEffect, useState } from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Eye, Edit, Trash2, MoreHorizontal } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';

import { getAllOrders } from '@/apiRequest/orderServices';
import { useAuthContext } from '@/context/authContext';

interface Order {
    orderId: number;
    orderDate: string;
    customerName: string;
    orderStatus: 'PENDING' | 'CONFIRMED' | 'CANCELED';
    customerPhone: string;
}

interface Notification {
    message: string;
    type: 'success' | 'error';
}

const UserManagementTable: React.FC = () => {
    const router = useRouter();
    const { user, token, isAuthenticated } = useAuthContext(); // Lấy thông tin người dùng và token từ AuthContext
    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [notification, setNotification] = useState<Notification | null>(null);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    // Define status colors
    const statusColors: Record<string, string> = {
        PENDING: 'text-yellow-600',
        CONFIRMED: 'text-green-600',
        CANCELED: 'text-red-600',
    };

    useEffect(() => {
        if (!isAuthenticated || user?.role !== 'Admin') {
            router.push('/auth/login'); // Redirect to login nếu chưa xác thực hoặc không phải admin
        } else {
            setIsLoading(false);
        }
    }, [isAuthenticated, user, router]);

    // Fetch orders
    const fetchOrders = async () => {
        try {
            const response = await getAllOrders();
            if (response && response.success) {
                setOrders(response.data as Order[]);
            } else {
                setNotification({
                    message: 'Failed to fetch orders',
                    type: 'error',
                });
            }
        } catch (error) {
            console.error('Error fetching orders:', error);
            setNotification({
                message: 'Failed to fetch orders',
                type: 'error',
            });
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleEditOrder = (orderId: number) => {
        const selectedOrder = orders.find((order) => order.orderId === orderId);
        setSelectedOrder(selectedOrder || null);
    };

    const handleSubmitEdit = async () => {
        if (selectedOrder) {
            try {
                const response = await fetch(
                    'https://moonwash.azurewebsites.net/api/ServiceCheckout',
                    {
                        method: 'POST',
                        headers: {
                            Accept: '*/*',
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            serviceId: selectedOrder.orderId, // Use the relevant service ID
                            weight: 0, // Adjust as needed based on your data
                        }),
                    }
                );

                const result = await response.json();
                if (result.success) {
                    setNotification({
                        message: 'Order updated successfully',
                        type: 'success',
                    });
                    fetchOrders(); // Refresh orders
                } else {
                    setNotification({
                        message: 'Failed to update order',
                        type: 'error',
                    });
                }
            } catch (error) {
                console.error('Error submitting edit:', error);
                setNotification({
                    message: 'Failed to update order',
                    type: 'error',
                });
            }
        }
    };

    return (
        <div className="w-full p-4">
            {notification && (
                <div
                    className={`p-4 mb-4 rounded-lg ${
                        notification.type === 'success'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                    }`}
                >
                    {notification.message}
                </div>
            )}

            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr>
                            <th className="p-3 text-left">Order ID</th>
                            <th className="p-3 text-left">Date Orders</th>
                            <th className="p-3 text-left">Customer Name</th>
                            <th className="p-3 text-left">Status</th>
                            <th className="p-3 text-left">Phone</th>
                            <th className="p-3 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-gray-100">
                        {orders.map((order) => (
                            <tr
                                key={order.orderId}
                                className="border-b hover:bg-gray-50"
                            >
                                <td className="p-3">{order.orderId}</td>
                                <td className="p-3">{order.orderDate}</td>
                                <td className="p-3">{order.customerName}</td>
                                <td className="p-3">
                                    <Badge
                                        className={
                                            statusColors[order.orderStatus] ||
                                            'text-gray-600'
                                        }
                                    >
                                        {order.orderStatus}
                                    </Badge>
                                </td>
                                <td className="p-3">{order.customerPhone}</td>
                                <td className="p-3">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button
                                                className={
                                                    statusColors[
                                                        order.orderStatus
                                                    ] || 'text-gray-600'
                                                }
                                            >
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem
                                                onSelect={() =>
                                                    handleEditOrder(
                                                        order.orderId
                                                    )
                                                }
                                                className="cursor-pointer"
                                            >
                                                <Eye className="mr-2 h-4 w-4" />{' '}
                                                View Details
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <Dialog
                                                    open={!!selectedOrder}
                                                    onOpenChange={() =>
                                                        setSelectedOrder(null)
                                                    }
                                                >
                                                    <DialogTrigger asChild>
                                                        <Edit className="mr-2 h-4 w-4" />{' '}
                                                        Edit
                                                    </DialogTrigger>
                                                    <DialogContent>
                                                        <DialogTitle>
                                                            Edit Order
                                                        </DialogTitle>
                                                        <div>
                                                            {/* Display and edit order fields here */}
                                                            <Button
                                                                onClick={
                                                                    handleSubmitEdit
                                                                }
                                                            >
                                                                Submit Edit
                                                            </Button>
                                                        </div>
                                                    </DialogContent>
                                                </Dialog>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className="text-red-600 cursor-pointer">
                                                <Trash2 className="mr-2 h-4 w-4" />{' '}
                                                Delete
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserManagementTable;
