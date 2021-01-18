import { useState } from 'react';
import axios from 'axios';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';

export default function ModalDeleteDoctor({ doctor, updateRemove }) {

    const [open, setOpen] = useState(false);

    const handleDelete = async () => {
        const idPersona = doctor.id_persona;
        const uri = `http://localhost:7789/api/medicos/eliminar-medico/${idPersona}`;
        try {
            const  { data } = await axios.delete(uri);
            updateRemove(true)
            //console.log(data.data)
            //console.log(updateRemove)
            setOpen(false)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Modal
            basic
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            size='mini'
            trigger={<Icon name="user delete"/>}
        >
            <Header icon>
                <Icon name='archive' />
                Eliminar usuario
            </Header>
            <Modal.Content>
                    <p>Esta seguro que desea eliminar al doctor</p>
                    <h4>{ doctor.nombre } { doctor.apellido_paterno } { doctor.apellido_materno }</h4>
            </Modal.Content>
            <Modal.Actions>
                <Button basic color='red' inverted onClick={() => setOpen(false)}>
                    <Icon name='remove' /> No
                </Button>
                <Button color='green' inverted onClick={handleDelete}>
                    <Icon name='checkmark' /> Sí
                </Button>
            </Modal.Actions>
        </Modal>
    )
}
