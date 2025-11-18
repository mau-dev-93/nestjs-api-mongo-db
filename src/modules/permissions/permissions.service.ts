import { ConflictException, Injectable } from '@nestjs/common';
import { Permission } from './schema/permission.schema';
import { Model } from 'mongoose';
import { PermissionModel } from './model/permission-model';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PermissionsService {
	constructor(
		@InjectModel(Permission.name)
		private permissionModel: Model<Permission>,
	) {}

	async createPermission(permission: PermissionModel) {
		const permissionExists = await this.permissionModel.findOne({
			name: permission.name,
		});

		if (permissionExists) {
			throw new ConflictException('El permiso con el nombre ya existe');
		}

		const newPermission = new this.permissionModel(permission);
		return newPermission.save();
	}

	async getPermissions() {
		return await this.permissionModel.find();
	}
}
