export interface OrderModel {
    id: string;
    name: string;
    quantity: number;
    price: number;
}

export interface OrdersModel {
    orders: OrderModel[]
}
