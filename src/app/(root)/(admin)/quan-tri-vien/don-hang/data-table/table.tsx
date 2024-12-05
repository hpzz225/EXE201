'use client';

import React, { useEffect, useState } from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Edit, MoreHorizontal } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useRouter } from 'next/navigation';
import { getAllOrders } from '@/apiRequest/orderServices';
import { useAuthContext } from '@/context/authContext';
import ServiceCheckoutDialog from '../../../_components/ServiceCheckoutDialog';
import EditOrderDialog from '../../../_components/EditServiceCheckoutDialog';
import SendEmailDialog from '../../../_components/SendEmailDialog';
interface Order {
    orderId: number;
    orderDate: string;
    customerName: string;
    orderStatus: 'PENDING' | 'CONFIRMED' | 'CANCELED';
    customerPhone: string;
    serviceId?: number;
    weight?: number;
}

interface Notification {
    message: string;
    type: 'success' | 'error';
}

const UserManagementTable: React.FC = () => {
    const router = useRouter();
    const { user, token, isAuthenticated } = useAuthContext();
    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [notification, setNotification] = useState<Notification | null>(null);
    const [selectedOrder1, setSelectedOrder1] = useState<Order | null>(null);
    const [selectedOrder2, setSelectedOrder2] = useState<Order | null>(null);
    const [selectedOrder3, setSelectedOrder3] = useState<Order | null>(null);

    const [isServiceCheckoutModalOpen, setIsServiceCheckoutModalOpen] =
        useState(false);
    const [isEditOrderModalOpen, setIsEditOrderModalOpen] = useState(false);
    const [isSendEmailModalOpen, setIsSendEmailModalOpen] = useState(false);

    const statusColors: Record<string, string> = {
        PENDING: 'text-yellow-600',
        CONFIRMED: 'text-green-600',
        CANCELED: 'text-red-600',
    };

    useEffect(() => {
        if (
            !isAuthenticated ||
            (user?.role !== 'Admin' && user?.role !== 'Staff')
        ) {
            router.push('/auth/login');
        } else {
            setIsLoading(false);
        }
    }, [isAuthenticated, user, router]);

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

    const handleServiceCheckout = async (order: Order) => {
        try {
            const { orderId } = order;

            if (!orderId) {
                console.error('Order ID is required');
                return;
            }
            const response = await fetch(
                `https://moonwash.azurewebsites.net/api/ServiceCheckout?orderId=${orderId}`,
                {
                    method: 'POST',
                    headers: {
                        Accept: '*/*',
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        serviceId: order.serviceId,
                        weight: order.weight,
                    }),
                }
            );

            const result = await response.json();

            if (result.success) {
                setNotification({
                    message: 'Service checkout successful',
                    type: 'success',
                });
                fetchOrders();
                setSelectedOrder1(null);
            } else {
                setNotification({
                    message: 'Failed to checkout service',
                    type: 'error',
                });
            }
        } catch (error) {
            console.error('Error submitting service checkout:', error);
            setNotification({
                message: 'Failed to checkout service',
                type: 'error',
            });
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
                                                onSelect={() => {
                                                    setIsServiceCheckoutModalOpen(
                                                        true
                                                    );
                                                    setSelectedOrder1(order);
                                                }}
                                                className="cursor-pointer"
                                            >
                                                <Edit className="mr-2 h-4 w-4" />{' '}
                                                Create Service Checkout
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                onSelect={() => {
                                                    setIsEditOrderModalOpen(
                                                        true
                                                    );
                                                    setSelectedOrder2(order);
                                                }}
                                                className="cursor-pointer"
                                            >
                                                <Edit className="mr-2 h-4 w-4" />{' '}
                                                Edit Order
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                onSelect={() => {
                                                    setIsSendEmailModalOpen(
                                                        true
                                                    );
                                                    setSelectedOrder3(order);
                                                }}
                                            >
                                                Send Email
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <ServiceCheckoutDialog
                open={isServiceCheckoutModalOpen}
                order={selectedOrder1?.orderId ? selectedOrder1 : null}
                onClose={() => setIsServiceCheckoutModalOpen(false)}
                onSubmit={handleServiceCheckout}
                onChange={(updatedOrder) => setSelectedOrder1(updatedOrder)}
            />
            <EditOrderDialog
                open={isEditOrderModalOpen}
                orderId={selectedOrder2?.orderId || 0}
                onClose={() => setIsEditOrderModalOpen(false)}
            />
            <SendEmailDialog
                open={isSendEmailModalOpen}
                orderId={selectedOrder3?.orderId || 0}
                onClose={() => setIsSendEmailModalOpen(false)}
                onSendEmail={(orderId) => {
                    setNotification({
                        message: `Email sent successfully for Order ID: ${orderId}`,
                        type: 'success',
                    });
                    setIsSendEmailModalOpen(false);
                    fetchOrders();
                }}
            />
        </div>
    );
};

export default UserManagementTable;
