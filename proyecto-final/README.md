# App TodoList
Proyecto final para la certificación de JS avanzado

## Requerimientos principales
- Node >= v18.18.2 https://nodejs.org/en/download/
- Npm >= v9.8.1 https://nodejs.org/en/download/
- MongoDB >= v7.0 https://www.mongodb.com/try/download/community
- Git Bash https://git-scm.com/download/win

## API Postman publicada
https://documenter.getpostman.com/view/3683906/2s9YsNdAJc

## Pasos para correr el backend en local
```shell
# En la terminal de gitbash, ubicarse en la carpeta raiz y ejecutar
cd proyecto-final/backend
cp .env.example .env # Hacer una copia de las variables de entorno
npm install
npm run start
```

## Pasos para correr el frontend en local
```shell
# En la terminal de gitbash, ubicarse en la carpeta raiz y ejecutar
cd proyecto-final/frontend/app-todolist
cp .env.example .env # Hacer una copia de las variables de entorno
npm install
npm run dev
```

## Nota
- El nombre de la base de datos es: **dbtodo**
- Las colecciones utilizadas son : **dbtodo.users** y **dbtodo.todolists**
- La duración del JWT es de 8 horas
- Completar las configuraciones faltantes en el .env copiado
- Verificar que el frontend esté ejecutandose en el puerto 5173 -> http://localhost:5173/
- Verificar que el backend esté ejecutandose en el puerto 3000 ->  http://localhost:3000/