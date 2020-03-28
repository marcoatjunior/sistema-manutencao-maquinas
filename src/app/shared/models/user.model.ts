import { Profile } from './profile.model';

export interface User {
    id?: number;
    name?: string;
    username?: string;
    email?: string;
    password?: string;
    profile?: Profile;
    telephone?: string;
    additional?: string;
    token?: string;
}