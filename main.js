const inputForm = document.querySelector(".input-form");


inputForm.addEventListener("submit", saveIssue); 


function generateId() {
    let s4 = function() {
        return (((1 + Math.random()) * 0x1000) | 0).toString(16).substring(1);
    };
    return (s4() + s4() + s4() + s4() + s4()); 
}


function Issue(id, desc, priority, assignTo, status) {
    this.id = id; 
    this.desc = desc; 
    this.priority = priority; 
    this.assignTo = assignTo; 
    this.status = status;
}


function saveIssue(e) {
    // CHECK THIS
    e.preventDefault();
    let descVal;
    let priorityVal;
    let assignToVal; 
    let id = generateId();
    let status = "Open"; 
    for(let i = 0; i < this.children.length; i++) {
        let curr = this.children[i]; 
        console.log("ID: ", curr.id);
        if(curr.id == "desc") {
            descVal = curr.value; 
            
        } else if(curr.id == "priority") {
            priorityVal = curr.value;
            
        } else if(curr.id == "assign-to") {
            console.log(curr.id);
            assignToVal = curr.value; 
 
        }
    }
    console.log("random id: ", id);
    // create new issue
    let issue = new Issue(id, descVal, priorityVal, assignToVal, status);
    
    if(localStorage.getItem("issues") == null) {
        let issues = [];
        issues.push(issue);
        localStorage.setItem("issues", JSON.stringify(issues));
    } else {
        let issues = JSON.parse(localStorage.getItem("issues"));
        issues.push(issue);
        localStorage.setItem("issues", JSON.stringify(issues));
    }
    this.reset();
    fetchIssues();
    
    
}



function fetchIssues() {
    console.log("fetch started");
    if(localStorage.getItem("issues") == null) {
        return null;
    }; 
    let issues = JSON.parse(localStorage.getItem("issues"));
    let issueUl = document.querySelector(".issue-ul"); 
    
    issueUl.innerHTML = "";
    
    for(let i = 0; i < issues.length; i++) {
        let liIssue = `
            <li class="issue">
                <div class="issue-top">
                    <h6>Issue ID: ${issues[i].id}</h6>
                    <p class="issue-status">${issues[i].status}</p>
                </div>
                <span class="issue-priority"><label>Priority: </label>${issues[i].priority}</span>
                <h2>${issues[i].desc}</h3>
                
                <div class="issue-bottom">
                    <p>${issues[i].assignTo}</p>
                    <div class="issue-btns">
                        <button class="issue-btn close-btn" onclick="closeStatus('${issues[i].id}')">Close</button>
                        <button class="issue-btn delete-btn" onclick="deleteIssue('${issues[i].id}')">Delete</button>
                    </div>
                </div>
            </li>
        `;
        issueUl.innerHTML += liIssue;
        console.log(issues[i]);
    }
}

function closeStatus(id) {
    let issues = JSON.parse(localStorage.getItem("issues"));
    for(let i = 0; i < issues.length; i++) {
            if(issues[i].id === id) {
                issues[i].status = "Closed"; 
            }
    }
    localStorage.setItem("issues", JSON.stringify(issues));
    fetchIssues();
}

function deleteIssue(id) {
    console.log("delete intitiated");
    let issues = JSON.parse(localStorage.getItem("issues"));
    for(let i = 0; i < issues.length; i++) {
            if(issues[i].id === id) {
                issues.splice(i, 1); 
            }
    }
    localStorage.setItem("issues", JSON.stringify(issues));
    fetchIssues();
}
