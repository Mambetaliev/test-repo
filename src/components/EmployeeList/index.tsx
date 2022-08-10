import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getEmployeeData } from "../../store/employee/selectors";
import { setEditingEmployee } from '../../store/employee/reducer';

import { IEmployee } from "../../store/employee/types";
import { ITodoListProps } from "./types";

import { Button, Table, Container } from "react-bootstrap";

const TodoList = (props: ITodoListProps) => {
    const employeeList = useSelector(getEmployeeData);

    const {
        setIsModalVisible,
        setShow
    } = props;
    const dispatch = useDispatch();

    return (
        <Container className="row">
            <Container className="table-responsive ">
                <Table bordered hover striped variant='dark'>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Post</th>
                        <th>Birthday</th>
                        <th>Gender</th>
                        <th>Fired</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {!employeeList?.length ? <></> : employeeList.map((it: IEmployee) => {
                        return (
                            <tr key={it.id}>
                                <td>{it?.id}</td>
                                <td>{it?.name}</td>
                                <td>{it?.post}</td>
                                <td>{it?.birthday}</td>
                                <td>{it?.gender}</td>
                                <td>{!it?.fired ? 'Not Fired' : 'Fired'}</td>
                                <td style={{ display: 'flex', justifyContent: 'space-around' }}>
                                        <Button
                                            variant='secondary'
                                            onClick={() => {
                                                setShow(true)
                                                dispatch(setEditingEmployee(it));
                                            }}
                                        >
                                            <i
                                                className="material-icons"
                                            >
                                                &#xE254;
                                            </i>
                                        </Button>
                                        <Button
                                            variant='secondary'
                                            onClick={() => {
                                                setIsModalVisible(true)
                                                dispatch(setEditingEmployee(it));
                                            }}
                                        >
                                            <i
                                                className="material-icons"
                                            >
                                                &#xE872;
                                            </i>
                                        </Button>
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </Table>
            </Container>
        </Container>
    );
};

export default TodoList;