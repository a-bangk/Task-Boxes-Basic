// The Task Box starter script combines JXA with python commands
// JXA handles OS tasks such as opening reminders and playing music
// Python handles calendar event creation, becasue this was failing irregularly when run as JXA commands

// Script does does the following
// 1. Lists directory in ~/Documents/Task Boxes as a choices in a list
// 2. Asks to specify task, used in description of task
// 3. Opens relevant directory and reminder list
// 4. Start Music
// 5. Start python script passing in the information gathered
    //1. Creates a calendar event in google calendar 

// Include standard Additions
const app = Application.currentApplication()
app.includeStandardAdditions = true

// Set vars for Apps used
const Calendar = Application('Calendar');
const Finder = Application('Finder');
const Reminders = Application('Reminders');
const SystemEvents = Application('System Events')
const Music = Application('Music');

// Assigned variables from start
var homeDir = SystemEvents.currentUser.homeDirectory();
var currentUser = SystemEvents.currentUser.name();
var logFile = homeDir + "/Library/Logs/akjems/TaskBox/startTaskPython.log"
var taskBoxesDir = homeDir + "/Documents/Task\ Boxes/"
var pythonMain = "." + homeDir + "/Library/Scripts/Start\\\ Task\\\ Python/venv/bin/python3 "+homeDir+"/Library/Scripts/Start\\\ Task\\\ Python/main.py"


writeToLog("Start Task launched", logFile, true)

// Alphabetize the list of folders that represent taskBoxes

var taskBoxChoices = listDirectory(taskBoxesDir)

taskBoxChoices.sort();

// Remove .DS_Store from the list of options
taskBoxChoices.splice(taskBoxChoices.indexOf('.DS_Store'), 1);

try {
	var taskBox = app.chooseFromList(taskBoxChoices, {
  	  withPrompt: "What are you working on ?",
  	  defaultItems: ["other"],
	  cancelButton: "Cancel"
	})
	} catch(err) {
		writeToLog("FAILED get Task Box selection", errorLogFile, true)
	}

if (taskBox) {


    writeToLog("Received selection " + taskBox + "\n", logFile, true)

    // Prep to show Reminders so we know what there is to work on before specifically choosing
    if (Reminders.lists.byName(taskBox).exists()) {
        Reminders.lists.byName(taskBox).show();
    } else {
        // TODO ask and store if they want a list created
        var newReminderList = Reminders.List({
            name: taskBox
        });
        Reminders.lists.push(newReminderList);
        Reminders.lists.byName(taskBox).show()
    }
    try {
        Reminders.activate();
    } catch (err) {
        writeToLog("ERROR open Reminders", errorLogFile, true)
    }

    writeToLog("Activated Reminders", logFile, true)


    // Set directory that will be opened by finder
    var dirUsed = taskBoxesDir + taskBox
	writeToLog("dirUsed is" + dirUsed, logFile, true)
	// without Delay it prompt would not come up
	delay(2)
	// See guidedPrompt function at button
	var workingOn = guidedPrompt("Specifically?");  
	writeToLog("Prompted specifics", logFile, true)

    // Exit script if cancelled
    if (workingOn) {
        // Result to be used in calendar event creation
        writeToLog("Received specific task " + workingOn + "\n", logFile, true)
	
        //Open Finder Location
        var strPath = $(dirUsed).stringByStandardizingPath.js
        Finder.reveal(Path(strPath));


        // Bring the wanted apps to the front
        Finder.activate();
        writeToLog("Activated finder", logFile, true)
		try{
		Music.play();
		} catch(err){
		            writeToLog("FAILED to Play music", errorLogFile, true)

					};
		
        shellScriptCommand = pythonMain+ " \'" + taskBox + "\' \'" + workingOn + "\'"
        writeToLog(shellScriptCommand, logFile,true)
        app.doShellScript(shellScriptCommand);

    } else {
        writeToLog("User cancelled start", logFile, true);
        //TODO Fails to quit, but works on own script
        //Application('Reminders').quit();
    }
} else {
    writeToLog("User cancelled start", logFile, true)


}

// Prompt Function
function guidedPrompt(text) {
	var options = {defaultAnswer: taskBox + " - ",
            withIcon: "note",
            buttons: ["Cancel", "Continue"],
            defaultButton: "Continue"
        }
	try {
    	return app.displayDialog(text,options).textReturned
  } catch (e) {
    return null
  }
}


// Function to read in folder names contents for array
function listDirectory(strPath) {
    fm = fm || $.NSFileManager.defaultManager;

    return ObjC.unwrap(
            fm.contentsOfDirectoryAtPathError($(strPath)
                .stringByExpandingTildeInPath, null))
        .map(ObjC.unwrap);
}
var fm = $.NSFileManager.defaultManager;

// A single function to write to log with date, user, and event
function writeToLog(msg, file) {
    try {

        // Convert the file to a string
        var fileString = file.toString()

        // Open the file for writing
        var openedFile = app.openForAccess(Path(fileString), {
            writePermission: true
        })

        var d = new Date()
        isoDate = new Date(d.getTime() - (d.getTimezoneOffset() * 90000)).toISOString();
        logEntry = "\n" + isoDate + " " + currentUser + " " + msg
        //logEntry = d.toISOString().concat(" ", text, "\n")
        // Write the new content to the file
        app.write(logEntry, {
            to: openedFile,
            startingAt: app.getEof(openedFile)
        })

        // Close the file
        app.closeAccess(openedFile)

        // Return a boolean indicating that writing was successful
        return true
    } catch (error) {

        try {
            // Close the file
            app.closeAccess(file)
        } catch (error) {
            // Report the error is closing failed
            console.log(`Couldn't close file: ${error}`)
        }

        // Return a boolean indicating that writing was successful
        return false
    }
}



