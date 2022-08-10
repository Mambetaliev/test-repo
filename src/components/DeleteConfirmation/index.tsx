import React from 'react'

import { useDispatch, useSelector } from "react-redux";
import { getEditingEmployeeObject } from "../../store/employee/selectors";
import { deleteEmployee, setEditingEmployee } from "../../store/employee/reducer";

import { IConfirmationModalProps } from "./types";

import { Button, Container } from "react-bootstrap";

const ConfirmationModal = (props: IConfirmationModalProps) => {
    const { title, cancelText, okText, setIsModalVisible} = props
    const editingEmployee = useSelector(getEditingEmployeeObject);
    const dispatch = useDispatch()

    const handleDelete = () => {
        if (editingEmployee) {
            dispatch(deleteEmployee(editingEmployee.id))
            dispatch(setEditingEmployee(null));
        }
        setIsModalVisible(false)
    }

    return (
        <Container
        >
            <div className='confirmationWrapper'>
                <div>{title}</div>
                <div>
                    <span>Вы уверены что хотите удалить данного сотрудника?</span>
                    <div className='confirmationInfo'>
                        <div>Имя: {editingEmployee?.name}</div>
                        <div>Должность: {editingEmployee?.post}</div>
                        <div>Пол: {editingEmployee?.gender}</div>
                        <div>Дата рождения: {editingEmployee?.birthday}</div>
                        <div>Статус: {editingEmployee?.fired ? 'Уволен' : 'Не уволен'}</div>
                    </div>
                </div>
                <div>
                    <Button
                        size='lg'
                        style={{ marginRight: '100px'}}
                        onClick={() => {
                           setIsModalVisible(false)
                        }}
                        variant='dark'
                    >
                        {cancelText || 'Отмена'}
                    </Button>
                    <Button
                        size='lg'
                        onClick={handleDelete}
                        variant='success'
                    >
                        {okText || 'Да'}
                    </Button>
                </div>
            </div>
        </Container>
    )
}

export default ConfirmationModal