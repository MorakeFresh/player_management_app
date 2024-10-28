import {Position} from "@/lib/models/position";

export interface Player {
    id: string;
    name: string;
    shirtNumber: string;
    position: Position[];
}