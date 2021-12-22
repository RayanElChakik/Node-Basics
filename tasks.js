
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
  }else if (text.trim().split(" ")[0] === "hello"){
    hello(text)
  }
  else if(text === 'help\n'){
    help();
  }else if(text.trim() === 'list' || text.trim()=== 'li'){
    li();
  }else if(text.trim().split(" ")[0] === 'add'){
    add(text)
  }else if(text.trim().split(" ")[0] === 'remove'){
    remove(text.trim().split(" ")[1]);
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
  var tasksList = ['Task_One', 'Task_Two', 'Task_Three'];
  function li(){
   for (var i = 0; i < tasksList.length; i++){
   console.log(`${i+1}: ${tasksList[i]}`);
   }
 }
/**
 * Adds a task to the list
 *
 * @returns {void}
 */
 function add(addTask){
  if(addTask.trim().split(" ")[1] !== undefined){
    tasksList.push(addTask.trim().split(" ")[1]);
      console.log('Your task have been successively added to your list.')
      for (var i = 0; i < tasksList.length; i++){
        console.log(`${i+1}: ${tasksList[i]}`);
        }
    } else{
      console.log('Error! Yoou Should add a task to the list.')
    }
}
/**
 * Removing items from the list
 *
 * @returns {void}
 */
 function remove(taskR){
  var index = Number(taskR);
  if(isNaN(index)){
   tasksList.splice(tasksList.length-1,1);
  }else {
   tasksList.splice(index-1,1);
 }
 console.log("Your task have been deleted. Check the new upadted list if u want!")
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
  '--remove nb --> removes the nb of element you enetred from the existing list' + '\n' );
}
// The following line starts the application
startApp("Rayan El Chakik")
