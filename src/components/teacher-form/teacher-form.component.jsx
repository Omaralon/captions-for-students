import React, { Component } from 'react';
import { Input, Form, Header, Icon, Message } from 'semantic-ui-react';

import {
    auth,
    createUserProfileDocument,
    getFakeData,
    markDataAsRegistered,
} from '../../firebase/firebase.utils';

import Search from '../search/search.component';

class TeacherForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // Personal info
            name: '',
            lastName: '',
            email: '',
            faculty: '',
            gender: '',
            grade: '',
            campus: '',
            teacherId: '',
            //
            dataSource: null,
            userDataSetted: false,
            registerStatus: undefined,
            message: '',
            messageVisible: false,
            loading: false,
        };
    }

    async componentDidMount() {
        const dataSource = await getFakeData('baseTeachers');

        this.setState({ dataSource });
    }

    setUserData = data => {
        this.setState({
            ...data,
            userDataSetted: true,
        });
    };

    handleDismiss = () => {
        this.setState({ messageVisible: false });
    };

    handleChange = event => {
        const { name } = event.target;

        this.setState({ [name]: event.target.value });
    };

    handleSubmit = async () => {
        this.setState({ loading: true });

        try {
            const {
                name,
                lastName,
                email,
                faculty,
                gender,
                grade,
                campus,
                teacherId,
            } = this.state;

            const userCredential = await auth.createUserWithEmailAndPassword(
                email,
                'Password2020'
            );
            const { user } = userCredential;

            console.log(userCredential);

            try {
                // After the user was correctly registed
                const successMsg = await createUserProfileDocument(user, {
                    name,
                    lastName,
                    email,
                    faculty,
                    gender,
                    grade,
                    campus,
                    teacherId,
                    type: 'teacher',
                });

                // Checking the user as registered, so that it won't be shown ever again
                await markDataAsRegistered(
                    'baseTeachers',
                    'teacherId',
                    teacherId
                );

                const updatedDataSource = this.state.dataSource.filter(
                    data => data.teacherId !== teacherId
                );

                // Clearing form fields and setting success message
                this.setState({
                    registerStatus: 'success',
                    message: successMsg,
                    messageVisible: true,
                    loading: false,
                    dataSource: updatedDataSource,
                });
            } catch (errorMsg) {
                // If we couln't register the user info into the firestore, we delete the user
                await user.delete();

                this.setState({
                    registerStatus: 'failure',
                    message: 'Lo sentimos, no pudimos registrar al usuario.',
                    messageVisible: true,
                    loading: false,
                });
            }
        } catch ({ message }) {
            // If we couldn't create our user
            this.setState({
                registerStatus: 'failure',
                message,
                messageVisible: true,
                loading: false,
            });
        } finally {
            // Clearing form fields
            const { email, pass } = this.props;
            await auth.signInWithEmailAndPassword(email, pass);

            this.setState({
                name: '',
                lastName: '',
                email: '',
                faculty: '',
                gender: '',
                grade: '',
                campus: '',
                teacherId: '',
                userDataSetted: false,
            });
        }
    };

    render() {
        const { dataSource } = this.state;
        return (
            <div
                style={{
                    width: '650px',
                    margin: '0 auto 80px auto',
                    paddingTop: '48px',
                }}
            >
                <Header as="h1" style={{ marginBottom: '32px' }}>
                    <Icon name="user circle" />
                    <Header.Content>
                        <span style={{ fontWeight: 'normal' }}>
                            Registro de Profesor
                        </span>
                        <Header.Subheader>
                            Datos obtenidos del profesor a registrar
                        </Header.Subheader>
                    </Header.Content>
                </Header>
                <Search
                    dataSource={dataSource}
                    setUserData={this.setUserData}
                    type="teacher"
                />
                <Form onSubmit={this.handleSubmit} loading={this.state.loading}>
                    <Form.Field
                        name="name"
                        label="Nombre(s)"
                        placeholder="Nombre(s)"
                        value={this.state.name}
                        control={Input}
                        readOnly
                    />
                    <Form.Field
                        name="lastName"
                        label="Apellido(s)"
                        placeholder="Apellido(s)"
                        value={this.state.lastName}
                        control={Input}
                        readOnly
                    />
                    <Form.Field
                        name="grade"
                        label="Grado de Estudios"
                        iconPosition="left"
                        icon="student"
                        placeholder="Lic, Mtro o Dr"
                        value={this.state.grade}
                        control={Input}
                        readOnly
                    />
                    <Form.Field
                        name="email"
                        label="Correo Institucional"
                        iconPosition="left"
                        icon="at"
                        placeholder="Correo UABC (@uabc.edu.mx)"
                        value={this.state.email}
                        control={Input}
                        readOnly
                    />
                    <Form.Field
                        name="teacherId"
                        label="Número de Empleado"
                        iconPosition="left"
                        icon="id badge"
                        placeholder="Numero de Empleado"
                        value={this.state.teacherId}
                        control={Input}
                        readOnly
                    />
                    <Form.Field
                        name="campus"
                        label="Unidad Universitaria"
                        placeholder="Campus UABC"
                        value={this.state.campus}
                        control={Input}
                        readOnly
                    />
                    <Form.Field
                        name="faculty"
                        label="Unidad Académica"
                        placeholder="Facultad"
                        value={this.state.faculty}
                        control={Input}
                        readOnly
                    />
                    <Form.Field
                        name="gender"
                        label="Género"
                        iconPosition="left"
                        icon="intergender"
                        placeholder="Género"
                        value={this.state.gender}
                        control={Input}
                        readOnly
                    />
                    <Form.Button
                        primary
                        size="large"
                        disabled={!this.state.userDataSetted}
                    >
                        Registrar Profesor
                    </Form.Button>
                </Form>
                {this.state.registerStatus && this.state.messageVisible && (
                    <Message
                        error={this.state.registerStatus === 'failure'}
                        success={this.state.registerStatus === 'success'}
                        header={
                            <span style={{ fontSize: '16px' }}>
                                <strong>
                                    {this.state.registerStatus === 'success'
                                        ? 'Registro Exitoso'
                                        : 'Registro Fallido'}
                                </strong>
                            </span>
                        }
                        content={this.state.message}
                        onDismiss={this.handleDismiss}
                    />
                )}
            </div>
        );
    }
}

export default TeacherForm;
