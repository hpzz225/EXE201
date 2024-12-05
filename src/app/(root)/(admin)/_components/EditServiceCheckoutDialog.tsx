import React, { useEffect, useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface EditOrderDialogProps {
    open: boolean;
    orderId: number;
    onClose: () => void;
}

interface Service {
    name: string;
    orderId: number;
    serviceCheckoutId: number;
    serviceId: number;
    totalPricePerService: number;
    weight: number;
}

const EditOrderDialog: React.FC<EditOrderDialogProps> = ({
    open,
    orderId,
    onClose,
}) => {
    const [services, setServices] = useState<Service[]>([]);
    const [updatedWeights, setUpdatedWeights] = useState<
        Record<number, number>
    >({});

    const callEditOrderApi = async (orderId: number) => {
        try {
            const response = await fetch(
                `https://moonwash.azurewebsites.net/api/ServiceCheckout/OrderId/${orderId}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem(
                            'token'
                        )}`,
                    },
                }
            );

            if (response.ok) {
                const data = await response.json();
                console.log('API Response:', data);
                setServices(data.data.services || []); // Update state with the fetched services
            } else {
                console.error('API Error:', response.statusText);
            }
        } catch (error) {
            console.error('API Call Failed:', error);
        }
    };

    const handleWeightChange = (
        serviceCheckoutId: number,
        newWeight: number
    ) => {
        setUpdatedWeights((prevWeights) => ({
            ...prevWeights,
            [serviceCheckoutId]: newWeight,
        }));
    };

    const saveChanges = async () => {
        // Loop through each service and send a PUT request for each updated weight
        for (const [serviceCheckoutId, newWeight] of Object.entries(
            updatedWeights
        )) {
            try {
                const response = await fetch(
                    `https://moonwash.azurewebsites.net/api/ServiceCheckout/UpdateClothWeight/${serviceCheckoutId}&&${newWeight}`,
                    {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${localStorage.getItem(
                                'token'
                            )}`,
                        },
                    }
                );

                if (response.ok) {
                    const data = await response.json();
                    console.log('Weight updated successfully:', data);
                    // Update local services array with the new weight
                    setServices((prevServices) =>
                        prevServices.map((service) =>
                            service.serviceCheckoutId ===
                            Number(serviceCheckoutId)
                                ? { ...service, weight: newWeight }
                                : service
                        )
                    );
                } else {
                    console.error('API Error:', response.statusText);
                }
            } catch (error) {
                console.error('API Call Failed:', error);
            }
        }

        onClose(); // Close the dialog after saving
    };

    useEffect(() => {
        if (open) {
            callEditOrderApi(orderId);
        }
    }, [open, orderId]); // Run the effect when the dialog opens or orderId changes

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Edit Order</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <p>Editing details for order ID: {orderId}</p>
                    <div>
                        <h3 className="text-lg font-semibold">Services:</h3>
                        {services.length > 0 ? (
                            <ul className="list-disc pl-5">
                                {services.map((service, index) => (
                                    <li key={index} className="mb-4">
                                        <strong>
                                            ServiceCheckoutID:{' '}
                                            {service.serviceCheckoutId}
                                        </strong>
                                        <p>{service.name}</p>
                                        <p>Service ID: {service.serviceId}</p>
                                        <p>
                                            Total Price:{' '}
                                            {service.totalPricePerService}
                                        </p>
                                        <div>
                                            <label className="block">
                                                Weight:
                                            </label>
                                            <input
                                                type="number"
                                                value={
                                                    updatedWeights[
                                                        service
                                                            .serviceCheckoutId
                                                    ] ?? service.weight
                                                }
                                                onChange={(e) =>
                                                    handleWeightChange(
                                                        service.serviceCheckoutId,
                                                        parseFloat(
                                                            e.target.value
                                                        )
                                                    )
                                                }
                                                className="border p-2 rounded w-full"
                                            />
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No services found for this order.</p>
                        )}
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="secondary" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button variant={'default'} onClick={saveChanges}>
                        Save Changes
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default EditOrderDialog;
