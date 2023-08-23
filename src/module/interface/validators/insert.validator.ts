import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  MinLength
} from "class-validator";

export class InsertValidator {
  // Design patern: Decorator

  @IsUUID()
  @IsNotEmpty({ message: "Guid must not be empty" })
  @IsString({ message: "Must be a string" })
  @MinLength(10, { message: "Guid is too short" })
  productId: string;

  @IsNumber()
  price: number;

  @IsNumber()
  quantity: number;
}
