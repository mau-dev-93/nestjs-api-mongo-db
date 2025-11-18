import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PermissionsService } from './permissions.service';
import { PermissionModel } from './model/permission-model';

@Controller('/api/v1/permissions')
@ApiTags('Permissions')
export class PermissionsController {
	constructor(private permissionsService: PermissionsService) {}

	@Post()
	async createPermission(@Body() permission: PermissionModel) {
		return await this.permissionsService.createPermission(permission);
	}

	@Get()
	async getPermissions() {
		return await this.permissionsService.getPermissions();
	}
}
