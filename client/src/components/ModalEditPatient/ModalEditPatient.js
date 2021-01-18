import { useState } from 'react';
import axios from "axios";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, Header, Icon, Modal, Form} from 'semantic-ui-react';
const ModalEditPatient = ({ paciente, updateState }) => {

    const [open, setOpen] = useState(false);

    const formik = useFormik({
        initialValues: {
            _nombre: paciente.nombre,
            _apellido_paterno: paciente.apellido_paterno,
            _apellido_materno: paciente.apellido_materno,
            _edad: paciente.edad,
            _dni: paciente.dni,
            _telefono: paciente.telefono
        },
        validationSchema: Yup.object({
            _nombre: Yup.string().required(true),
            _apellido_paterno: Yup.string().required(true),
            _apellido_materno: Yup.string().required(true),
            _edad: Yup.number().required(true),
            _dni: Yup.number().required(true),
            _telefono: Yup.string().required(true),
        }),
        onSubmit: async (dataForm) => {
            const uri = "http://localhost:7789/api/pacientes/actualizar-paciente";
            const updatePaciente = { 
                _id_medico: paciente.id_paciente, 
                _id_persona: paciente.id_persona, 
                ...dataForm
            }
            try {               
                const { data } = await axios.put(uri, updatePaciente);
                console.log(dataForm);
                console.log(data)
                setOpen(false);
                updateState(true);
            } catch (error) {
                console.log(error.message)
            }
        }
    });

    return (
        <Modal
            closeIcon
            open={open}
            trigger={<Icon name="edit"/>}
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            size="mini"
        >
            <Header icon='user circle' content='Editar Paciente' />
            <Modal.Content>
                <Form onSubmit={formik.handleSubmit} >
                    <Form.Input 
                        type="text" 
                        placeholder={paciente.nombre} 
                        name="_nombre"
                        value={formik.values._nombre}
                        onChange={formik.handleChange}
                        error={formik.errors._nombre}
                    />
                    <Form.Input 
                        type="text" 
                        placeholder={paciente.apellido_paterno} 
                        name="_apellido_paterno"
                        value={formik.values._apellido_paterno}
                        onChange={formik.handleChange}
                        error={formik.errors._apellido_paterno}
                    />
                    <Form.Input 
                        type="text" 
                        placeholder={paciente.apellido_materno} 
                        name="_apellido_materno"
                        value={formik.values._apellido_materno}
                        onChange={formik.handleChange}
                        error={formik.errors._apellido_materno}
                    />
                    <Form.Input 
                        type="text" 
                        placeholder={paciente.edad} 
                        name="_edad"
                        value={formik.values._edad}
                        onChange={formik.handleChange}
                        error={formik.errors._edad}
                    />
                    <Form.Input 
                        type="text" 
                        placeholder={paciente.dni} 
                        name="_dni"
                        value={formik.values._dni}
                        onChange={formik.handleChange}
                        error={formik.errors._dni}
                    />
                    <Form.Input 
                        type="text" 
                        placeholder={paciente.telefono} 
                        name="_telefono"
                        value={formik.values._telefono}
                        onChange={formik.handleChange}
                        error={formik.errors._telefono}
                    />
                    <Button type="submit" primary className="btn-submit">
                        Actualizar
                    </Button>
                </Form>
            </Modal.Content>
        </Modal>    
    );  
}

export default ModalEditPatient;
