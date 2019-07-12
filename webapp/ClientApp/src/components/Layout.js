import React from 'react';
import {
    Container
} from 'reactstrap';

import NavMenu from './BackEnd/NavMenu';

export default props => (
    <React.Fragment>
        <NavMenu />
        <Container>
            {props.children}
        </Container>
    </React.Fragment>
);