import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { RolesService } from './roles.service';
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RoleModel } from './model/role-model';
import { PermissionModel } from '../permissions/model/permission-model';

@Controller('/api/v1/roles')
@ApiTags('Roles')
export class RolesController {
	constructor(private rolesService: RolesService) {}

	@Post()
	@ApiOperation({
		description: 'Crea un nuevo rol',
	})
	@ApiBody({
		description: 'Crea un rol usando el modelo RoleModel',
		type: RoleModel,
		examples: {
			ejemplo1: {
				value: {
					name: 'superadmin',
				},
			},
			ejemplo2: {
				value: {
					name: 'admin',
					permissions: [{ name: 'CREATE' }, { name: 'DELETE' }],
				},
			},
		},
	})
	@ApiResponse({
		status: 201,
		description: 'Rol creado correctamente',
	})
	@ApiResponse({
		status: 409,
		description: 'Rol no existe. <br/> El permiso no existe.',
	})
	async createRole(@Body() role: RoleModel) {
		return await this.rolesService.createRole(role);
	}

	@Get()
	@ApiOperation({
		description: 'Obtiene una lista de roles',
	})
	@ApiQuery({
		description: 'Obtiene los roles filtrados por nombre',
		type: String,
		required: false,
		name: 'name',
	})
	@ApiResponse({
		status: 200,
		description: 'Roles obtenidos correctamente',
	})
	async getRoles(@Query('name') name: string) {
		return await this.rolesService.getRoles(name);
	}

	@Put('/:name')
	@ApiOperation({
		description: 'Actualiza un rol existente',
	})
	@ApiParam({
		name: 'name',
		description: 'Nombre del rol a actualizar',
		required: true,
		type: String,
	})
	@ApiBody({
		description: 'Actualiza un rol usando el modelo RoleModel',
		type: RoleModel,
		examples: {
			ejemplo1: {
				value: {
					name: 'superadmin',
				},
			},
			ejemplo2: {
				value: {
					name: 'admin',
					permissions: [{ name: 'CREATE' }],
				},
			},
		},
	})
	@ApiResponse({
		status: 200,
		description: 'Rol actualizado correctamente',
	})
	async updateRole(@Param('name') name: string, @Body() role: RoleModel) {
		return await this.rolesService.updateRole(name, role);
	}

	@ApiOperation({
		description: 'Agrega un permiso a un rol existente',
	})
	@ApiParam({
		name: 'name',
		description: 'Nombre del rol a agregar el permiso',
		required: true,
		type: String,
	})
	@ApiResponse({
		status: 200,
		description: 'Permiso agregado correctamente',
	})
	@Patch('/add-permission/:name')
	async addPermission(@Param('name') name: string, @Body() permission: PermissionModel) {
		return this.rolesService.addPermission(name, permission);
	}

	@ApiOperation({
		description: 'Remueve un permiso de un rol existente',
	})
	@ApiParam({
		name: 'name',
		description: 'Nombre del rol a eliminar el permiso',
		required: true,
		type: String,
	})
	@ApiResponse({
		status: 200,
		description: 'Permiso removido correctamente',
	})
	@Delete('/remove-permission/:name')
	async removePermission(@Param('name') name: string, @Body() permission: PermissionModel) {
		return this.rolesService.removePermission(name, permission);
	}

	@ApiOperation({
		description: 'Elimina un rol existente',
	})
	@ApiParam({
		name: 'name',
		description: 'Nombre del rol a eliminar',
		required: true,
		type: String,
	})
	@ApiResponse({
		status: 200,
		description: 'Rol eliminado correctamente',
	})
	@Delete('/:name')
	async deleteRole(@Param('name') name: string) {
		return this.rolesService.removeRole(name);
	}
}
