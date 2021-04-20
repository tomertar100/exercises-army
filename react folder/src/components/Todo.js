import React,{useState} from 'react';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import {AiOutlineCloseSquare} from 'react-icons/ai';




function Todo(props) {


    return props.todos.map((todo,index)=>(
        <div className = {todo.isComplete ? 'todo-row complete' : 'todo-row'} 
        key = {index}
        >
        
            <div key={todo.id} onClick={()=>props.completeTodo(todo.id)}>
                {todo.text} <br/><br/>due: {todo.date}
            </div>
            <div className = 'icons'>
                <AiOutlineCloseSquare 
                onClick = {() => props.removeTodo(todo.id)}
                className = 'delete-icon' 
                />
                
            </div>

        </div>
    ))
}

export default Todo
