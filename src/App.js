
import "./Style.css"
import React, {useState, useEffect} from "react"
import List from "./List"
import Alert from "./Alert"
import { MdSettings } from 'react-icons/md';
import { AiFillCloseSquare } from 'react-icons/ai';
import Colors from "./Colors"

// get items from local storage
const getLocalStorage = () => {
  let list =  localStorage.getItem("list")
  if (list) {
    return JSON.parse(localStorage.getItem("list"))
  } else {
    return []
  }
}

function App() {
  
  // default input value and id
  const [input, setInput] = useState({
    value: '',
    id: null
  })
  // default list items
  const [list, setList] = useState(getLocalStorage())
  // variable for item editing
  const [editID, setEditID] = useState(null)
  // boolean to know item is editing or not
  const [isEditing, setIsEditing] = useState(false)
  // alert state
  const [alert, setAlert] = useState(
    {
      isShow: false,
      text: '',
      type: null
    }
  )
  // modal state
  const [showModal, setShowModal] = useState(false)





  // create new item object with value and unique id 
  function handleInput(e) {
    setInput({
      value: e.target.value,
      id: new Date().getTime().toString()
    })
  }

  // add ne item to the list array
  const handleSubmit = (e) => {
    // prevent page reload
    e.preventDefault()
    // if input value exist (length > 0) and not editing
    if (input.value && !isEditing) {
      setList([input, ...list])
      setInput(() => (
        {
          value: '',
          id: null
        }
      ))
      handleAlert(true, "Item Added", "success")
    }
    //  if item is editing and input value exists too
    else if (isEditing && input.value) {
      setList(
        list.map(item => {
          if (item.id === editID) {
            return (
              {
                ...item,
                value: input.value
              }
            )
          }
          return item
        })
      )
      // set to default 
      setIsEditing(false)
      setEditID(null)
      setInput(() => (
        {
          value: '',
          id: null
        }
      ))
      handleAlert(true, "Item Edited", "success")
    } else {
      handleAlert(true, "Enter input", "danger")
    }
  }

  // function delete all 
  function deleterAll() {
    setList([])
    handleAlert(true, "All Items Deleted", "danger")
  }


  // delete function
  const deleteItem = (id) => {
      setList(
        list.filter(item => item.id !== id)
      )
      handleAlert(true, "Item deleted", "danger")
  }
  // edit item
  const editItem = (id) => {
    const targetItem = list.find(item => item.id === id)
    setInput(() => (
      {
        id: targetItem.id,
        value: targetItem.value
      }
    ))
    // change isEditing from false to true
    setIsEditing(true)
    // change editID from null to editing item id
    setEditID(targetItem.id)
  }
  // function to set alert props
  const handleAlert = (show, text, type) => {
    setAlert(
      {
      isShow: show,
      text: text,
      type: type
    }
    )
  }
  // add items to local storage then list array changes
  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list))
  }, [list])


  return (
    <main>
      <article className="center-div">
        <div className="alert-container">
          {alert.isShow && <Alert {...alert} removeAlert = {handleAlert} list={list}/>}
        </div>
        <h1>To Do List</h1>
        <form className="input-container">
          <input type="text" className="input" onChange={handleInput} value={input.value} placeholder="e.g. study"/>
          <button className="submit-btn" onClick={handleSubmit}>{isEditing ? "edit" : 'add'}</button>
        </form>
        <ul>
          <List list={list} deleteItem={deleteItem} editItem={editItem}/>
          {/* show clear all button if list length is more than 0. If user click it, all items will delete */}
          {list.length > 0 && <button className="clear-list" onClick={deleterAll}>clear all</button>}
        </ul>
      </article>
      {/* button to open modal */}
      <div className="modal-btn-container">
        <MdSettings className="modal-btn" onClick={() => setShowModal(!showModal)}/>
      </div>
      {/* modal container */}
      <div className={`modal-container ${showModal ? "show-modal" : ""} `}>
        <div className="modal">
          <div className="modal-close-btn-container">
            <AiFillCloseSquare className="close-btn" onClick={() => setShowModal(!showModal)}/>
          </div>
          <h3>Custom Colors</h3>
          <Colors />
        </div>
      </div>
    </main>
  )
}

export default App;


