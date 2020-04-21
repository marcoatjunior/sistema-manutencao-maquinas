import { Piece } from "@pieces/shared/piece.model";
import { Manager } from "@managers/shared/manager.model";
import { File } from "@shared/models/file.model";

export interface Machine {
  id?: number;
  name?: string;
  description?: string;
  technical?: string;
  patrimony?: string;
  review_period?: number;
  warning_period?: number;
  pieces?: Piece[];
  users?: Manager[];
  files?: File[];
}
