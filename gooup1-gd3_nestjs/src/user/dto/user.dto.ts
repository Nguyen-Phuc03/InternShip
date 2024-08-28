import {
  IsString,
  IsOptional,
  IsInt,
  MinLength,
  IsEmail,
  IsNotEmpty,
} from 'class-validator';

export class UserDto {
  @IsOptional()
  @IsInt()
  @IsNotEmpty({ message: 'id_users cannot be empty' })
  id_users?: number;

  @IsString()
  @MinLength(1)
  @IsOptional()
  @IsNotEmpty({ message: 'Name cannot be empty' })
  name: string;

  @IsInt()
  @IsNotEmpty({ message: 'phone cannot be empty' })
  phone: number;

  @IsString()
  @MinLength(1)
  @IsNotEmpty({ message: 'address cannot be empty' })
  address: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty({ message: 'email cannot be empty' })
  email: string;
}
