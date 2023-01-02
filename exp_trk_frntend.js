var f1=document.getElementById("form1");
var ul=document.getElementById("items");

f1.addEventListener("submit",onsubmit);

function onsubmit(e){
    e.preventDefault();
    

    var eamt=document.getElementById("expenseamount").value;
    var d=document.getElementById("desc").value;
    var c=document.getElementById("category").value;


    var obj1={
        expenseamount:eamt,
        desc:d,
        category:c

    }
    console.log(obj1);
    //new update to demonstrate async await
    async function addexpense(){
    await axios.post('http://localhost:4000/add-expense',obj1)
    .then(response=>showonscreen(response.data))
    .catch(e=>console.log(e));
     // New update to clear inputs after submit
    (document.getElementById("expenseamount").value="");
     (document.getElementById("desc").value="");
     (document.getElementById("category").value="");
    }
    addexpense();

}
    function showonscreen(obj){

    var li=document.createElement("li");
    var edit=document.createElement("button");
    var del=document.createElement("button");
    li.className="itemlist";
    li.id=obj.id;
    console.log(li);
   
    li.textContent=`${obj.expenseamount}-${obj.desc}- ${obj.category}  `;
    del.setAttribute('onclick',`deleteexp('${li.id}')`);
    edit.setAttribute('onclick',`editexp('${li.id}')`);
    edit.textContent="Edit Expense";
    del.textContent="Delete Expense";
    edit.setAttribute('class','btn btn-outline-secondary  me-3');
    del.setAttribute('class','btn btn-outline-secondary me-3');
    li.appendChild(del);
    li.appendChild(edit);
    ul.appendChild(li);
    
    
}
function deleteexp(id1){
    //console.log("delete was clicked");
    
    //localStorage.removeItem(id1);
    axios.get(`http://localhost:4000/delete-expense/${id1}`)
    .then(()=>{
        var childnode=document.getElementById(id1);
    ul.removeChild(childnode);
    console.log("deleted successfully");
    })
    .catch(e=>console.log(e));
}

function editexp(id1){
    axios.get(`http://localhost:4000/edit-expense/${id1}`)
    .then(response=>{

    document.getElementById("expenseamount").value=response.data.expenseamount;
    document.getElementById("desc").value=response.data.desc;
    document.getElementById("category").value=response.data.category;
    deleteexp(id1);
    })   
   
}

window.addEventListener("DOMContentLoaded",getdata);
function getdata(){
    axios.get('http://localhost:4000/get-expenselist')
    .then(response=>{
        for(var i=0;i<response.data.allexpense.length;i++){
            showonscreen(response.data.allexpense[i]);
        }
    })
}