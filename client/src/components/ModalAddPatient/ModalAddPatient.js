import { useState } from 'react';
import axios from "axios";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, Header, Icon, Modal, Form} from 'semantic-ui-react';

const ModalAddPatient = ({ updateAddPatient }) => {

    const [open, setOpen] = useState(false);

    const dateNow = () => {
        const date = new Date();
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        if(month < 10){
            return `${year}-0${month}-${day}`;
        }else{
            return `${year}-${month}-${day}`;
        }
    }

    const formik = useFormik({
        initialValues: {
            _nombre: "",
            _apellido_paterno: "",
            _apellido_materno: "",
            _edad: "",
            _dni: "",
            _telefono: ""
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
            const uri = "http://localhost:7789/api/pacientes/agregar-paciente";
            const addMedico = { 
                    ...dataForm,
                    _fecha_ingreso: dateNow()
                }  
            try {             
                const { data } = await axios.post(uri, addMedico);
                //console.log(dataForm)
                //console.log(data)
                //console.log(addMedico)
                formik.values._nombre = "";
                formik.values._apellido_paterno = "";
                formik.values._apellido_materno = "";
                formik.values._edad = "";
                formik.values._dni = "";
                formik.values._telefono = "";
                updateAddPatient(true);
                setOpen(false);
            } catch (error) {
                alert("DNI en uso")
            }
        }
    });

    return (
        <Modal
            closeIcon
            open={open}
            trigger={<Icon name="add user"/>}
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            size="mini"
        >
            <Header icon='user' content='Agregar Paciente' />
            <Modal.Content>
                <Form onSubmit={formik.handleSubmit} >
                    <Form.Input 
                        type="text" 
                        placeholder="Nombre" 
                        name="_nombre"
                        value={formik.values._nombre}
                        onChange={formik.handleChange}
                        error={formik.errors._nombre}
                    />
                    <Form.Input 
                        type="text" 
                        placeholder="Apellido paterno" 
                        name="_apellido_paterno"
                        value={formik.values._apellido_paterno}
                        onChange={formik.handleChange}
                        error={formik.errors._apellido_paterno}
                    />
                    <Form.Input 
                        type="text" 
                        placeholder="Apellido materno" 
                        name="_apellido_materno"
                        value={formik.values._apellido_materno}
                        onChange={formik.handleChange}
                        error={formik.errors._apellido_materno}
                    />
                    <Form.Input 
                        type="text" 
                        placeholder="Edad"
                        name="_edad"
                        value={formik.values._edad}
                        onChange={formik.handleChange}
                        error={formik.errors._edad}
                    />
                    <Form.Input 
                        type="text" 
                        placeholder="DNI"
                        name="_dni"
                        value={formik.values._dni}
                        onChange={formik.handleChange}
                        error={formik.errors._dni}
                    />
                    <Form.Input 
                        type="text" 
                        placeholder="Telefono"
                        name="_telefono"
                        value={formik.values._telefono}
                        onChange={formik.handleChange}
                        error={formik.errors._telefono}
                    />
                    <Button type="submit" primary className="btn-submit">
                        Agregar
                    </Button>
                </Form>
            </Modal.Content>
        </Modal>    
    );
}

export default ModalAddPatient;