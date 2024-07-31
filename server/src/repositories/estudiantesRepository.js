import { collection } from './database.js';

export const fetchEstudiantes = async () => {
    const estudiantes = await collection('estudiantes');
    const results = await estudiantes.find().toArray();
    return results;
}

export const createEstudiante = async (estudiante) => {
    const estudiantes = await collection('estudiantes');
    const result = await estudiantes.insertOne(estudiante);
    return result;
}

export const fetchEstudiante = async (cedula) => {
    const estudiantes = await collection('estudiantes');
    const result = await estudiantes.findOne({ cedula: cedula });
    return result;
}

export const updateEstudiante = async (id, estudiante) => {
    const estudiantes = await collection('estudiantes');
    const filter = { _id: id };
    const updateDoc = {
        $set: {
            ...estudiante
        },
    };
    const result = await estudiantes.updateOne(filter, updateDoc);
    return result;
}

export const removeEstudiante = async (id) => {
    const estudiantes = await collection('estudiantes');
    const filter = { _id: id };
    const result = await estudiantes.deleteOne(filter);
    return result;
}
