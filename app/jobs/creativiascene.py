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
        if isinstance(i, Event) and not "Deadline" in i["SUMMARY"]:
            dt = i["DTSTART"].dt
            try:
                end_dt = i["DTEND"].dt
            except:
                pass
            else:
                naive = dt.replace(tzinfo=None)
                if naive >= datetime.utcnow():
                    naive = naive.strftime('%Y-%m-%dT%H:%M:%S.%fZ')
                    end_naive = end_dt.replace(tzinfo=None)
                    end_naive = end_naive.strftime('%Y-%m-%dT%H:%M:%S.%fZ')
                    l = [naive, end_naive]
                    times[i["SUMMARY"].split("#",1)[0]] = l

    d = sorted(times.items(), key=lambda x: x[1][0])
    return d


class Creativiascene(AbstractJob):

    def __init__(self, conf):
        self.interval = conf['interval']

    def get(self):
        events = []
        d = get_stuff()
        for i in d:
            if i[0].split(" ", 1)[0] in ("Meet", "Game", "Live", "Workshop:", "Lecture:","Cosplay"):
                print i
                s = i[0].split(": ", 1)[-1]
                events.append({
                    "id": 1,
                    "summary": s,
                    "startdate": i[1][0],
                    "enddate":i[1][1]
                })

        return {"events": events}
