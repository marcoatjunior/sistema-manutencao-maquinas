import { Role } from './role.model';

export interface User {
    id?: number;
    name?: string;
    email?: string;
    password?: string;
    profile?: Role;
    token?: string;
}