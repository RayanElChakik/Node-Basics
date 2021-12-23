
/**
 * Starts the application
 * This is the function that is run when the app starts
 * 
 * It prints a welcome line, and then a line with "----",
 * then nothing.
 *  
 * @param  {string} name the name of the app
 * @returns {void}
 */
function startApp(name){
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', onDataReceived);
  console.log(`Welcome to ${name}'s application!`)
  console.log("--------------------")
}

var tasksList = [
  {doneStatus: 'true', task:'Finish Codi Task'},
  {doneStatus: 'false', task:'English HW'},
  {doneStatus: 'true', task:'Submit Weather API'}
];

/**
 * Decides what to do depending on the data that was received
 * This function receives the input sent by the user.
 * 
 * For example, if the user entered 
 * ```
 * node tasks.js batata
 * ```
 * 
 * The text received would be "batata"
 * This function  then directs to other functions
 * 
 * @param  {string} text data typed by the user
 * @returns {void}
 */
function onDataReceived(text) {
  if (text === 'quit\n' || text === 'exit\n') {
    quit();
  }else if (text.startsWith("hello")){
    hello(text)
  }
  else if(text === 'help\n'){
    help();
  }else if(text.trim() === 'list' || text.trim()=== 'li'){
    li();
  }else if(text.startsWith('add')){
    add(text)
  }else if(text.startsWith('remove')){
    remove(text);
  }else if(text.startsWith('edit')){
    edit(text);
  }else if(text.startsWith('check')){
    check(text)
  }else if (text.startsWith('uncheck')){
    uncheck(text)
  }
  else{
    unknownCommand(text);
  }
}


/**
 * prints "unknown command"
 * This function is supposed to run when all other commands have failed
 *
 * @param  {string} c the text received
 * @returns {void}
 */
function unknownCommand(c){
  console.log('unknown command: "'+c.trim()+'"')
}


/**
   * Says hello
   *
   * @returns {void}
   */
 function hello(name){
   if(name.trim().split(" ")[0] === 'hello' && name.trim().split(" ")[1] === undefined){
     console.log('Hello!')
   }else{
      console.log(`${name.trim()}!`)
   }
}
/**
 * Display List 
 *
 * @returns {void}
 */
  // var tasksList = ['Task_One', 'Task_Two', 'Task_Three'];

//   function li(){
//    for (var i = 0; i < tasksList.length; i++){
//    console.log(`${i+1}: ${tasksList[i]}`);
//    }
//  }
 function li(){
  tasksList.map((item,index) => {
    if(item.doneStatus === 'true'){
      console.log(`${index+1} - [✔] ${item.task}`);
    }
    else if (item.doneStatus === 'false'){
      console.log(`${index+1} - [ ] ${item.task}`);
    }else{
      console.log(`${index+1} - [ ] ${item.task}`);
    }
  })
}
/**
 * Adds a task to the list
 *
 * @returns {void}
 */
 function add(addTask){
  addTask = addTask.trim().split(" ")[1]
  if(addTask == undefined){
    console.log('Error! You Should add a task to the list.')
  }else{
    let taskItem = {
      task: addTask,
      doneStatus: false
    }
    tasksList.push(taskItem);
      console.log('Your task have been successively added to your list.')
  }
}
/**
* Removing items from the list
*
* @returns {void}
*/
function remove(taskR){
 taskR = taskR.trim().substring(7);
 let index = Number(taskR);
 if(index >tasksList.length){
   console.log("You entered a task number that doesn't exist")
   return
 }else if(taskR){
   for(i=0;i<tasksList.length;i++){
     if(i == tasksList.length-1){
       tasksList.splice(i-1,1);
     }
   }
}else{
 tasksList.splice(tasksList.length-1,1);
}
console.log("Your task have been deleted. Check the new upadted list if u want!")
}
/**
  * Apply edits to the lists in the application
  *
  * @returns {void}
  */
function edit(taskEdit){
 taskE = taskEdit.trim().split(" ");
 var index = Number(taskE[1]);
   if(index > tasksList.length){
     console.log('Error! Such index is not found please try Again.')
   }else if (taskE[1] === undefined){
     console.log('Error! No entries to edit please enter a valid number or a list string!')
     return
   }else if (isNaN(taskE[1])){
     tasksList[tasksList.length-1].task = taskEdit.trim().substring(5);
    console.log('Edits have been changed! Check your updated list')
   }else{
     if (taskE[2] ===undefined ){
       console.log('Error! Index found, but no text to be replaced')
     }else{
       tasksList[index-1].task = taskEdit.trim().substring(7);;
    console.log('Edits have been changed! Check your updated list')
     }
    
   }
}
/**
 * Check a list in the application
 *
 * @returns {void}
 */
 function check(checking){
   checking = checking.trim().split(" ");
   var index = Number(checking[1]);
   if(checking[1] === undefined){
     console.log('Error! You should enter a list number to check')
   }else if(index > tasksList.length){
    console.log('Error! Index not found')
   }else{
     tasksList[index-1].doneStatus = 'true'
     console.log('List have been checked!')
   }
}

/**
 * Unchecking a list in the application
 *
 * @returns {void}
 */
 function uncheck(unchecking){
  unchecking = unchecking.trim().split(" ");
  var index = Number(unchecking[1]);
  if(unchecking[1] === undefined){
    console.log('Error! You should enter a list number to uncheck')
  }else if(index > tasksList.length){
   console.log('Error! Index not found')
  }else{
    tasksList[index-1].doneStatus = 'false';
    console.log('List have been unchecked!')
  }
}

/**
 * Exits the application
 *
 * @returns {void}
 */
function quit(){
  console.log('Quitting now, goodbye!')
  process.exit();
}
/**
 * Help Command that displays all possible commands 
 *
 * @returns {void}
 */
function help(){
  console.log('--hello --> Display hello to user' + '\n' +
  '--hello ${text} --> If u add your rname or any text after the hello it will be displayed' + '\n' +
  '--unknown error --> Display unknown if command not found' + '\n' +
  '--help --> Provides help with all possible commands'+ '\n' +
  '--exit or quit --> Exit or quit the application' +'\n' +
  '--add --> Type add "Task_name" if you want to add a new task to the exisiting list' + '\n' +
  '--remove --> remove (without anything) should remove the last task from the existing list' + '\n' +
  '--remove nb --> removes the nb of element you enetred from the existing list' + '\n'+
  '--edit --> Throws an error since you shoould add the new text to replace' + '\n'+
  '--edit new task --> edits the last element in the list with the new task name entered' + '\n'+ 
  '--edit nb new task --> edits the indexed element you enetred with the new task name' + '\n'+ 
  '--check nb_task --> Checks the task index' + '\n'+ 
  '--uncheck nb_task --> Uncheck the task index');
}
// The following line starts the application
startApp("Rayan El Chakik")
