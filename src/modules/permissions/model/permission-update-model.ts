import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class PermissionUpdateModel {
	@ApiProperty({
		name: 'originalName',
		type: String,
		description: 'Nombre del permiso a actualizar',
		required: true,
	})
	@IsString()
	@IsNotEmpty()
	originalName: string;

	@ApiProperty({
		name: 'newName',
		type: String,
		description: 'Nuevo nombre del permiso a actualizar',
		required: true,
	})
	@IsString()
	@IsNotEmpty()
	newName: string;
}
