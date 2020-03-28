import { Machine } from '@machines/shared/models/machine.model';
import { pieces } from './pieces';
import { managers } from './managers';
import { File } from '@shared/models/file.model';
import * as moment from 'moment';

export const file: File = {
    id: 1,
    name: 'arquivox.png',
    description: 'Arquivo X',
    createdAt: moment('2020-03-28'),
    type: 'image/png'
}

export const machines: Machine[] = [
    {
        id: 1,
        name: 'PC Lenovo Intel Core i3 teste',
        description: 'PC Lenovo Intel Core i3 7100 3,90 GHz 4 GB HD 500 GB V520s SFF',
        technical: 'Gabinete Small Form Factor Processador Intel Core i3-7100 Clock Máx. 3.9 GHz Cache 3MB Chipset Intel B250 Vpro Não',
        patrimony: '010722',
        reviewPeriod: 30,
        warningPeriod: 10,
        warningEmailAddress: 'enderecoEmail@gmail.com',
        pieces: [ pieces[0], pieces[1] ],
        managers: [ managers[0], managers[1] ],
        files: [file]
    },
    {
        id: 2,
        name: 'NOBREAK 600VA',
        description: 'NOBREAK 600VA NEW SAVE E-BIV/S-115V 4125 PRETO - RAGTECH',
        technical: 'Nobreak Microprocessado com memória Flash interna',
        patrimony: '030391',
        reviewPeriod: 30,
        warningPeriod: 5,
        warningEmailAddress: 'emaildeaviso@gmail.com',
        pieces: [ pieces[0] ],
        managers: [ managers[0] ],
        files: []
    },
    {
        id: 3,
        name: 'Impressora 3D',
        description: 'Impressora 3D à base de plástico.',
        technical: 'Duplo motor, fuso trapezoidal no eixo Z e com sensor de filamento.',
        patrimony: '025824',
        reviewPeriod: 45,
        warningPeriod: 7,
        warningEmailAddress: 'josedevargas@gmail.com',
        pieces: [ pieces[3] ],
        managers: [ managers[1] ],
        files: [file]
    }
];