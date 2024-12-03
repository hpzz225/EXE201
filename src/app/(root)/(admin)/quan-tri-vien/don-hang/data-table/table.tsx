// 'use client';
// import React, { useEffect, useState } from 'react';
// import {
//     DropdownMenu,
//     DropdownMenuContent,
//     DropdownMenuItem,
//     DropdownMenuTrigger,
// } from '@/components/ui/dropdown-menu';
// import { Button } from '@/components/ui/button';
// import { Eye, Edit, Trash2, MoreHorizontal } from 'lucide-react';
// import { Badge } from '@/components/ui/badge';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import {
//     Dialog,
//     DialogContent,
//     DialogTitle,
//     DialogTrigger,
// } from '@/components/ui/dialog';

// import { getAllOrders } from '@/apiRequest/orderServices';
// import { useAuthContext } from '@/context/authContext';

// interface Order {
//     orderId: number;
//     orderDate: string;
//     customerName: string;
//     orderStatus: 'PENDING' | 'CONFIRMED' | 'CANCELED';
//     customerPhone: string;
//     serviceId?: number;
//     weight?: number;
// }

// interface Notification {
//     message: string;
//     type: 'success' | 'error';
// }

// const UserManagementTable: React.FC = () => {
//     const router = useRouter();
//     const { user, token, isAuthenticated } = useAuthContext();
//     const [orders, setOrders] = useState<Order[]>([]);
//     const [isLoading, setIsLoading] = useState(true);
//     const [notification, setNotification] = useState<Notification | null>(null);
//     const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

//     const statusColors: Record<string, string> = {
//         PENDING: 'text-yellow-600',
//         CONFIRMED: 'text-green-600',
//         CANCELED: 'text-red-600',
//     };

//     useEffect(() => {
//         if (!isAuthenticated || user?.role !== 'Admin') {
//             router.push('/auth/login');
//         } else {
//             setIsLoading(false);
//         }
//     }, [isAuthenticated, user, router]);

//     const fetchOrders = async () => {
//         try {
//             const response = await getAllOrders();
//             if (response && response.success) {
//                 setOrders(response.data as Order[]);
//             } else {
//                 setNotification({
//                     message: 'Failed to fetch orders',
//                     type: 'error',
//                 });
//             }
//         } catch (error) {
//             console.error('Error fetching orders:', error);
//             setNotification({
//                 message: 'Failed to fetch orders',
//                 type: 'error',
//             });
//         }
//     };

//     useEffect(() => {
//         fetchOrders();
//     }, []);

//     const handleEditOrder = (orderId: number) => {
//         const order = orders.find((order) => order.orderId === orderId);
//         setSelectedOrder(order || null);
//     };

//     const handleSubmitEdit = async () => {
//         if (selectedOrder) {
//             try {
//                 const response = await fetch(
//                     'https://moonwash.azurewebsites.net/api/ServiceCheckout',
//                     {
//                         method: 'POST',
//                         headers: {
//                             Accept: '*/*',
//                             Authorization: `Bearer ${token}`,
//                             'Content-Type': 'application/json',
//                         },
//                         body: JSON.stringify({
//                             orderId: selectedOrder.orderId,
//                             serviceId: selectedOrder.serviceId,
//                             weight: selectedOrder.weight,
//                         }),
//                     }
//                 );

//                 const result = await response.json();
//                 if (result.success) {
//                     setNotification({
//                         message: 'Order updated successfully',
//                         type: 'success',
//                     });
//                     fetchOrders(); // Refresh orders
//                     setSelectedOrder(null); // Close modal after update
//                 } else {
//                     setNotification({
//                         message: 'Failed to update order',
//                         type: 'error',
//                     });
//                 }
//             } catch (error) {
//                 console.error('Error submitting edit:', error);
//                 setNotification({
//                     message: 'Failed to update order',
//                     type: 'error',
//                 });
//             }
//         }
//     };

//     return (
//         <div className="w-full p-4">
//             {notification && (
//                 <div
//                     className={`p-4 mb-4 rounded-lg ${
//                         notification.type === 'success'
//                             ? 'bg-green-100 text-green-800'
//                             : 'bg-red-100 text-red-800'
//                     }`}
//                 >
//                     {notification.message}
//                 </div>
//             )}

