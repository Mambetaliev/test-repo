import React, { useState } from 'react';
import { useDispatch } from "react-redux";

import { setEditingEmployee } from './store/employee/reducer';

import TodoForm from "./components/EmployeeForm";
import TodoList from "./components/EmployeeList";
import ConfirmationModal from "./components/DeleteConfirmation";

import { Button, Container, Row, Col } from 'react-bootstrap';

import "bootstrap/dist/css/bootstrap.min.css";
import './App.css'

const App = () => {
    const dispatch = useDispatch()
    const [show, setShow] = useState(false);

    const [isModalVisible, setIsModalVisible] = useState<boolean>(false)

    const handleClose = () => {
        setShow(false);
        dispatch(setEditingEmployee(null))
    }
    const handleShow = () => {
        setShow(true);
    }

    return (
        <Container>
            <Container className="crud shadow-lg p-3 mb-5 mt-5 bg-body rounded">
                <Row>
                    <Col
                        sm={3}
                        mt={5}
                        mb={4}
                    />
                    <Col
                        mt={5}
                        mb={4}
                        className="offset-sm-2"
                    >
                        <h2>
                            <b>Employee Details</b>
                        </h2>
                    </Col>
                    <Col
                        mt={5}
                        mb={4}
                        className="offset-sm-1"
                    >
                        <Button
                            variant="dark"
                            onClick={handleShow}
                        >
                            Add New Employee
                        </Button>
                    </Col>
                </Row>
                <TodoList
                    setIsModalVisible={setIsModalVisible}
                    setShow={setShow}
                />
                <TodoForm
                    onClose={handleClose}
                    show={show}
                />
                {isModalVisible &&
                    <ConfirmationModal
                        title={'Удаление'}
                        setIsModalVisible={setIsModalVisible}
                    />}
            </Container>
        </Container>
    );
};

export default App;