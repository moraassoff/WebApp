import express from 'express';
import { getEstudiantes, postEstudiantes, getEstudiante, putEstudiante, deleteEstudiante, deleteEstudianteByCedula } from '../controllers/estudiantesController.js';

const router = express.Router();

// GET /estudiantes
router.get('/', async (request, response) => {
    try {
        const results = await getEstudiantes();
        response.json(results);
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
});

// POST /estudiantes
router.post('/', async (request, response) => {
    try {
        const json = request.body;
        const result = await postEstudiantes(json);
        response.json(result);
    } catch (error) {
        response.status(400).json({ error: error.message });
    }
});

// GET /estudiantes/:cedula
router.get('/:cedula', async (request, response) => {
    try {
        const cedula = request.params.cedula;
        const result = await getEstudiante(cedula);
        if (!result) {
            response.status(404).json({ error: 'Estudiante no encontrado' });
        } else {
            response.json(result);
        }
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
});

// PUT /estudiantes/:id
router.put('/:id', async (request, response) => {
    try {
        const id = request.params.id;
        const json = request.body;
        const result = await putEstudiante(id, json);
        if (result.modifiedCount === 0) {
            response.status(404).json({ error: 'Estudiante no encontrado' });
        } else {
            response.json({ message: 'Estudiante actualizado correctamente' });
        }
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
});

// DELETE /estudiantes/:id
router.delete('/:id', async (request, response) => {
    try {
        const id = request.params.id;
        const result = await deleteEstudiante(id);
        if (result.deletedCount === 0) {
            response.status(404).json({ error: 'Estudiante no encontrado' });
        } else {
            response.json({ message: 'Estudiante eliminado correctamente' });
        }
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
});

// DELETE /estudiantes/cedula/:cedula
router.delete('/cedula/:cedula', async (request, response) => {
    try {
        const cedula = request.params.cedula;
        const result = await deleteEstudianteByCedula(cedula);
        if (result.deletedCount === 0) {
            response.status(404).json({ error: 'Estudiante no encontrado' });
        } else {
            response.json({ message: 'Estudiante eliminado correctamente' });
        }
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
});

export default router;
