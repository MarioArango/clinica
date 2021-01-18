import { useState } from 'react';
import axios from "axios";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, Header, Icon, Modal, Form, Dropdown} from 'semantic-ui-react';
import { DateInput } from 'semantic-ui-calendar-react';

const ModalAddDoctor = ({ addUpdateState }) => {

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
            _especialidad: ""
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
            const uri = "http://localhost:7789/api/medicos/agregar-medico";
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
                formik.values._especialidad = "";
                addUpdateState(true);
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
            <Header icon='user md' content='Agregar Médico' />
            <Modal.Content>
                <Form onSubmit={formik.handleSubmit} >
                    <Form.Input icon='search' placeholder='Paciente...' />
                    <Form.Input icon='search' placeholder='Médico...' />
                    <Dropdown placeholder='Especialidad' search selection fluid />
                    <DateInput 
                        type="text" 
                        placeholder=""
                        name="_edad"
                        value={formik.values._edad}
                        onChange={formik.handleChange}
                        error={formik.errors._edad}
                    />
                    <DateInput 
                        type="text" 
                        placeholder="DNI"
                        name="_dni"
                        value={formik.values._dni}
                        onChange={formik.handleChange}
                        error={formik.errors._dni}
                    />
                    <Button type="submit" primary className="btn-submit">
                        Grabar
                    </Button>
                </Form>
            </Modal.Content>
        </Modal>    
    );
}

export default ModalAddDoctor;