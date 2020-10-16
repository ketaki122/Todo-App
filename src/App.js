import React, { useState } from 'react';
import './App.css';
const InputHandler = ({addTodo}) =>{
  const [text,setText]=useState('')

  const handleChange = (e) =>{
    setText(e.target.value)

  }

  const handleClick = () =>{
    addTodo(text)
    setText('')

  }
 
  return(
    <React.Fragment>
    <div className="flex">
        <input value={text} onChange={handleChange} placeholder="Enter task..." className="input" type="text"/>
        <button onClick={handleClick} className="submit" type="submit"> Add task</button>
      </div>
    
      </React.Fragment>

  );
}

const TodoList = ({todoItem,deletetask,statustoggle}) => {
const array= todoItem.map(todo => <TodoItem statusChange={statustoggle} deleteitem={deletetask} value={todo}/> )

return(
  <React.Fragment>
    <div>
      <ul>
        {array}
      </ul>
    </div>
  </React.Fragment>
)
 
}

const TodoItem =({value , deleteitem , statusChange})=>{
  const mystyle = value.status ? 'line-through':'inherit'
  const handlethisClick =()=>{
   statusChange(value.text)

  }
  const handleClick = () =>{
    deleteitem(value.text)

  }
  if (value.text !== '') {
    return(<div className="flex">
      <li style={{textDecoration : mystyle }} onClick={handlethisClick}>{value.text}</li> <button className="deletebutton" onClick={handleClick} type="submit">Delete</button>

    </div>
      
    )

  }
  return(
    <div></div>
  )
  
}

      

function App() {
  const [todos, setTodos] = useState([])
  const [filter, setFilter] = useState('all')

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'done') return todo.status;
    return true;
  })
  
  const addTodo = (newtask) => {
   
    setTodos([...todos, {text:newtask, status:false}])
    
  }

  const deleteTodo = (task)=>{
    setTodos(todos.filter((todo)=> {return todo.text !== task}))

  }
 
  
  const statusHandler =(item)=>{
    const newtodos= todos.map( (todo)=> {
      if (todo.text === item){
        return({text:item , status:!todo.status})
      }
      return todo
    })
   setTodos(newtodos)
  }

  let count=0
  for(var i=0; i<todos.length; i++){
    if(todos[i].status){
      count++;
    }

  }

 const handleClickone = () => {
   setFilter('all')
   
 }
 const handleClicktwo = () => {
  setFilter('done')
  
}
  return (
    <div className="App-Header">
      <h1>My Todo App</h1>
      <InputHandler addTodo={addTodo}/>
      <div className="flex">
        <button className="selectbutton" onClick={handleClickone}>All tasks</button>
        <button className="selectbutton" onClick={handleClicktwo}>Completed tasks</button>
      </div>
      
      <TodoList todoItem={filteredTodos} deletetask={deleteTodo} statustoggle={statusHandler} />
      <h2>Checked Todos : {count} </h2>

    </div>
  );
}

export default App;
