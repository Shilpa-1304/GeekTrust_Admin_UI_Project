import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Header from './Header';
import Item from './Item';

function LandingPage() {
    
  const[data,setData]=useState([]);
  const[filteredData,setFilteredData]=useState(data);
  const [editedPersonId,setEditedPersonId]=useState('')
  
  useEffect(() => {
    fetchData();
  }, []);

//Fetching data using axios.
  const fetchData=async()=>{
    let response=await axios.get('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json')
    try{
      if(response.status===200){
        setData(response.data);  
        setFilteredData(response.data)  ;
      }
    }
    catch(err){
      alert('Something went wrong, '+err);
    }
  }
  //Handling the searched value from search bar and returning the matched results.
  const handleSearch=(searchValue)=>
  {
    console.log('This is handle Search method: '+searchValue);
      let serachedItem=filteredData.filter((item)=>{
        let str1=JSON.stringify(item);
        let str=str1.toLocaleLowerCase();
        let value='';
        if(str.includes(searchValue.toLocaleLowerCase())){
          value=item;
        }
        return value;
    })  
    setFilteredData(serachedItem);
  }

  //Editing the records.
  const handleEdit=(editedRecord)=>{
    console.log('Handle Edit function in landing.js ');
    setEditedPersonId(editedRecord.item.id);
    console.log(editedRecord);
  }

//Deleting selected records using 'Delete Selected' Button.

  const deleteSelectedRecords=(arr)=>{
    console.log('Delete selcted items');
    console.log(arr);
    let data1;
    let data=filteredData.filter((item)=>{
      if(!arr.includes(item.id)){
        data1=filteredData.filter((person)=>{
          return item.id!==person.id
        })
        return data1;
      }
      return data1;
    })
    setFilteredData(data)
  }

//Deleting the single record at a time. 

  const handleDelete=(person)=>{
    console.log(person.item.id);
    let data=filteredData.filter((item)=>{
      return person.item.id!==item.id
    })
    setFilteredData(data)
  }

//Saving the edited record.
  const handleSubmit=(editedRecord)=>
  {
    console.log(editedRecord);
    let newData=[...filteredData];
    newData.splice(editedPersonId-1,1,{id: editedPersonId,name: editedRecord.name,email: editedRecord.email,role:editedRecord.role})
    console.log(newData)
    setFilteredData(newData);
  }
  
  return (
    <div>
      <Header handleSearch={handleSearch}/>
      <Item deleteSelectedRecords={deleteSelectedRecords} handleEdit={handleEdit} handleDelete={handleDelete} handleSubmit={handleSubmit} filteredData={filteredData} setFilteredData={setFilteredData} rowData={data}/> 
    </div>
  )
}

export default LandingPage;