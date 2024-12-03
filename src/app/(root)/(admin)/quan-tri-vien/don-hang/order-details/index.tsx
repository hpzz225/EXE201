import React from "react";

// Define TypeScript interfaces for the data
interface OrderInfo {
  orderId: string;
  orderTime: string;
  shipper: string;
  status: string;
}

interface UserInfo {
  name: string;
  phone: string;
  email: string;
}

interface AddressInfo {
  from: string;
  to: string;
}

interface ServiceItem {
  service: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

interface OrderEmailTemplateProps {
  orderInfo: OrderInfo;
  userInfo: UserInfo;
  addressInfo: AddressInfo;
  services: ServiceItem[];
  shippingPrice: number;
}

const getStatusBadgeColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "in transit":
      return "bg-blue-100 text-blue-800";
    case "processing":
      return "bg-yellow-100 text-yellow-800";
    case "completed":
      return "bg-green-100 text-green-800";
    case "cancelled":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const OrderEmailTemplate: React.FC<OrderEmailTemplateProps> = ({
  orderInfo,
  userInfo,
  addressInfo,
  services,
  shippingPrice,
}) => {
  // Calculate total price of services
  const serviceSubtotal = services.reduce(
    (acc, service) => acc + service.totalPrice,
    0
  );
  const totalOrderPrice = serviceSubtotal + shippingPrice;

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 font-sans">
      {/* Top Row with Three Columns */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {/* Order Information */}
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-800 border-b-2 border-blue-500 pb-2 mb-4">
              Order Information
            </h3>
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(
                orderInfo.status
              )}`}
            >
              {orderInfo.status}
            </span>
          </div>
          <div className="space-y-2">
            <div>
              <span className="font-medium text-gray-600">Order ID:</span>
              <span className="ml-2">{orderInfo.orderId}</span>
            </div>
            <div>
              <span className="font-medium text-gray-600">Time Order:</span>
              <span className="ml-2">{orderInfo.orderTime}</span>
            </div>
            <div>
              <span className="font-medium text-gray-600">Shipper:</span>
              <span className="ml-2">{orderInfo.shipper}</span>
            </div>
          </div>
        </div>

        {/* User Information */}
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 border-b-2 border-blue-500 pb-2 mb-4">
            User Information
          </h3>
          <div className="space-y-2">
            <div>
              <span className="font-medium text-gray-600">Name:</span>
              <span className="ml-2">{userInfo.name}</span>
            </div>
            <div>
              <span className="font-medium text-gray-600">Phone:</span>
              <span className="ml-2">{userInfo.phone}</span>
            </div>
            <div>
              <span className="font-medium text-gray-600">Email:</span>
              <span className="ml-2">{userInfo.email}</span>
            </div>
          </div>
        </div>

        {/* Address Information */}
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 border-b-2 border-blue-500 pb-2 mb-4">
            Address Information
          </h3>
          <div className="space-y-2">
            <div>
              <span className="font-medium text-gray-600">From:</span>
              <span className="ml-2">{addressInfo.from}</span>
            </div>
            <div>
              <span className="font-medium text-gray-600">To:</span>
              <span className="ml-2">{addressInfo.to}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Services List */}
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 border-b-2 border-blue-500 pb-2 mb-4">
          Ordered Services
        </h3>
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="py-2">Service</th>
              <th className="py-2">Quantity</th>
              <th className="py-2">Unit Price</th>
              <th className="py-2">Total Price</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service, index) => (
              <tr key={index} className="border-b last:border-b-0">
                <td className="py-2">{service.service}</td>
                <td className="py-2">{service.quantity}</td>
                <td className="py-2">${service.unitPrice.toFixed(2)}</td>
                <td className="py-2">${service.totalPrice.toFixed(2)}</td>
              </tr>
            ))}
            <tr className="font-semibold">
              <td colSpan={3} className="py-2 text-right pr-4">
                Subtotal:
              </td>
              <td className="py-2">${serviceSubtotal.toFixed(2)}</td>
            </tr>
            <tr className="font-semibold">
              <td colSpan={3} className="py-2 text-right pr-4">
                Shipping:
              </td>
              <td className="py-2">${shippingPrice.toFixed(2)}</td>
            </tr>
            <tr className="font-bold bg-gray-100">
              <td colSpan={3} className="py-2 text-right pr-4">
                Total Order Price:
              </td>
              <td className="py-2">${totalOrderPrice.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Example usage with type-safe component
const EmailTemplatePage: React.FC = () => {
  const sampleOrderInfo: OrderInfo = {
    orderId: "#12345",
    orderTime: "2024-11-20 14:30",
    shipper: "Express Delivery",
    status: "In Transit",
  };

  const sampleUserInfo: UserInfo = {
    name: "John Doe",
    phone: "+1 234-567-8900",
    email: "john.doe@example.com",
  };

  const sampleAddressInfo: AddressInfo = {
    from: "123 Sender St, City A, State 12345",
    to: "456 Receiver Ave, City B, State 67890",
  };

  const sampleServices: ServiceItem[] = [
    {
      service: "Basic Service",
      quantity: 2,
      unitPrice: 50.0,
      totalPrice: 100.0,
    },
    {
      service: "Premium Service",
      quantity: 1,
      unitPrice: 75.0,
      totalPrice: 75.0,
    },
  ];

  const shippingPrice = 15.0;

  return (
    <OrderEmailTemplate
      orderInfo={sampleOrderInfo}
      userInfo={sampleUserInfo}
      addressInfo={sampleAddressInfo}
      services={sampleServices}
      shippingPrice={shippingPrice}
    />
  );
};

export default EmailTemplatePage;
