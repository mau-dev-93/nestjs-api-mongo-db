import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { RolesService } from './roles.service';
import { ApiTags } from '@nestjs/swagger';
import { RoleModel } from './model/role-model';

@Controller('/api/v1/roles')
@ApiTags('Roles')
export class RolesController {
	constructor(private rolesService: RolesService) {}

	@Post()
	async createRole(@Body() role: RoleModel) {
		return await this.rolesService.createRole(role);
	}

	@Get()
	async getRoles(@Query('name') name: string) {
		return await this.rolesService.getRoles(name);
	}

	@Put('/:name')
	async updateRole(@Param('name') name: string, @Body() role: RoleModel) {
		return await this.rolesService.updateRole(name, role);
	}
}
