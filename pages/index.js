import {useState} from 'react'
import styles from "../styles/Home.module.css"
import {PrismaClient} from '@prisma/client'
import axios from 'axios';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import CloseIcon from '@mui/icons-material/Close';
const prisma = new PrismaClient();

export default function Home({data}) {
  const [todo, setTodo] = useState(data)
  const [userInput, setUserInput] = useState({})
  const [update, setUpdate] = useState({})
  const [openPop, setOpenPop] = useState(false)
 
  async function saveTodo(e){
    e.preventDefault()
    fetch('/api/todolist', {
      method: 'POST',
      body: JSON.stringify(userInput)
    })
    .then(response=>response.json())
    .then(data => {
      setTodo([ ...todo, data ])
    }) 
    setUserInput({...userInput, activity:''}) 
    return validateForm()
  }

  const deleteList = async (id) =>{
    
    const response = await fetch('api/'+id, {
      method: 'DELETE',
    })
    setTodo((prev) => prev.filter((userInput) => userInput.id !== id))
    return await response.json()

  }

  const updateList = async (id) =>{
    const temp = [...todo];
    const index = temp.findIndex((t) => t.id === id);
    
    const response = await fetch('api/'+id, {
      method: 'PUT'
    })
    temp[index].status = !temp[index].status
    setTodo(temp)
    return await response.json()
  
  }

  const setEditTodo = async(id) =>{
      axios.get('api/'+id)
      .then(response  => {setUpdate(response.data.temp) }  )
    }
 

  const editList = async(e) =>{
    e.preventDefault()
    const id = update.id;
    const temp = [...todo];
    const index = temp.findIndex((t) => t.id === id);

    const response = await fetch('api/'+ update.id, {
      method: 'POST',
      body: JSON.stringify(update.activity)
    })
    temp[index].activity = update.activity
    setUpdate(update.activity = '')
    console.log(update.activity)
    setTodo(temp)
    setOpenPop(false)
  }

  function Pop( ) {  
    return ( 
      <div className={styles.modalBG}>
      <div className={styles.modalCon}>
        <div className={styles.close}>
          <CloseIcon onClick={() => setOpenPop(false)} className={styles.exit}/>
        </div>

        <div className={styles.title}>
          <form className={styles.form_container2}>
          <input className={styles.input2} 
              type='text' 
              placeholder='Edit Your List'
              value={update.activity}
              onChange={e => setUpdate({...update, activity: e.target.value})}
          />

           <div className={styles.footer}>
            <SaveIcon  onClick={editList} className={styles.submit_btn}/>
          </div>
          </form>
        </div>
      </div> 
    </div>
    )
  }

  function validateForm () {
     var x = document.forms["myForm"] ["fList"].value;
     if (x == "") {
       alert("List must be filled out!");
       return false;
     }
  }
 
  return (
    <main className={styles.main}>
      <h1 className={styles.heading}>Basic To do list</h1>
      <div className={styles.container}>

        <form className={styles.form_container} name='myForm'>

          <input className={styles.input} 
            type='text' 
            name='fList'
            placeholder='Add Your List'
            value= {userInput.activity}
            onChange={e => setUserInput({...userInput, activity: e.target.value})}/>
            <SaveIcon  onClick={saveTodo} className={styles.save}/>
          
        </form>
        {todo.map((todo) => (
          <div className={styles.task_container} key= {todo.id}>
           <input 
              type= "checkbox" 
              className={styles.check_box}
              checked={todo.status}
              onChange={()=>updateList(todo.id)}
          />
              <p > {todo.activity}</p>

            <div className={styles.ff}> 
              {/* <EditIcon className={styles.edit} onClick={() => setEditTodo(todo.id)}/> */}
              <EditIcon className={styles.edit} onClick={() => {setEditTodo(todo.id) , setOpenPop(true)} }/>
              <ClearIcon className={styles.clear} onClick={() => deleteList(todo.id)}/>
            </div> 
          </div>
        )
        )}
        {openPop && Pop(setOpenPop)}
      </div>
      
    </main>
    
  )

}

export async function getServerSideProps(){
  const todo = await prisma.todo_list.findMany()

  return{
    props: {
      data: todo
    }
  }
}
