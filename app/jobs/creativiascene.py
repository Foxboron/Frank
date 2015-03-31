#!/usr/bin/env python

from jobs import AbstractJob
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


class Creativiascene(AbstractJob):

    def __init__(self, conf):
        self.interval = conf['interval']

    def get(self):
        events = []
        d = get_stuff()
        for i in d:
            if i[0].split(" ", 1)[0] in ("Game", "Live", "Workshop:", "Lecture:"):
                s = i[0].split(": ", 1)[-1]
                events.append({
                    "id": 1,
                    "summary": s,
                    "date": i[1]
                })

        return {"events": events}
