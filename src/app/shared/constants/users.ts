import { User } from '@shared/models';
import { Profile } from '@shared/models/profile';

const profile: Profile = { name: 'Administrador' };

export const users: User[] = [
    {
        id: 1,
        name: 'Marco Taborda',
        username: 'marco.taborda',
        email: 'marcotaborda.jr@gmail.com',
        password: 'teste',
        profile
    },
    {
        id: 2,
        name: 'Ricardo Kovalski',
        username: 'ricardo.kovalski',
        email: 'ricardokovalskicruz@gmail.com',
        password: 'teste',
        profile
    }
];