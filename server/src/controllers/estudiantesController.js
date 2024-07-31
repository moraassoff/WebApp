import e from 'express';
import { createEstudiante, fetchEstudiante, updateEstudiante, removeEstudiante, fetchEstudiantes } from '../repositories/estudiantesRepository.js';

// const fetchEstudiantes = require('../repositories/estudiantesRepository.js');
// get => fetch
// post => create
// put => update
// delete => remove



export const getEstudiantes = async () => {
    return await fetchEstudiantes();
}

export const postEstudiantes = async (estudiante) => {
    if (!estudiante.cedula) {
        throw new Error('La cédula es requerida');
    }

    const createdEstudiante = await createEstudiante(estudiante);
    const result = {
        id: createdEstudiante.insertedId
    };
    return result;
}

export const getEstudiante = async (cedula) => {
    return await fetchEstudiante(cedula);
}

export const putEstudiante = async (id, estudiante) => {
    const result = await updateEstudiante(id, estudiante);
    return result;
}

export const deleteEstudiante = async (id) => {
    const result = await removeEstudiante(id);
    return result;
}

export const deleteEstudianteByCedula = async (cedula) => {
    const estudiante = await fetchEstudiante(cedula);
    if (!estudiante) {
        throw new Error('Estudiante no encontrado');
    }
    const result = await removeEstudiante(estudiante._id);
    return result;
}