//             <div className="overflow-x-auto">
//                 <table className="w-full border-collapse">
//                     <thead>
//                         <tr>
//                             <th className="p-3 text-left">Order ID</th>
//                             <th className="p-3 text-left">Date Orders</th>
//                             <th className="p-3 text-left">Customer Name</th>
//                             <th className="p-3 text-left">Status</th>
//                             <th className="p-3 text-left">Phone</th>
//                             <th className="p-3 text-left">Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody className="bg-gray-100">
//                         {orders.map((order) => (
//                             <tr
//                                 key={order.orderId}
//                                 className="border-b hover:bg-gray-50"
//                             >
//                                 <td className="p-3">{order.orderId}</td>
//                                 <td className="p-3">{order.orderDate}</td>
//                                 <td className="p-3">{order.customerName}</td>
//                                 <td className="p-3">
//                                     <Badge
//                                         className={
//                                             statusColors[order.orderStatus] ||
//                                             'text-gray-600'
//                                         }
//                                     >
//                                         {order.orderStatus}
//                                     </Badge>
//                                 </td>
//                                 <td className="p-3">{order.customerPhone}</td>
//                                 <td className="p-3">
//                                     <DropdownMenu>
//                                         <DropdownMenuTrigger asChild>
//                                             <Button
//                                                 className={
//                                                     statusColors[
//                                                         order.orderStatus
//                                                     ] || 'text-gray-600'
//                                                 }
//                                             >
//                                                 <MoreHorizontal className="h-4 w-4" />
//                                             </Button>
//                                         </DropdownMenuTrigger>
//                                         <DropdownMenuContent align="end">
//                                             <DropdownMenuItem
//                                                 onSelect={() =>
//                                                     handleEditOrder(
//                                                         order.orderId
//                                                     )
//                                                 }
//                                                 className="cursor-pointer"
//                                             >
//                                                 <Edit className="mr-2 h-4 w-4" />{' '}
//                                                 Edit
//                                             </DropdownMenuItem>
//                                         </DropdownMenuContent>
//                                     </DropdownMenu>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>

//             {/* Modal for editing order */}
//             <Dialog
//                 open={!!selectedOrder}
//                 onOpenChange={() => setSelectedOrder(null)}
//             >
//                 <DialogContent>
//                     <DialogTitle>Edit Order</DialogTitle>
//                     {selectedOrder && (
//                         <div className="space-y-4">
//                             <div>
//                                 <label className="block text-sm">
//                                     Order ID
//                                 </label>
//                                 <input
//                                     type="text"
//                                     value={selectedOrder.orderId}
//                                     disabled
//                                     className="w-full border p-2"
//                                 />
//                             </div>
//                             <div>
//                                 <label className="block text-sm">
//                                     Service ID
//                                 </label>
//                                 <input
//                                     type="number"
//                                     value={selectedOrder.serviceId || ''}
//                                     onChange={(e) =>
//                                         setSelectedOrder({
//                                             ...selectedOrder,
//                                             serviceId: Number(e.target.value),
//                                         })
//                                     }
//                                     className="w-full border p-2"
//                                 />
//                             </div>
//                             <div>
//                                 <label className="block text-sm">Weight</label>
//                                 <input
//                                     type="number"
//                                     value={selectedOrder.weight || ''}
//                                     onChange={(e) =>
//                                         setSelectedOrder({
//                                             ...selectedOrder,
//                                             weight: Number(e.target.value),
//                                         })
//                                     }
//                                     className="w-full border p-2"
//                                 />
//                             </div>
//                             <Button onClick={handleSubmitEdit}>
//                                 Submit Edit
//                             </Button>
//                         </div>
//                     )}
//                 </DialogContent>
//             </Dialog>
//         </div>
//     );
// };

// export default UserManagementTable;
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
import EditOrderDialog from '../../../_components/EditOrderDialog';

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
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

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

    const handleSubmitEdit = async (order: Order) => {
        try {
            const { orderId } = order;
            console.log(order.serviceId);
            console.log(order.weight);

            // Kiểm tra nếu orderId không tồn tại
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
            console.log(result);

            if (result.success) {
                setNotification({
                    message: 'Order updated successfully',
                    type: 'success',
                });
                fetchOrders(); // Refresh orders
                setSelectedOrder(null); // Close modal after update
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
                                                    setSelectedOrder(order)
                                                }
                                                className="cursor-pointer"
                                            >
                                                <Edit className="mr-2 h-4 w-4" />{' '}
                                                Edit
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <EditOrderDialog
                open={!!selectedOrder}
                order={selectedOrder}
                onClose={() => setSelectedOrder(null)}
                onSubmit={handleSubmitEdit}
                onChange={(updatedOrder) => setSelectedOrder(updatedOrder)}
            />
        </div>
    );
};

export default UserManagementTable;
