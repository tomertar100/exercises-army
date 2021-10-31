import React,{useState,useEffect,useRef} from 'react';


function TodoForm(props) {
    const [input,setInput] = useState('')
    const [date,setDate] = useState('')

    const inputRef = useRef(null)

    useEffect(()=>{
        inputRef.current.focus()
    })

   const handleDate = (event) => {
       setDate(event.target.value)
   }

    const handleChange = (event) => {
        setInput(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        props.onSubmit({
            id: Math.floor(Math.random()*10000),
            text: input,
            date: date
        })

        setInput('')
        setDate('')

    }


    return (
       <form className = 'todo-form' onSubmit = {handleSubmit}>
       
        <div>
            <input 
            type = 'text' 
            value = {input} 
            name = 'text' 
            className = 'todo-input' 
            placeholder = 'add a todo' 
            onChange = {handleChange}
            ref={inputRef}
            />
            <button className = 'todo-button'>Add</button>
            <input className = 'todo-date' type='date' onChange ={handleDate} value = {date}/>
        </div>
           
       </form>
    )
}

export default TodoForm
