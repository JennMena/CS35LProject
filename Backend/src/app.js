const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

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
app.use(cors());

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

app.listen(port, () => {
    console.log(`Server runs at http://localhost:${port}`);
});
