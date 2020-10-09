

from __future__ import print_function


r"""Adding 1 hour events to the Task Box calendar from the CLI.
The first argument is a the title of the event and the second is the summary of the event.
"""

import sys
import pickle
import os.path
from datetime import datetime, timedelta

from googleapiclient.discovery import build
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request

SCOPES = ['https://www.googleapis.com/auth/calendar']

__version__ = '0.0.1'


def create_event(summary, description, start_time_zone = 'Europe/Copenhagen', end_time_zone = 'Europe/Copenhagen'):
    """
    returns JSON description of event as string ready to sent to Google Calendar API
    has default values for start time, endtime, and timezones.
    """
    now= datetime.now()
    in1hour = now+timedelta(hours=1)

    start_time=now.strftime("%Y-%m-%dT%H:%M:%S")
    end_time=in1hour.strftime("%Y-%m-%dT%H:%M:%S")

    event = {
        'summary': summary,
        'description': description,
        'start': {
            'dateTime': start_time,
            'timeZone': start_time_zone,
        },
        'end': {
            'dateTime': end_time,
            'timeZone': end_time_zone,
        },
    }
    return event

def add_to_google_cal(event_json):
    """
        Add event, described by event_json to calendar calendar_id
    """

    calendar_id = 'n0b52mn64j556f5286i3v8ii24@group.calendar.google.com'
    pickle_location = '/Users/adkj/Documents/Task Boxes/DevTaskBoxes/Code/python/token.pickle'
    credentials_location = '/Users/adkj/Documents/Task Boxes/DevTaskBoxes/Code/python/credentials.json'
    creds = None

    # The file token.pickle stores the user's access and refresh tokens, and is
    # created automatically when the authorization flow completes for the first
    # time.
    if os.path.exists(pickle_location):
        with open(pickle_location, 'rb') as token:
            creds = pickle.load(token)
    # If there are no (valid) credentials available, let the user log in.
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(
                credentials_location, SCOPES)
            creds = flow.run_local_server(port=0)
        # Save the credentials for the next run
        with open(pickle_location, 'wb') as token:
            pickle.dump(creds, token)

    service = build('calendar', 'v3', credentials=creds)

    event = service.events().insert(calendarId=calendar_id, body=event_json).execute()
    print(f'Event created: {(event.get("htmlLink"))}')


def main():
    """
        Logic to add an event to the google calendar
    """
    summary = sys.argv[1]
    description = sys.argv[2]

    event_json = create_event(summary, description)
    add_to_google_cal(event_json)

    return()


if __name__ == "__main__":
    main()