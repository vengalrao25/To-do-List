import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCircleCheck, faPen, faTrashCan
} from '@fortawesome/free-solid-svg-icons'
import './App.css';

function App() {
  const [toDo, setToDo] = useState([
    // { 'id': 1, 'title': 'Task 1', 'status': false },
    // { 'id': 2, 'title': 'Task2', 'status': false }
  ])

  const [newTask, setNewTask] = useState('');
  const [updateData, setUpdateData] = useState('');


  // add task 
  const addTask = () => {
    if (newTask) {
      let num = toDo.length + 1;
      let newEntry = { id: num, title: newTask, status: false }
      setToDo([...toDo, newEntry])
      setNewTask('');
    }
  }

  // delete task
  const deleteTask = (id) => {
    let newTasks = toDo.filter(task => task.id !== id)
    setToDo(newTasks);
  }



  // mark done as done or completed
  const markDone = (id) => {
    let newTask = toDo.map(task => {
      if (task.id === id) {
        return ({ ...task, status: !task.status })
      }
      return task;
    })
    setToDo(newTask);
  }

  // cancel update
  const cancelUpdate = () => {
    setUpdateData('')
  }

  //change task for update
  const changeTask = (e) => {
    let newEntry = {
      id: updateData.id,
      title: e.target.value,
      status: updateData.status ? true : false
    }
    setUpdateData(newEntry);
  }

  //update task
  const updateTask = () => {
    let filterRecords = [...toDo].filter(task => task.id !== updateData.id);
    let updatedObject = [...filterRecords, updateData]
    setToDo(updatedObject);
    setUpdateData('')
  }




  return (
    <div className='container App'>
      <br /><br />
      <h2>To Do List (ReactJs)</h2>
      <br /><br />


      {/* update task */}

      {updateData && updateData ? (
        <>

          <div className="row">
            <div className="col">
              <input className="form-control form-control-lg "
                value={ updateData.title}
                onChange={(e) => changeTask(e)} />
            </div>
            <div className='col-auto'>
              <button
                className='btn btn-lg btn-success mr-20'
                onClick={updateTask}
              >Update</button>

              <button
                className='btn btn-lg btn-warning mr-20' onClick={cancelUpdate}
              >Cancel</button>
            </div>
          </div>
          <br />

        </>
      ) : (
        <>
          {/* add task */}
          <div className='row'>
            <div className='col'>
              <input value={newTask}
                onChange={(e) => setNewTask(e.target.value)} className="form-control form-control-lg" />
            </div>


            <div className="col-auto">
              <button className='btn btn-lg btn-success' onClick={addTask}>Add Task</button>
            </div>
          </div>


          <br />

        </>
      )}







      {/*Display tools */}

      {toDo && toDo.length ? '' :  <h3> No Tasks...</h3>}

      {toDo && toDo
        .sort((a, b) => a.id > b.id ? 1 : -1)
        .map((task, index) => {
          return (
            <React.Fragment key={task.id}>
              <div className="col taskBg">
                <div className={task.status ? 'done' : ''}>
                  <span className='taskNumber'>{index + 1}</span>
                  <span className='taskText'> {task.title}</span>
                </div>

                <div className="iconsWrap">
                  <span title="Completed / Not Completed" onClick={(e) => { markDone(task.id) }}>
                    <FontAwesomeIcon icon={faCircleCheck} />
                  </span>
                  {task.status ? '' :
                    (
                      <span title="Edit"
                        onClick={() => setUpdateData({
                          id: task.id,
                          title: task.title,
                          status: task.status ? true : false
                        })} >
                        <FontAwesomeIcon icon={faPen} />
                      </span>
                    )
                  }

                  <span title="Delete" onClick={() => deleteTask(task.id)}>
                    <FontAwesomeIcon icon={faTrashCan} />
                  </span>
                </div>

              </div>
            </React.Fragment>
          )
        })
      }

    </div>

  );
}


export default App;
