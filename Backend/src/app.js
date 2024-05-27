const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

//TO AUTOMATE THE CREATION OF DOCUMENTATION WITH SWAGGER API
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

//Routes:
const userRoutes = require('./api/routes/userRoutes');
const categoryRoutes = require('./api/routes/categoryRoutes');
const roleRoutes = require('./api/routes/appRoleRoutes');
const permissionRoutes = require('./api/routes/permissionRoutes');
const appRolePermissionRoutes = require('./api/routes/appRolePermissionRoutes');
const appUserAppRoleRoutes = require('./api/routes/appUserAppRoleRoutes');

const app = express();
const port = process.env.port || 3001;

app.use(bodyParser.json());
app.use(cors()); // Enable CORS

// Basic Route
app.get('/', (req, res) => {
    res.send('API is running');
});

// Routes
app.use('/', userRoutes);
app.use('/', roleRoutes);
app.use('/', categoryRoutes);
app.use('/', permissionRoutes);
app.use('/', appRolePermissionRoutes);
app.use('/', appUserAppRoleRoutes);


const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'BUDGET APP',
      version: '1.0.0',
      description: 'API Documentation',
    },
    servers: [
        {
          url: `http://localhost:${port}`, 
        },
    ],
  },
  apis: ['./src/api/routes/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.listen(port, () => {
    console.log(`Server runs at http://localhost:${port}`);
});
