import React, { useState } from 'react'
import {BsFillPencilFill,BsFillTrashFill } from 'react-icons/bs';
import Pages from './Pages';

function Item({deleteSelectedRecords, handleEdit,handleDelete,handleSubmit,filteredData}) {
  const [select,setAllSelect]=useState(false);
  const [selectedId,setSelectedId]=useState([]);
  const[name,setName]=useState('');
  const[email,setEmail]=useState('');
  const[role,setRole]=useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);
  const lastPostIndex=currentPage*recordsPerPage;
  const firstPostIndex=lastPostIndex-recordsPerPage;
  const currentPostData=filteredData.slice(firstPostIndex,lastPostIndex);
  const [selectedRecords,setSelectedRecords]=useState([])

//Filtering the selected records.
  const handleSelect=()=>{
    setAllSelect(!select);
    let id=filteredData.map((item)=>{
      return item.id
    });
    setSelectedId(id); 
  }

  const handleSelection=(id)=>{
    if(!selectedRecords.includes(id))
       setSelectedRecords([...selectedRecords,id]);
    else{
      let data=selectedRecords.filter((item)=>{
        return item!==id;
      })
      setSelectedRecords(data);
    }
  }
  
  return (<>
{/* Delete All Button */}
  <div className='d-flex justify-content-between m-2'>
  <button type="button" className="btn btn-danger" onClick={()=>{(selectedId.length===0)?deleteSelectedRecords(selectedRecords):deleteSelectedRecords(selectedId)}}>Delete Selected</button>
  </div>

{/* Records stored in table */}
    <table className="table table-hover">
    <thead>
      <tr>
        <th scope="col"><input type='checkbox' onClick={()=>handleSelect()}></input></th>
        <th scope="col">Name</th>
        <th scope="col">Email</th>
        <th scope="col">Role</th>
        <th scope="col">Actions</th>
      </tr>
    </thead>
    <tbody >
    { 
    currentPostData.map((item)=>{
    return (
      <tr key={item.id}>
        {
          selectedId.includes(item.id)?<td><input type='checkbox' checked={select} ></input></td>:
          <td><input type='checkbox'  onChange={(e)=>handleSelection(item.id)}></input></td>
        }
          <td>{item.name}</td><td>{item.email}</td>
          <td>{item.role}</td>
          <td className="d-flex justify-content-evenly align-items-center">
          <button type="button" className="btn" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
              <BsFillPencilFill className='m-1'  onClick={()=>{handleEdit({item});setSelectedId(item.id)}}/>
          </button>
          <BsFillTrashFill className='m-1' color='red' cursor='pointer' 
          onClick={()=>{handleDelete({item})}}/></td>
      </tr>
      )
    })
  }
  </tbody>
</table>
{/* Upload Modal */}
 <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
   <div className="modal-dialog">
     <div className="modal-content">
       <div className="modal-header">
         <h5 className="modal-title" id="staticBackdropLabel">Edit Record</h5>
         <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
       </div>
       <div className="modal-body">
          <div className="input-group input-group-sm mb-3">
          <span className="input-group-text" id="inputGroup-sizing-sm">Name</span>
          <input type='text' name='name' className="form-control" placeholder='Enter Name' value={name} onChange={(e)=>{setName(e.target.value)}}></input>
          </div>

          <div className="input-group input-group-sm mb-3">
          <span className="input-group-text" id="inputGroup-sizing-sm">Role     </span>
          <input type='text' name='role' className="form-control" placeholder='Enter Role' value={role} onChange={(e)=>{setRole(e.target.value)}}></input>
          </div>

          <div className="input-group input-group-sm mb-3">
          <span className="input-group-text" id="inputGroup-sizing-sm">Email</span>
          <input type='text' name='email' className="form-control" placeholder='Enter Email' value={email} onChange={(e)=>{setEmail(e.target.value)}}></input>
          </div>
       </div>
       <div className="modal-footer">
         <button type="button" className="btn btn-primary" onClick={()=>handleSubmit({id:selectedId,name:name,email:email,role:role})}>Save Changes</button>
         <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
       </div>
     </div>
   </div>
 </div> 
 <Pages totalData={filteredData.length} dataPerPage={recordsPerPage} setCurrentPage={setCurrentPage} currentPage={currentPage}/> 
 </>
)
}

export default Item