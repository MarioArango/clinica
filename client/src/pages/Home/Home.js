import MenuAdmin from "../../components/MenuAdmin/MenuAdmin";
import { Container, Image } from 'semantic-ui-react';

import './Home.scss';

function Home() {
  return (
    <Container fluid className="app-container">
      <Container classname="menu-home">
        <h1>Evaluacion</h1>
        <Image src='/images/wireframe/image.png' size='mini' />
      </Container>
      <MenuAdmin/>
    </Container>
  );
}

export default Home;
