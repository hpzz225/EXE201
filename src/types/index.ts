export interface Service {
    serviceId: number;
    name: string;
    description: string;
    serviceCategoryId: number;
    clothUnit: string;
    price: number;
    serviceStatus: string;
    imageURL: string;
}
export type Product = {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
};
