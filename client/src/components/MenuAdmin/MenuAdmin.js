import { useState } from 'react';
import PanelDoctor from '../PanelDoctor/PanelDoctor';
import PanelPatient from '../PanelPatient/PanelPatient';
import PanelCita from '../PanelCita/PanelCita';
import { Container, Menu} from 'semantic-ui-react';

import './MenuAdmin.scss';

export default function MenuAdmin() {

    const [view, setView] = useState({comp: ""});

    return (
        <Container className="menu-admin" fluid>
            <Menu vertical>
                <Menu.Item onClick={() => setView({comp: "Dashboard"})}>Dashboard</Menu.Item>
                <Menu.Item onClick={() => setView({comp: "Pacientes"})}>Paciente</Menu.Item>
                <Menu.Item onClick={() => setView({comp: "Citas"})}>Citas</Menu.Item>
                <Menu.Item onClick={() => setView({comp: "Médicos"})}>Medicos</Menu.Item>
            </Menu>
            <Container className="container-panel">
                <Container className="container-link">
                    <h3 className="link-panel" >{view.comp}</h3>
                </Container>
                <Container>
                    {
                        view.comp==="Dashboard" && <h1>Dashboard</h1>
                    }
                    {
                        view.comp==="Pacientes" && <PanelPatient/>
                    }
                    {
                        view.comp==="Citas" && <PanelCita/>
                    }
                    {
                        view.comp==="Médicos" && <PanelDoctor/>
                    }
                </Container>
            </Container>
        </Container>
    )
}
