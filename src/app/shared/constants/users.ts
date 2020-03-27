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
        telephone: '(51) 99340-5550',
        additional: 'Não há informações adicionais',
        profile
    },
    {
        id: 2,
        name: 'Ricardo Kovalski',
        username: 'ricardo.kovalski',
        email: 'ricardokovalskicruz@gmail.com',
        password: 'teste',
        telephone: '(51) 99720-5007',
        additional: 'Não há informações adicionais',
        profile
    }
];