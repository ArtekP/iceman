import { Unit } from "../unit-list/unit.model";

export interface Order {
    name: string;
    unit: Unit;
    amount: number;
}