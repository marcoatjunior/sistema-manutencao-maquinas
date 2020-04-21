import { PipeTransform, Pipe } from "@angular/core";
import { Role } from "@shared/models";

@Pipe({
  name: "rolePipe",
})
export class RolePipe implements PipeTransform {
  transform(values: Role[]) {
    if (values) {
      return values.map((role) => role.name).join(", ");
    }
    return null;
  }
}
