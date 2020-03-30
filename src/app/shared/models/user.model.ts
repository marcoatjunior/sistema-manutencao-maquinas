import { Profile } from './profile.model';

export interface User {
    id?: number;
    name?: string;
    username?: string;
    email?: string;
    password?: string;
    profile?: Profile;
    token?: string;
}