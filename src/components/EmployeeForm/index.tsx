import React, { SyntheticEvent, useMemo, useState, useEffect } from 'react';

import { ITodoFormProps } from "./types";
import { addEmployee, editEmployee, setEditingEmployee } from '../../store/employee/reducer';

import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getEditingEmployeeObject } from "../../store/employee/selectors";

const TodoForm = (props: ITodoFormProps) => {
    const dispatch = useDispatch()
    const editingEmployee = useSelector(getEditingEmployeeObject);

    const [name, setName] = useState<string>('')
    const [post, setPost] = useState<string>('Cashiers')
    const [birthday, setBirthday] = useState<string>('')
    const [gender, setGender] = useState<string>('')
    const [fired, setFired] = useState<boolean>(false);

    useEffect(
        () => {
            if (editingEmployee) {
                setName(editingEmployee.name);
                setPost(editingEmployee.post);
                setBirthday(editingEmployee.birthday);
                setGender(editingEmployee.gender);
                setFired(editingEmployee.fired);
            } else {
                setName('');
                setPost('');
                setBirthday('');
                setGender('');
                setFired(false);
            }
        },
        [editingEmployee],
    )

    const {
        show,
        onClose,
    } = props;

    const handleClose = () => {
        setName('')
        setPost('')
        setBirthday('')
        setGender('')
        setFired(false);
        if (editingEmployee) {
            dispatch(setEditingEmployee(null));
        }
        if (onClose) {
            onClose();
        }
    };

    const formValues = useMemo(
        () => ({
            name,
            post,
            birthday,
            gender,
            fired,
        }),
        [
            name,
            post,
            birthday,
            gender,
            fired,
        ],
    );

    const handleSubmit = (e: SyntheticEvent): void => {
        e.preventDefault()
        if (editingEmployee) {
            console.log({ current: editingEmployee, data: formValues })
            dispatch(editEmployee({ id: editingEmployee.id, data: formValues }));
            dispatch(setEditingEmployee(null))
        } else {
            dispatch(addEmployee(formValues));
            dispatch(setEditingEmployee(null))
        }
        handleClose()
    };

    return (
        <div className="model_box">
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>{editingEmployee ? 'Edit Employee' : 'Add Employee'}</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <Form.Group>
                            <Form.Control
                                required
                                onChange={(e) => setName(e.target.value)}
                                type='text'
                                placeholder='Enter name'
                                value={name}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Select
                                required
                                onChange={(e) => setPost(e.target.value)}
                                className='form-control'
                                value={post}
                            >
                                <option value="Cashiers">Cashiers</option>
                                <option value="Administrator">Administrator</option>
                                <option value="Seller">Seller</option>
                                <option value="Director">Director</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group>
                            <Form.Control
                                required
                                onChange={(e) => setBirthday(e.target.value)}
                                type='date'
                                value={birthday}
                                // defaultValue={editingEmployee?.birthday}
                            />
                        </Form.Group>
                        <Form.Group className="form-control">
                            <Form.Check
                                onChange={(e) => setGender(e.target.value)}
                                type={'radio'}
                                id='male'
                                label='Male'
                                name="gender"
                                value="Male"
                                checked={gender === 'Male'}
                            />
                            <Form.Check
                                onChange={(e) => setGender(e.target.value)}
                                type={'radio'}
                                id='female'
                                label='Female'
                                name="gender"
                                value="Female"
                                checked={gender === 'Female'}
                            />
                        </Form.Group>
                        <Form.Group className="form-control">
                            <Form.Check
                                onChange={(e) => setFired(e.target.checked)}
                                type='checkbox'
                                id='fired'
                                label='Fired'
                                value='Fired'
                                checked={fired}
                                // defaultChecked={editingEmployee?.fired}
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            type="submit"
                            variant="success"
                        >
                            {editingEmployee ? 'Edit Employee' : 'Add Employee'}
                        </Button>
                        <Button variant="secondary" onClick={handleClose}>
                            Close Modal
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </div>
    );
};

export default TodoForm;
