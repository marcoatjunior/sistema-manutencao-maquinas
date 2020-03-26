export enum ProfileEnum {
    ADMIN = 'Administrador',
    FUNCIONARIO = 'Funcionário',
    RESPONSAVEL_TECNICO = 'Responsável Técnico',
    VISITANTE = 'Visitante',
}

export function enumSelector(definition) {
    return Object.keys(definition)
        .map(key => ({ value: definition[key], title: key }));
}