// script.js
document.addEventListener('DOMContentLoaded', async () => {
    const estudianteForm = document.getElementById('estudiante-form');
    const estudiantesTable = document.getElementById('estudiantes-table').querySelector('tbody');
    const cancelBtn = document.getElementById('cancel-btn');
    let isEditing = false;
    let editEstudianteId = null;

    const renderEstudiantes = async () => {
        estudiantesTable.innerHTML = '';
        const estudiantes = await fetchEstudiantes();
        estudiantes.forEach(estudiante => {
            const row = estudiantesTable.insertRow();
            row.innerHTML = `
                <td>${estudiante.cedula}</td>
                <td>${estudiante.nombre}</td>
                <td>${estudiante.apellido}</td>
                <td>${estudiante.email}</td>
                <td>${estudiante.edad}</td>
                <td>
                    <button onclick="editEstudiante('${estudiante._id}')">Editar</button>
                    <button onclick="removeEstudiante('${estudiante._id}')">Eliminar</button>
                </td>
            `;
        });
    };

    const clearForm = () => {
        estudianteForm.reset();
        isEditing = false;
        editEstudianteId = null;
        cancelBtn.style.display = 'none';
        document.getElementById('form-title').innerText = 'Agregar Estudiante';
    };

    estudianteForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const estudiante = {
            cedula: document.getElementById('cedula').value,
            nombre: document.getElementById('nombre').value,
            apellido: document.getElementById('apellido').value,
            email: document.getElementById('email').value,
            edad: parseInt(document.getElementById('edad').value)
        };

        if (isEditing) {
            await updateEstudiante(editEstudianteId, estudiante);
        } else {
            await addEstudiante(estudiante);
        }

        await renderEstudiantes();
        clearForm();
    });

    cancelBtn.addEventListener('click', clearForm);

    window.editEstudiante = async (id) => {
        const estudiante = (await fetchEstudiantes()).find(e => e._id === id);
        document.getElementById('cedula').value = estudiante.cedula;
        document.getElementById('nombre').value = estudiante.nombre;
        document.getElementById('apellido').value = estudiante.apellido;
        document.getElementById('email').value = estudiante.email;
        document.getElementById('edad').value = estudiante.edad;
        isEditing = true;
        editEstudianteId = id;
        cancelBtn.style.display = 'inline';
        document.getElementById('form-title').innerText = 'Editar Estudiante';
    };

    window.removeEstudiante = async (id) => {
        await deleteEstudiante(id);
        await renderEstudiantes();
    };

    await renderEstudiantes();
});
