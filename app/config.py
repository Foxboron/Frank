# Main configuration file for jarvis2
#
# Please see WIDGETS.md for more detailed documentation.

JOBS = {}

JOBS['yr'] = {
    # Enable job
    'enabled': True,
    # Run job every N seconds
    'interval': 600,
    # URL for data
    'url': ('http://www.yr.no/sted/Norge/Hedmark/Hamar/Hamar/'
            'Hamar/varsel.xml'),
    # Job timeout in seconds
    'timeout': 5
}

JOBS['time'] = {
    'enabled': True
}

JOBS['deadlines'] = {
    'enabled': True,
    'interval': 600,
}

JOBS['creativiascene'] = {
    'enabled': True,
    'interval': 600,
}

JOBS['kiosk'] = {
    'enabled': True,
    'interval': 600,
}
JOBS['mentorer'] = {
    'enabled': True,
    'interval': 600,
}
JOBS['uptime'] = {
    'enabled': True,
    'interval': 60,
    'hosts': [
        {
            'label': 'Router',
            'ip': 'ip.addr'
        },
        {
            'label': 'Laptop',
            'ip': 'ip.addr'
        }
    ],
    'timeout': 5
}

JOBS['ping'] = {
    'enabled': True,
    'interval': 3,
    'hosts': [
        ('google.com', 'google.com'),
    ],
    'timeout': 1
}

JOBS['stats'] = {
    'enabled': True,
    'interval': 600,
    'nick': 'nick',
    'max': {
        'coffee': 8,
        'beer': 10
    },
    'timeout': 5
}

