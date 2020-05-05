export enum ActionEnum {
  Criação = "created",
  Atualização = "updated",
  Exclusão = "deleted",
}

export function enumSelector(definition) {
  return Object.keys(definition).map((key) => ({
    value: definition[key],
    key,
  }));
}
