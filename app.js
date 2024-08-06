import express from 'express';
import estudiantesRoutes from './server/src/routes/estudiantesRouter.js';
import { connect } from './database.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use('/estudiantes', estudiantesRoutes);

const PORT = process.env.PORT || 3000;

connect().then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch(err => {
    console.error('Failed to connect to MongoDB', err);
});