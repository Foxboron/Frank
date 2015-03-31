#!/usr/bin/env python

from jobs import AbstractJob


class Mentorer(AbstractJob):

    def __init__(self, conf):
        self.interval = conf['interval']

    def get(self):
        return {}
