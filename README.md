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

## API: Permissions

El módulo **Permissions** permite gestionar permisos en la base de datos. Incluye las siguientes rutas:

- `GET /permissions` - Listar todos los permisos
- `GET /permissions/:id` - Obtener un permiso por ID
- `POST /permissions` - Crear un nuevo permiso
- `PUT /permissions/:id` - Actualizar un permiso
- `DELETE /permissions/:id` - Eliminar un permiso

### Ejemplo de modelo

```typescript
// src/modules/permissions/model/permission-model.ts
export class Permission {
	readonly name: string;
	readonly description: string;
}
```

### Ejemplo de esquema

```typescript
// src/modules/permissions/schema/permission.schema.ts
import { Schema } from 'mongoose';

export const PermissionSchema = new Schema({
	name: { type: String, required: true },
	description: { type: String },
});
```

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
