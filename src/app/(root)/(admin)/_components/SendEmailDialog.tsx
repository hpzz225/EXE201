import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitle,
} from '@/components/ui/dialog';

interface SendEmailDialogProps {
    open: boolean;
    orderId: number;
    onClose: () => void;
    onSendEmail: (orderId: number) => void;
}

const SendEmailDialog: React.FC<SendEmailDialogProps> = ({
    open,
    orderId,
    onClose,
    onSendEmail,
}) => {
    const [services, setServices] = useState<any[]>([]);
    const [isSending, setIsSending] = useState(false);
    const [emailSent, setEmailSent] = useState(false);

    // useEffect(() => {
    const fetchServices = async (orderId: number) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(
                `https://moonwash.azurewebsites.net/api/ServiceCheckout/OrderId/${orderId}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.ok) {
                const data = await response.json();
                console.log('API Response from SendEmailDialog:', data);
                setServices(data.data.services || []);
            } else {
                console.error('Failed to fetch services for the order');
            }
        } catch (error) {
            console.error('Error fetching services:', error);
        }
    };

    // if (orderId) {
    //     fetchServices();
    // }
    // }, [orderId]);
    useEffect(() => {
        if (open) {
            fetchServices(orderId);
        }
    }, [open, orderId]);
    // Handle send email functionality
    const handleSendEmail = async () => {
        // Validate service data before sending the email
        const isValid = services.every(
            (service) => service.weight && service.totalPricePerService
        );

        if (!isValid) {
            alert(
                'Please ensure all services have valid weight and total price before sending the email.'
            );
            return;
        }

        setIsSending(true);
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(
                `https://moonwash.azurewebsites.net/api/Order/Confirm-email?orderId=${orderId}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.ok) {
                const data = await response.json();
                if (data.success) {
                    setEmailSent(true); // Email sent successfully
                    onSendEmail(orderId);
                } else {
                    alert(data.message || 'Failed to send email');
                }
            } else {
                console.error('Failed to send email');
            }
        } catch (error) {
            console.error('Error sending email:', error);
        } finally {
            setIsSending(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Send Email Notification</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <p>Order ID: {orderId}</p>
                    <h3 className="text-lg font-semibold">Services:</h3>
                    <div className="max-h-60 overflow-y-auto">
                        {services.length > 0 ? (
                            <ul className="list-disc pl-5">
                                {services.map((service, index) => (
                                    <li key={index} className="mb-4">
                                        <strong>
                                            ServiceCheckoutID:{' '}
                                            {service.serviceCheckoutId}
                                        </strong>
                                        <p>Service Name: {service.name}</p>
                                        <p>Weight: {service.weight}</p>
                                        <p>
                                            Total Price:{' '}
                                            {service.totalPricePerService}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No services found for this order.</p>
                        )}
                    </div>
                    {emailSent && (
                        <p className="text-green-500">
                            Email sent successfully!
                        </p>
                    )}
                </div>
                <DialogFooter>
                    <Button variant="secondary" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button
                        variant="default"
                        onClick={handleSendEmail}
                        disabled={isSending}
                    >
                        {isSending ? 'Sending...' : 'Send Email'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default SendEmailDialog;
