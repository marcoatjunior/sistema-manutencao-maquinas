export enum ActionEnum {
  Criação = "created",
  Atualização = "deleted",
  Exclusão = "updated",
}

export function enumSelector(definition) {
  return Object.keys(definition).map((key) => ({
    value: definition[key],
    key,
  }));
}
