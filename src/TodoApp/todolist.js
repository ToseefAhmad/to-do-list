import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import TaskList  from './taskList';

const ToDoApp = (props) =>{
    const initialState = {title: '', description :''};
    const [formValue, setFormValue ] = useState(initialState);
    const [editDesc, setEditDes ] = useState('');
    const [isUpdated, setUpDated ] = useState(true);
    const [todoList, setToDoList ] = useState([]);
    const [ errorMessage, setErrorMessage ] = useState('');
    const [tempId,  setTempId ] = useState(-1);

    const baseUrl = 'http://0.0.0.0:3000/api/todos';


    useEffect(() =>{
        if(isUpdated){
            axios.get(baseUrl)
            .then(res => {
                const data = res.data;
                setToDoList(data);
            })
            .catch(error =>{
                const message = error.message;
                setErrorMessage(message);
            })
            setUpDated(false);
        }
    }, [setUpDated, isUpdated, setErrorMessage]);


    const handleChange = (e) =>{
        const name = e.target.name;
        const value = e.target.value;
        const temp = formValue;
        temp[name] = value;
        setFormValue(temp);
        setErrorMessage('');
    }; 

    const handleEditForm = (e) =>{
        const value = e.target.value;
        setEditDes(value);
        setErrorMessage('');
    }; 


    const createTask = useCallback((e) =>{
        e.stopPropagation();
        e.preventDefault();
        axios.post(baseUrl, formValue)
        .then(res => {
            const status = res.status;
            if(status === 201){
                setUpDated(true);
                setFormValue(initialState);
            }
        })
        .catch(error =>{
            const message = error.message;
            setErrorMessage(message);
        })
            
    }, [ setUpDated, setFormValue, initialState]);


    const deleteTaskById = useCallback((id) =>{
        axios.delete(`${baseUrl}/${id}`)
        .then(res => {
            const status = res.status;
            if(status === 204){
                setUpDated(true);
            }
        })
        .catch(error =>{
            const message = error.message;
            setErrorMessage(message);
        })
    }, [setUpDated, setErrorMessage]);


    const updateTaskById = useCallback((title) =>{

        const tempDate = {
            title : title,
            description : editDesc
        };

        axios.put(`${baseUrl}/${tempId}`, tempDate)
        .then(res => {
            const status = res.status;
             if(status === 200){
                setUpDated(true);
                setTempId(-1)
            }
        })
        .catch(error => {
            const message = error.message;
            setErrorMessage(message);
        })

    }, [ setTempId, tempId, editDesc, setUpDated]);


    const taskList = todoList.length ?
        todoList.map((item, index) =>{
            return <li key={index}>
                <TaskList
                    item={item}
                    onDelete={deleteTaskById}
                    onUpdate={updateTaskById}
                    editFiled={handleEditForm}
                    tempId={tempId}
                    setTempId={setTempId}
                />
            </li>

    }) : <li>
        <h1>You don't have any Task please create task </h1>
    </li>;

    return(
        <>
            <div>
                <form onSubmit={createTask}>
                    <div>
                    <label forhtml='title'>Enter Your Task Tilte:
                        <input type='text' id='title' name='title' defaultValue={formValue.title} onChange={handleChange} required={true} />
                    </label>
                    </div>
                    <div>
                    <label forhtml='description' >Enter Task Description :
                        <input type='text'id='description' name='description' defaultValue={formValue.description}  onChange={handleChange} required={true} />
                    </label>
                    </div>
                    <input type='submit' />
                </form>
            </div>
            <div>
                {
                    errorMessage ? <h2>{errorMessage}</h2> : null
                }
                <ul>
                    {taskList}
                </ul>
            </div>
        </>
    )
}

export default ToDoApp;