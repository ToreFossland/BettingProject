import React, { useState, useCallback, useEffect } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input,
    NavLink,
    Alert
} from 'reactstrap';
import { connect } from 'react-redux';
import { register } from '../../redux/actions/authActions';
import { clearErrors } from '../../redux/actions/errorActions';
import {
    IRegisterModal,
    ITarget,
    IAuthReduxProps
} from '../../types/interfaces';

const RegisterModal = ({
    isAuthenticated,
    error,
    register,
    clearErrors
}: IRegisterModal) => {
    const [modal, setModal] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [msg, setMsg] = useState(null);

    const handleToggle = useCallback(() => {
        // Clear errors
        clearErrors();
        setModal(!modal);
    }, [clearErrors, modal]);

    const handleChangeUsername = (e: ITarget) => setUsername(e.target.value);
    const handleChangeEmail = (e: ITarget) => setEmail(e.target.value);
    const handleChangePassword = (e: ITarget) => setPassword(e.target.value);
    const handleChangePasswordCheck = (e: ITarget) => setPasswordCheck(e.target.value);

    const handleOnSubmit = (e: any) => {
        e.preventDefault();

        // Create user object
        const user = {
            email,
            username,
            password,
            passwordCheck
        };

        // Attempt to login
        register(user);
    };

    useEffect(() => {
        // Check for register error
        if (error.id === 'REGISTER_FAIL') {
            setMsg(error.msg.msg);
        } else {
            setMsg(null);
        }

        // If authenticated, close modal
        if (modal) {
            if (isAuthenticated) {
                handleToggle();
            }
        }
    }, [error, handleToggle, isAuthenticated, modal]);

    return (
        <div>
            <NavLink onClick={handleToggle} href="#">
                Register
      </NavLink>

            <Modal isOpen={modal} toggle={handleToggle}>
                <ModalHeader toggle={handleToggle}>Register</ModalHeader>
                <ModalBody>
                    {msg ? <Alert color="danger">{msg}</Alert> : null}
                    <Form onSubmit={handleOnSubmit}>
                        <FormGroup>
                            <Label for="name">Username</Label>
                            <Input
                                type="text"
                                name="username"
                                id="username"
                                placeholder="Username"
                                className="mb-3"
                                onChange={handleChangeUsername}
                            />

                            <Label for="email">Email</Label>
                            <Input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Email"
                                className="mb-3"
                                onChange={handleChangeEmail}
                            />

                            <Label for="password">Password</Label>
                            <Input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Password"
                                className="mb-3"
                                onChange={handleChangePassword}
                            />

                            <Label for="passwordCheck">PasswordCheck</Label>
                            <Input
                                type="password"
                                name="passwordCheck"
                                id="passwordCheck"
                                placeholder="Verify password"
                                className="mb-3"
                                onChange={handleChangePasswordCheck}
                            />

                            <Button color="dark" style={{ marginTop: '2rem' }} block>
                                Register
                            </Button>
                        </FormGroup>
                    </Form>
                </ModalBody>
            </Modal>
        </div>
    );
};

const mapStateToProps = (state: IAuthReduxProps) => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
});

export default connect(mapStateToProps, { register, clearErrors })(
    RegisterModal
);