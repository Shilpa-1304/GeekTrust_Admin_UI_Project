import React from 'react'

function Pages(data) {
    
    let dataLen=data.totalData;
    let recordsPerPage=data.dataPerPage;
    let currentPage=data.currentPage;
    let setCurrentPage=data.setCurrentPage;
     let pages=[];
    for(let x=0;x<Math.ceil(dataLen/recordsPerPage);x++){
        pages.push(x+1);
    }
    let len=(pages.length);
    
  return (
    <div className='d-flex justify-content-center '>
        <nav aria-label="Page navigation example">
        <ul className="pagination">
            <li className="page-item">
            <button className="page-link" onClick={()=>setCurrentPage(pages[0])} aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
            </button>
            </li>
            <li className="page-item">
            <button className="page-link" onClick={()=>setCurrentPage(currentPage-1)} aria-label="Previous">
                <span aria-hidden="true">&#60;</span>
            </button>
            </li>
            {
                pages.map((page,index)=>{
                    return(( page===currentPage) ? 
                        <li className="page-item active"  key={index}><button className="page-link" onClick={()=>setCurrentPage(page)}>{page}</button></li>:
                        <li className="page-item" key={index}><button className="page-link" onClick={()=>setCurrentPage(page)}>{page}</button></li>
                    )
                })
            }
            <li className="page-item">
                    <button className="page-link"aria-label="Next" onClick={()=>setCurrentPage(currentPage+ 1)}><span aria-hidden="true">&#62;</span></button>
            </li>
            <li className="page-item">
                    <button className="page-link"aria-label="Next" onClick={()=>setCurrentPage(pages[len-1])}><span aria-hidden="true">&raquo;</span></button>
            </li>
        </ul>
        </nav>
    </div>
  )
}

export default Pages