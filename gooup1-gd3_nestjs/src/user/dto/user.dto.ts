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

  @IsString()
  @IsEmail()
  @IsNotEmpty({ message: 'email cannot be empty' })
  email: string;
}
