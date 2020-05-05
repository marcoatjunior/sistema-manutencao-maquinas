export enum ActionEnum {
  ALTERACAO = 0,
  CRIACAO = 1,
  MANUTENCAO = 2,
}

export function enumSelector(definition) {
  return Object.keys(definition).map((key) => ({
    value: definition[key],
    title: key,
  }));
}
