import { useState, useEffect, useCallback } from 'react';
import { Table, Button, Container, Input, Menu, Icon } from 'semantic-ui-react';

import ModalDeleteDoctor from '../ModalDeleteDoctor/ModalDeleteDoctor';
import ModalEditDoctor from '../ModalEditDoctor/ModalEditDoctor';
import ModalAddDoctor from '../ModalAddDoctor/ModalAddDoctor';
import axios from 'axios';

import "./PanelDoctor.scss";

export default function PanelDoctor() {

    const [state, setState] = useState([]);
    const [updateState, setUpdateState] = useState(false);

    const [counter, setCounter] = useState(0);
    const [dataTable, setDataTable] = useState([]);

    const fetchData = useCallback(async () => {
        const uri = "http://localhost:7789/api/medicos/listar-medicos";
        try {
            setUpdateState(false)
            const  { data } = await axios.get(uri);
            setState(data.data)
            console.log(data.data)
        } catch (error) {
            console.log(error)
        }
    }, [updateState])

    const fetchDoctor = async (dniDoctor) => {
        const uri = "http://localhost:7789/api/medicos/buscar-medico";
        try {
            setUpdateState(false)
            const  { data } = await axios.post(uri, {_dni: dniDoctor} );
            setState(data.data);
            //console.log(data.data)
            console.log(updateState)
        } catch (error) {
            console.log(error)
        }
    }

    const handleKeyDown =  (e) => {
        if (e.key === 'Enter') {
            console.log(e.target.value);
            fetchDoctor(e.target.value)
        }
    }

    const handleAddDataTable = () => {
        if(counter<state.length-4){
            setCounter(counter + 4)
            setDataTable([...state].slice(counter, counter + 4))
            console.log(counter)
        }
    }

    const handleBackDataTable = () => {
        if(counter >= 0){
            setCounter(counter - 4)
            setDataTable([...state].slice(counter, counter + 4))
            console.log(counter)
        }
    }

    useEffect(() => {
        fetchData(); 
    }, [fetchData])

    useEffect(() => {
        setDataTable([...state].slice(counter, counter + 4));
        console.log(dataTable)
        console.log(counter)
        console.log("2do useEffect")
    }, [counter, state])

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
                        <ModalAddDoctor addUpdateState={setUpdateState} />
                    </Button>
            </Container>
            <Container>
                <Table celled >
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Nombre</Table.HeaderCell>
                            <Table.HeaderCell>Edad</Table.HeaderCell>
                            <Table.HeaderCell>Documento</Table.HeaderCell>
                            <Table.HeaderCell>Ingreso</Table.HeaderCell>
                            <Table.HeaderCell>Especialidad</Table.HeaderCell>
                            <Table.HeaderCell>Eliminar / Editar</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {
                            dataTable.map( doctor => {
                                
                                return (
                                <Table.Row key={doctor.id_medico}>
                                    <Table.Cell> {doctor.nombre} {doctor.apellido_paterno} {doctor.apellido_materno} </Table.Cell>
                                    <Table.Cell> {doctor.edad} </Table.Cell>
                                    <Table.Cell>{doctor.dni}</Table.Cell>
                                    <Table.Cell>
                                        {doctor.fecha_ingreso.slice(0,10)}
                                    </Table.Cell>
                                    <Table.Cell>{doctor.especialidad}</Table.Cell>
                                    <Table.Cell>
                                        <div>
                                            <Button 
                                                icon
                                                circular
                                                inverted 
                                                color='red'
                                                className="button-container"
                                            >
                                                <ModalDeleteDoctor doctor={doctor} updateRemove={setUpdateState} />
                                            </Button>
                                            <Button 
                                                icon
                                                circular
                                                inverted 
                                                color='yellow'
                                                className="button-container"
                                            >
                                                <ModalEditDoctor medico={doctor} updateState={setUpdateState}/>
                                            </Button>
                                        </div>
                                    </Table.Cell>
                                </Table.Row>
                            )})
                        }
                    </Table.Body>
                    <Table.Footer>
                        <Table.Row>
                            <Table.HeaderCell colSpan='6'>
                                <Menu floated='right' pagination>
                                    <Menu.Item as='a' icon >
                                        <Button
                                            disabled={
                                                counter===0
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
                                                counter>state.length
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
