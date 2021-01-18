import { useState, useEffect, useCallback } from 'react';
import { Table, Container, Input, Button, Menu, Icon } from 'semantic-ui-react';
import axios from 'axios';
import ModalDeletePatient from '../ModalDeletePatient/ModalDeletePatient';
import ModalEditPatient from '../ModalEditPatient/ModalEditPatient';
import ModalAddPatient from '../ModalAddPatient/ModalAddPatient';


import "./PanelPatient.scss";

export default function PanelPatient() {

    const [state, setState] = useState([]);
    const [update, setUpdate] = useState(false);

    const [count, setCount] = useState(0);
    const [dataTablePatient, setDataTablePatient] = useState([]);

    const fetchData = useCallback(async () => {
        const uri = "http://localhost:7789/api/pacientes/listar-pacientes";
        try {
            setUpdate(false)
            const  { data } = await axios.get(uri);
            setState(data.data)
            //console.log(data.data)
            //console.log(update)
        } catch (error) {
            console.log(error)
        }
    }, [update])

    const fetchPatient = async (dniPatient) => {
        const uri = "http://localhost:7789/api/pacientes/buscar-paciente";
        try {
            setUpdate(false)
            const  { data } = await axios.post(uri, {_dni: dniPatient} );
            setState(data.data);
            //console.log(data.data)
            console.log(update)
        } catch (error) {
            console.log(error)
        }
    }

    const handleKeyDown =  (e) => {
        if (e.key === 'Enter') {
            console.log(e.target.value);
            fetchPatient(e.target.value)
        }
    }

    const handleAddDataTable = () => {
        if(count<state.length-4){
            setCount(count + 4)
            setDataTablePatient([...state].slice(count, count + 4))
            console.log(count)
        }
    }

    const handleBackDataTable = () => {
        if(count >= 0){
            setCount(count - 4)
            setDataTablePatient([...state].slice(count, count + 4))
            console.log(count)
        }
    }

    useEffect(() => {
        fetchData(); 
    }, [fetchData])

    useEffect(() => {
        setDataTablePatient([...state].slice(count, count + 4));
        console.log(dataTablePatient)
        console.log(count)
        console.log("2do useEffect")
    }, [count, state])

    return(
        <Container>
            <Container>
                    <Input 
                        className="input-container"
                        icon='search'
                        size="small"
                        placeholder='Buscar...' 
                        onKeyDown={handleKeyDown}
                    />
                    <Button 
                        icon
                        primary
                        className="button-container"
                    >
                        <ModalAddPatient updateAddPatient={setUpdate}/>
                    </Button>
            </Container>
            <Container>
                <Table celled className="tabla-paciente">
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Nombre</Table.HeaderCell>
                            <Table.HeaderCell>Edad</Table.HeaderCell>
                            <Table.HeaderCell>Documento</Table.HeaderCell>
                            <Table.HeaderCell>Teléfono</Table.HeaderCell>
                            <Table.HeaderCell>Eliminar / Editar</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {
                            dataTablePatient.map( patient => (
                                <Table.Row key={patient.id_paciente}>
                                    <Table.Cell> 
                                        {patient.nombre} {patient.apellido_paterno} {patient.apellido_materno} 
                                    </Table.Cell>
                                    <Table.Cell> {patient.edad} </Table.Cell>
                                    <Table.Cell>{patient.dni}</Table.Cell>
                                    <Table.Cell>{patient.telefono}</Table.Cell>
                                    <Table.Cell className="edit-delete">
                                        <div>
                                            <Button 
                                                icon
                                                circular
                                                inverted 
                                                color='red'
                                                className="button-container"
                                            >
                                                <ModalDeletePatient pacienteDelete={patient} updateDelete={setUpdate} />
                                            </Button>
                                            <Button 
                                                icon
                                                circular
                                                inverted 
                                                color='yellow'
                                                className="button-container"
                                            >
                                                <ModalEditPatient paciente={patient} updateState={setUpdate}/>
                                            </Button>
                                        </div>
                                    </Table.Cell>
                                </Table.Row>
                            ))
                        }
                    </Table.Body>
                    <Table.Footer>
                        <Table.Row>
                            <Table.HeaderCell colSpan='6'>
                                <Menu floated='right' pagination>
                                    <Menu.Item as='a' icon >
                                        <Button
                                            disabled={
                                                count===0
                                                ? true
                                                : false
                                            }
                                            icon
                                            onClick={handleBackDataTable}
                                        >
                                            <Icon name='chevron left' />
                                        </Button>
                                    </Menu.Item>
                                    <Menu.Item as='a' icon>
                                        <Button
                                            disabled={
                                                count>state.length
                                                ? true
                                                : false
                                            }
                                            icon
                                            onClick={handleAddDataTable}
                                        >
                                            <Icon name='chevron right'/>
                                        </Button>
                                    </Menu.Item>
                                </Menu>
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Footer>
                </Table>
            </Container>
        </Container>
    );
}