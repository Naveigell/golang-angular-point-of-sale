import * as OrderActions from './order.action';
import { OrdersModel } from './order.model';

export type Action = OrderActions.All;

const initialState: OrdersModel = {
    orders: []
}

export function orderReducer(state: OrdersModel = initialState, action: Action){
    switch (action.type) {
        case OrderActions.ADD_ORDER:
            state.orders.push(action.payload);
            break;
        case OrderActions.REMOVE_ORDER:
            state.orders.splice(action.payload, 1);
            break;
        case OrderActions.CLEAR_ORDER:
            state.orders = [];
            break;
    }

    return { ...grouping(state) };
}

function grouping(data: OrdersModel): OrdersModel {
    for (const [index1, order1] of data.orders.entries()) {
        for (const [index2, order2] of data.orders.entries()) {
            if (order1.id === order2.id && index1 !== index2) {
                order1.quantity = Number(order1.quantity);
                order1.quantity += order2.quantity;
                data.orders.splice(index2, 1);
            }
        }
    }

    return data;
}
