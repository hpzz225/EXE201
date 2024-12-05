import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Order, Service } from '@/types'; // Import the shared Order type

interface ServiceCheckoutDialogProps {
    open: boolean;
    order: Order | null;
    onClose: () => void;
    onSubmit: (order: Order) => Promise<void>;
    onChange: (updatedOrder: Order) => void;
}

const ServiceCheckoutDialog: React.FC<ServiceCheckoutDialogProps> = ({
    open,
    order,
    onClose,
    onSubmit,
    onChange,
}) => {
    const [services, setServices] = useState<Service[]>([]); // Add services definition
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchServices = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await fetch(
                    'https://moonwash.azurewebsites.net/api/Service?page=1&pageSize=10'
                );
                const data = await response.json();
                if (data && data.success) {
                    setServices(data.data.listData);
                } else {
                    setError('Failed to fetch services');
                }
            } catch (err) {
                setError('Error fetching services');
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchServices();
    }, []);

    if (!order) return null;

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogTitle>Edit Order</DialogTitle>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm">Order ID</label>
                        <input
                            type="text"
                            value={order.orderId}
                            disabled
                            className="w-full border p-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm">Service</label>
                        {isLoading ? (
                            <p>Loading services...</p>
                        ) : error ? (
                            <p className="text-red-500">{error}</p>
                        ) : (
                            <select
                                value={order.serviceId || ''}
                                onChange={(e) =>
                                    onChange({
                                        ...order,
                                        serviceId: Number(e.target.value),
                                    })
                                }
                                className="w-full border p-2"
                            >
                                <option value="" disabled>
                                    Select a service
                                </option>
                                {services.map((service) => (
                                    <option
                                        key={service.serviceId}
                                        value={service.serviceId}
                                    >
                                        {service.name}
                                    </option>
                                ))}
                            </select>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm">Weight</label>
                        <input
                            type="number"
                            value={order.weight || ''}
                            onChange={(e) =>
                                onChange({
                                    ...order,
                                    weight: Number(e.target.value),
                                })
                            }
                            className="w-full border p-2"
                        />
                    </div>
                    <Button onClick={() => onSubmit(order)}>Submit Edit</Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ServiceCheckoutDialog;
