#!/usr/bin/env python

from jobs import AbstractJob
import requests
import json


class Kiosk(AbstractJob):

    def __init__(self, conf):
        self.interval = conf['interval']

    def get(self):
        return {}
