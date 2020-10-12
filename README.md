# TaskBoxes

This free tool is to see whether macOS 10.15 Quick Actions are so seamless they result in regular use of Task Boxes as a productivity tool.

## How to Run

The Install directory contains automated install scripts.
The Code directory contains the code for modification and manual setup.

### From Code

1. Create an Automator Quick Action called Start Task. In Automator search for Run JavaScript action. In the JavaScript box that is added copy and paste the extras/jxa_quickaction_python.js.
2. Copy dir "Start Task Python" to dir "~/Library/Scripts"
3. Create dir "~/Documents/Task Boxes" to hold your tasks
4. Generate credentials and a token.pickle from [Google Quickstart](https://developers.google.com/calendar/quickstart/python)
5. Edit calendar_id in main.py
6. Generate the venv folder based on requirements.txt
7. Create the required logs folder

## Change Log

### 0.2 [2020/10/12]

* Added Pages to open Box file for Task Box. Note: first open the files in finder to avoid Permission denied
* 3 versions of Start scripts; Task, Half, and mini for 60, 30, and 10 minutes
* Opening Quick Actions will install them as needed, python scripts need to be copied to ~/Library/Scripts
* Removed broken install files

### 0.1 [2020/10/08]

* Remade to use python calendar event creation
* calendar is hardcoded
* accepts summary and description as arguments
* Requires credentails.json file present, see How to Run


### NA [Prior to 2020/10]

* Worked using only JXA commands
* Had dependencies on other programs installed on Mac OS

## Learn JXA by Example

* [JXA Snippets Collection](https://www.seamlessio.com/articles/jxa-snippets-collection)
