export enum ActionEnum {
    ALTERACAO = "Alteração",
    CRIACAO = "Criação",
    MANUTENCAO = "Manutenção"
}

export function enumSelector(definition) {
    return Object.keys(definition)
        .map(key => ({ value: definition[key], title: key }));
}