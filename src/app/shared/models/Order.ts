import { LatLng } from "leaflet";
import { CartItem } from "./CartItem";

export class Order {
    id!: number;
    items!: CartItem[];
    totalPrice!: number;
    name!: string;
    address!: string;
    // To Store the Address Latitude and Longitude from Leaflet
    addressLatLng?:LatLng
    paymentId!: string;
    createdAt!: string;
    status!: string;
}
