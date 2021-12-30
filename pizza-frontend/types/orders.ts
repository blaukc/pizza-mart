export interface OrderStatus {
    id: string
    orders: Array<Array<string | number>>
    address: string
    postal_code: string
    contact_number: string
    preparing: boolean
    delivering: boolean
    received: boolean
}

export interface Order {
    item: Item;
    quantity: number;
}

export interface Item {
    pizza: Pizza;
    size: string;
}

export interface Pizza {
    id: number
    pizza_name: string
    price: string
    description: string
    image: string
    inStock: boolean
    category: string
    allergyTags: string
}
