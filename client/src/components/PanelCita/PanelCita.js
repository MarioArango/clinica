import { useState, useEffect, useCallback } from 'react';
import { Table, Button, Container, Input, Menu, Icon } from 'semantic-ui-react';
import ModalAddCita from '../ModalAddCita/ModalAddCita';
import axios from 'axios';

export default function PanelCita() {

    const [state, setState] = useState([]);
    const [updateState, setUpdateState] = useState(false);

    const fetchData = useCallback(async () => {
        const uri = "http://localhost:7789/api/medicos/listar-medicos";
        try {
            setUpdateState(false)
            const  { data } = await axios.get(uri);
            setState(data.data)
            //console.log(data.data)
            console.log(updateState)
        } catch (error) {
            console.log(error)
        }
    }, [updateState])

    useEffect(() => {
        fetchData(); 
    }, [fetchData])

    return(
        <Container>
            <Container>
                    <Button 
                        icon
                        primary
                        className="button-container"
                    >
                        <ModalAddCita addUpdateState={setUpdateState} />
                    </Button>
                    <Menu floated='right' pagination>
                                <Menu.Item as='a' icon>
                                    <Icon name='chevron left' />
                                </Menu.Item>
                                <Menu.Item as='a' icon>
                                    <Icon name='chevron right'/>
                                </Menu.Item>
                            </Menu>
            </Container>
            <Container>
                <Table celled >

                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Lunes</Table.HeaderCell>
                            <Table.HeaderCell>Martes</Table.HeaderCell>
                            <Table.HeaderCell>Miercoles</Table.HeaderCell>
                            <Table.HeaderCell>Jueves</Table.HeaderCell>
                            <Table.HeaderCell>Viernes</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {
                            state.map( doctor => {
                                
                                return (
                                <Table.Row key={doctor.id_medico}>
                                    <Table.Cell> {doctor.nombre} {doctor.apellido_paterno} {doctor.apellido_materno} </Table.Cell>
                                    <Table.Cell> {doctor.edad} </Table.Cell>
                                    <Table.Cell>{doctor.dni}</Table.Cell>
                                    <Table.Cell>{doctor.fecha_ingreso.slice(0,10)}</Table.Cell>
                                    <Table.Cell>{doctor.especialidad}</Table.Cell>
                                </Table.Row>
                            )})
                        }
                    </Table.Body>
                </Table>
            </Container>
        </Container>
    );
}
