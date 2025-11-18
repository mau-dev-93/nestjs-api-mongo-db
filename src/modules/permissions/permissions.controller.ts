import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PermissionsService } from './permissions.service';
import { PermissionModel } from './model/permission-model';
import { PermissionUpdateModel } from './model/permission-update-model';

@Controller('/api/v1/permissions')
@ApiTags('Permissions')
export class PermissionsController {
	constructor(private permissionsService: PermissionsService) {}

	@Post()
	@ApiOperation({
		description: 'Crea un nuevo permiso',
	})
	@ApiBody({
		description: 'Crea un permiso usando el modelo PermissionModel',
		type: PermissionModel,
		examples: {
			ejemplo1: {
				value: {
					name: 'CREATE',
				},
			},
			ejemplo2: {
				value: {
					name: 'DELETE',
				},
			},
		},
	})
	@ApiResponse({
		status: 201,
		description: 'Permiso creado correctamente',
	})
	@ApiResponse({
		status: 409,
		description: 'Permiso ya existe',
	})
	async createPermission(@Body() permission: PermissionModel) {
		return await this.permissionsService.createPermission(permission);
	}

	@Get()
	@ApiOperation({
		description: 'Obtiene una lista de permisos',
	})
	@ApiQuery({
		description: 'Nombre de los permisos a buscar (opcional)',
		type: String,
		required: false,
		name: 'name',
	})
	@ApiResponse({
		status: 200,
		description: 'Lista de permisos obtenida correctamente',
	})
	async getPermissions(@Query('name') name: string) {
		return await this.permissionsService.getPermissions(name);
	}

	@Put()
	@ApiOperation({
		description: 'Actualiza un permiso existente',
	})
	@ApiBody({
		description: 'Actualiza un permiso usando el modelo PermissionUpdateModel',
		type: PermissionUpdateModel,
		examples: {
			ejemplo1: {
				value: {
					originalName: 'CREATE',
					newName: 'DELETE',
				},
			},
			ejemplo2: {
				value: {
					originalName: 'DELETE',
					newName: 'UPDATE',
				},
			},
		},
	})
	@ApiResponse({
		status: 200,
		description: 'Permiso actualizado correctamente',
	})
	@ApiResponse({
		status: 409,
		description: 'Conflicto al actualizar el permiso',
	})
	async updatePermission(@Body() permissionUpdateModel: PermissionUpdateModel) {
		return await this.permissionsService.updatePermission(permissionUpdateModel);
	}

	@Delete('/:name')
	@ApiOperation({
		description: 'Elimina un permiso existente',
	})
	@ApiParam({
		description: 'Nombre del permiso a eliminar',
		type: String,
		name: 'name',
		required: true,
	})
	@ApiResponse({
		status: 200,
		description: 'Permiso eliminado correctamente',
	})
	@ApiResponse({
		status: 409,
		description: 'El permiso no existe',
	})
	async deletePermission(@Param('name') name: string) {
		return await this.permissionsService.deletePermission(name);
	}
}
