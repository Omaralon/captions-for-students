import React from 'react';

import { withRouter } from 'react-router-dom';

import teacherMale from '../../../assets/steve.jpg';
import teacherFemale from '../../../assets/molly.png';

import { Card, Button, Image } from 'semantic-ui-react';

const StudentItem = ({ history, match, location, ...personalProps }) => {
    const onCardClick = () => {
        history.push(match.path + '/' + personalProps.uid);
    };

    const {
        name,
        lastName,
        email,
        studentId,
        gender,
        campus,
        faculty,
        ...otherPersonalProps
    } = personalProps;

    return (
        <Card id="fonts">
            <Card.Content>
                <Image
                    floated="right"
                    size="mini"
                    src={gender === 'Masculino' ? teacherMale : teacherFemale}
                />
                <Card.Header id="fonts">{name + ' ' + lastName}</Card.Header>
                <Card.Meta>{email}</Card.Meta>
                <Card.Description>
                    <strong>{campus}</strong>
                    <p>{faculty}</p>
                    <p>{studentId}</p>
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button
                    id="fonts"
                    style={{ background: '#DD971A', color: 'white' }}
                    onClick={onCardClick}
                >
                    Administrar
                </Button>
            </Card.Content>
        </Card>
    );
};

export default withRouter(StudentItem);
