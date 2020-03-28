export enum ReviewTypeEnum {
    PREVENTIVA = 'Preventiva',
    CORRETIVA = 'Corretiva'
}

export function enumSelector(definition) {
    return Object.keys(definition)
        .map(key => ({ value: definition[key], title: key }));
}