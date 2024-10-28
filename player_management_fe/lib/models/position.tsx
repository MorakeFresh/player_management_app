import {Role} from "@/lib/models/role";

export interface Position {
    name: string;
    description: string;
    roles: Role[];
}