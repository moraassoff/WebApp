// estudiantes.js
async function fetchEstudiantes() {
    const response = await fetch('/api/estudiantes');
    const estudiantes = await response.json();
    return estudiantes;
}

async function addEstudiante(estudiante) {
    const response = await fetch('/api/estudiantes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(estudiante)
    });
    const nuevoEstudiante = await response.json();
    return nuevoEstudiante;
}

async function updateEstudiante(id, estudiante) {
    const response = await fetch(`/api/estudiantes/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(estudiante)
    });
    const estudianteActualizado = await response.json();
    return estudianteActualizado;
}

async function deleteEstudiante(id) {
    await fetch(`/api/estudiantes/${id}`, {
        method: 'DELETE'
    });
}
