# NestJS API + MongoDB

Este proyecto es una API REST construida con [NestJS](https://nestjs.com/) y [MongoDB](https://www.mongodb.com/) usando [Mongoose](https://mongoosejs.com/) como ODM. Actualmente, la API expone el módulo **Permissions**, pero está diseñada para crecer y agregar más funcionalidades en el futuro.

## Requisitos

- Node.js >= 18.x
- MongoDB (local o en la nube)

## Instalación

1. Clona el repositorio:
    ```bash
    git clone <URL-del-repositorio>
    cd nestjs-api-mongo-db
    ```
2. Instala las dependencias:
    ```bash
    npm install
    ```
3. Configura las variables de entorno:
    - Copia el archivo de ejemplo y edítalo según tu entorno:
        ```bash
        cp env/development.env env/production.env
        ```
    - Edita `env/development.env` y agrega tu URI de MongoDB:
        ```env
        MONGODB_URI=mongodb://localhost:27017/mi_basededatos
        ```

## Configuración de Mongoose

La conexión a MongoDB se realiza usando Mongoose. La configuración se encuentra en `src/config/config.ts` y se utiliza en el módulo principal (`app.module.ts`).

```typescript
// src/config/config.ts
export default () => ({
	mongodbUri: process.env.MONGODB_URI,
});
```

```typescript
// src/app.module.ts
import { MongooseModule } from '@nestjs/mongoose';
import config from './config/config';

@Module({
	imports: [
		MongooseModule.forRoot(config().mongodbUri),
		// ...otros módulos
	],
	// ...
})
export class AppModule {}
```


## API: Roles y Permisos

El proyecto cuenta con dos módulos principales: **Roles** y **Permissions**. Ambos están integrados y permiten gestionar la seguridad y acceso en la aplicación.

### Permissions

Permite crear, consultar y actualizar permisos en la base de datos.

#### Endpoints principales

- `POST /api/v1/permissions` - Crear un nuevo permiso
- `GET /api/v1/permissions` - Listar permisos (filtro opcional por nombre)
- `PUT /api/v1/permissions` - Actualizar un permiso (requiere modelo de actualización)
- `DELETE /api/v1/permissions/:id` - Eliminar un permiso por ID

#### Modelo

```typescript
// src/modules/permissions/model/permission-model.ts
export class PermissionModel {
    name: string;
}
```

#### Esquema

```typescript
// src/modules/permissions/schema/permission.schema.ts
@Schema()
export class Permission {
    @Prop({ unique: true, uppercase: true, required: true, trim: true })
    name: string;
}
```

### Roles

Permite crear roles y asociarles permisos existentes. Los roles pueden ser consultados y actualizados, y cada rol puede tener múltiples permisos.

#### Endpoints principales

- `POST /api/v1/roles` - Crear un nuevo rol (con permisos opcionales)
- `GET /api/v1/roles` - Listar roles (filtro opcional por nombre)
- `PUT /api/v1/roles/:name` - Actualizar un rol por nombre
- `DELETE /api/v1/roles/:name` - Eliminar un rol por nombre

#### Modelo

```typescript
// src/modules/roles/model/role-model.ts
export class RoleModel {
    name: string;
    permissions?: PermissionModel[];
}
```

#### Esquema

```typescript
// src/modules/roles/schemas/role.schema.ts
@Schema()
export class Role {
    @Prop({ unique: true, uppercase: true, trim: true })
    name: string;

    @Prop({ type: [Types.ObjectId], ref: 'Permission', default: [] })
    permissions: Types.ObjectId[];
}
```

#### Ejemplo de creación de rol con permisos

```json
POST /api/v1/roles
{
    "name": "admin",
    "permissions": [
        { "name": "CREATE" },
        { "name": "DELETE" }
    ]
}
```

## Relación entre Roles y Permisos

Los roles pueden tener múltiples permisos asociados. Al crear o actualizar un rol, se validan los permisos para asegurar que existan en la base de datos.

## Ejecución y pruebas

Para iniciar el proyecto en modo desarrollo:

```bash
npm run start:dev
```

Para ejecutar las pruebas:

```bash
npm run test
```

## Notas

- Este README se irá actualizando conforme se agreguen nuevos módulos y funcionalidades a la API.
- Para sugerencias o reportes de errores, crea un issue en el repositorio.

## Ejecución

Para iniciar el proyecto en modo desarrollo:

```bash
npm run start:dev
```

La API estará disponible en `http://localhost:3000`.

## Pruebas

Para ejecutar las pruebas:

```bash
npm run test
```

## Notas

- Este README se irá actualizando conforme se agreguen nuevos módulos y funcionalidades a la API.
- Para sugerencias o reportes de errores, crea un issue en el repositorio.

---

**Autor:** Mauricio
