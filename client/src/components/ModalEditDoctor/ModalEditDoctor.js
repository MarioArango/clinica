import { useState } from 'react';
import axios from "axios";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, Header, Icon, Modal, Form} from 'semantic-ui-react';

const ModalEditDoctor = ({ medico, updateState }) => {

    const [open, setOpen] = useState(false);

    const formik = useFormik({
        initialValues: {
            _nombre: medico.nombre,
            _apellido_paterno: medico.apellido_paterno,
            _apellido_materno: medico.apellido_materno,
            _edad: medico.edad,
            _dni: medico.dni,
            _especialidad: medico.especialidad
        },
        validationSchema: Yup.object({
            _nombre: Yup.string().required(true),
            _apellido_paterno: Yup.string().required(true),
            _apellido_materno: Yup.string().required(true),
            _edad: Yup.number().required(true),
            _dni: Yup.number().required(true),
            _especialidad: Yup.string().required(true),
        }),
        onSubmit: async (dataForm) => {
            const uri = "http://localhost:7789/api/medicos/actualizar-medico";
            const updateMedico = { 
                _id_medico: medico.id_medico, 
                _id_persona: medico.id_persona, 
                ...dataForm
            }
            try {               
                const { data } = await axios.put(uri, updateMedico);
                //console.log(dataForm);
                //console.log(data)
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
            <Header icon='user md' content='Editar Médico' />
            <Modal.Content>
                <Form onSubmit={formik.handleSubmit} >
                    <Form.Input 
                        type="text" 
                        placeholder={medico.nombre} 
                        name="_nombre"
                        value={formik.values._nombre}
                        onChange={formik.handleChange}
                        error={formik.errors._nombre}
                    />
                    <Form.Input 
                        type="text" 
                        placeholder={medico.apellido_paterno} 
                        name="_apellido_paterno"
                        value={formik.values._apellido_paterno}
                        onChange={formik.handleChange}
                        error={formik.errors._apellido_paterno}
                    />
                    <Form.Input 
                        type="text" 
                        placeholder={medico.apellido_materno} 
                        name="_apellido_materno"
                        value={formik.values._apellido_materno}
                        onChange={formik.handleChange}
                        error={formik.errors._apellido_materno}
                    />
                    <Form.Input 
                        type="text" 
                        placeholder={medico.edad} 
                        name="_edad"
                        value={formik.values._edad}
                        onChange={formik.handleChange}
                        error={formik.errors._edad}
                    />
                    <Form.Input 
                        type="text" 
                        placeholder={medico.dni} 
                        name="_dni"
                        value={formik.values._dni}
                        onChange={formik.handleChange}
                        error={formik.errors._dni}
                    />
                    <Form.Input 
                        type="text" 
                        placeholder={medico.especialidad} 
                        name="_especialidad"
                        value={formik.values._especialidad}
                        onChange={formik.handleChange}
                        error={formik.errors._especialidad}
                    />
                    <Button type="submit" primary className="btn-submit">
                        Actualizar
                    </Button>
                </Form>
            </Modal.Content>
        </Modal>    
    );
}

export default ModalEditDoctor;