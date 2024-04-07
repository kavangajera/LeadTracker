let inputBtn = document.getElementById("input-btn")
let myLeads = []
const inputEl = document.getElementById("input-el")
const ulEl = document.getElementById("ul-el")
let leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))
let deleteBtn=document.getElementById("delete-btn");
let tabBtn = document.getElementById("save-btn")

if(leadsFromLocalStorage){
    myLeads = leadsFromLocalStorage;
    renderLead(myLeads)
}
inputBtn.addEventListener("click",function() {
    console.log("clicked")
    myLeads.push(inputEl.value)
    
    inputEl.value=""
    localStorage.setItem("myLeads",JSON.stringify(myLeads))
    renderLead(myLeads)
}) 



deleteBtn.addEventListener("dblclick",function(){
    localStorage.clear() 
    myLeads = []
    renderLead(myLeads)

})



tabBtn.addEventListener("click",function (){
    chrome.tabs.query({active: true,currentWindow: true},function(tabs){
        myLeads.push(tabs[0].url)
        inputEl.value=""
        localStorage.setItem("myLeads",JSON.stringify(myLeads))
        renderLead(myLeads)
    })
})

function renderLead(lead){
let listItems = ""
    for(let i=0;i<lead.length;i++){
        listItems += `
        <li>
          <a target='_blank' href='${lead[i]}'>
          ${lead[i]}
          </a>
        </li>
        `
    }
    ulEl.innerHTML = listItems
}