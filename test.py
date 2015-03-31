
from icalendar.cal import *
from datetime import datetime
import operator


def get_stuff():
    s = open("basic.ics").read()

    s = Calendar().from_ical(s)

    times = {}

    for i in s.subcomponents:
        if isinstance(i, Event):
            dt = i["DTSTART"].dt
            naive = dt.replace(tzinfo=None)
            if naive >= datetime.utcnow():
                naive = naive.strftime('%Y-%m-%dT%H:%M:%S.%fZ')
                times[i["SUMMARY"].split("#",1)[0]] = naive

    d = sorted(times.items(), key=operator.itemgetter(1))
    return d


d = get_stuff()
