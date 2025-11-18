import { ConflictException, Injectable } from '@nestjs/common';
import { Permission } from './schema/permission.schema';
import { Model } from 'mongoose';
import { PermissionModel } from './model/permission-model';
import { InjectModel } from '@nestjs/mongoose';
import { PermissionUpdateModel } from './model/permission-update-model';

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

	async getPermissions(name: string) {
		const filter = {};
		if (name) {
			filter['name'] = {
				$regex: name,
				$options: 'i',
			};
		}
		return await this.permissionModel.find(filter);
	}

	async updatePermission(permissionUpdateModel: PermissionUpdateModel) {
		const permissionExists = await this.permissionModel.findOne({
			name: permissionUpdateModel.originalName,
		});

		const newPermissionExists = await this.permissionModel.findOne({
			name: permissionUpdateModel.newName,
		});

		if (permissionExists && !newPermissionExists) {
			await permissionExists.updateOne({
				name: permissionUpdateModel.newName,
			});

			return await this.permissionModel.findById(permissionExists._id);
		} else if (!permissionExists) {
			const permission = new PermissionModel();
			permission.name = permissionUpdateModel.originalName;

			return await this.createPermission(permission);
		} else {
			throw new ConflictException('No se puede actualizar el permiso');
		}
	}

	async deletePermission(name: string) {
		const permissionExists = await this.permissionModel.findOne({
			name,
		});

		if (permissionExists) {
			return await permissionExists.deleteOne();
		} else {
			throw new ConflictException('El permiso no existe');
		}
	}
}
