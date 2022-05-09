import { Unit } from "./unit.model";

export interface Order {
    name: string;
    unit: Unit;
    amount: number;
}
