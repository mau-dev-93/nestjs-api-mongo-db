import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { PermissionModel } from 'src/modules/permissions/model/permission-model';

export class RoleModel {
	@IsString()
	@IsNotEmpty()
	name!: string;

	@IsArray()
	@IsOptional()
	@Type(() => PermissionModel)
	permissions?: PermissionModel[];
}
