![Seamlessio logo](https://i.ibb.co/ZfL0Pxh/Seamlessio-logo.jpg")

# TaskBoxes

This free tool is to see whether Quick Actions are so seamless they result in regular use of TaskBoxes as a productivity tool. 

## Using TaskBoxes

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


## Dependencies

* [Red Hot Timer](https://apps.apple.com/dk/app/red-hot-timer/id929960914?mt=12)

## Learn JXA by Example

* [JXA Snippets Collection](https://www.seamlessio.com/articles/jxa-snippets-collection)


