# TaskBoxes

This free tool is to see whether macOS 10.15 Quick Actions are so seamless they result in regular use of Task Boxes as a productivity tool.

## How to Run

The Install directory contains automated install scripts.
The Code directory contains the code for modiyfication and manual setup.

### From Install

The TaskBoxes Installation application will setup the TaskBox QuickActions, calendar, and directory for you.

When TaskBoxes first runs you will need to approve access to Calendar and Finder. You can see all the code with Automator by opening the TaskBoxes Installation with Automator.

TaskBoxes Installation does the following:

1. Creates a local Calendar called "Task Boxes"
2. Creates A folder ~/Documents/Task Boxes
3. Copies QuickActions "Stop Task" and "Start Task" in ~/Library/Services/
4. Copies scripts "TaskEnded" and "plist" file into ~/Library/Scripts/

Alternatively you can double click the Quick Actions, "Start Task" and "Stop Task" Mac OS will suggest moving them to the correct location, which is ~/Library/Services

All four steps (calendar, folder, quick actions, and scripts) need to be setup for Task Boxes to work.

Quick Actions are available via the TouchBar under the Quick Actions Menu.

To edit the code, open the Quick Actions and TaskEnded files with Automator. Then you can see individual scripts and edit as needed. JXA and AppleScript is used. 

### From Code

1. Create an Automator Quick Action called Start Task. In Automator search for Run JavaScript action. In the JavaScript box that is added copy and paste the extras/jxa_quickaction_python.js.
2. Copy dir "Start Task Python" to dir "~/Library/Scripts"
3. Create dir "~/Documents/Task Boxes" to hold your tasks
4. Generate credentials and a token.pickle from [Google Quickstart](https://developers.google.com/calendar/quickstart/python)
5. Edit calendar_id in main.py
6. Generate the venv folder based on requirements.txt
7. Create the required logs folder

## Change Log

### 0.1 [2020/0/08]

### NA [Prior to 2020/10]

* Worked using only JXA commands
* Had dependencies on other programs installed on Mac OS

## Learn JXA by Example

* [JXA Snippets Collection](https://www.seamlessio.com/articles/jxa-snippets-collection)