(function () {
  'use strict';
  var creativiascene = {
    'el': document.getElementById('creativiascene')
  };

  creativiascene.controller = function () {
    var ctrl = this;
    ctrl.data = {};
    creativiascene.el.addEventListener('creativiascene', function (event) {
      var body = event.detail;
      if (body.events.length === 0) {
        return;
      }
      body.events.forEach(function (e) {
        e.date = moment(e.date).lang('nb');
      });
      var eventDate = body.events[0].date,
          now = moment();
      if (eventDate.isBefore(now) || eventDate.isSame(now, 'day')) {
        body.today = body.events.shift() || null;
        console.log(body.today);
      } else {
        body.today = null;
      }
      var lines = Math.floor(((creativiascene.el.parentNode.getAttribute("data-sizey")-2)*155) / 20)
      body.events = body.events.slice(0, 4+lines);
      ctrl.data = body;
      m.render(creativiascene.el, creativiascene.view(ctrl));
    });
  };

  creativiascene.view = function (c) {
    if (Object.keys(c.data).length === 0) {
      return m('p', 'Waiting for data');
    }
    var rows = c.data.events.map(function (event) {
      return m('tr', [
        m('td', {'class': 'fade summary'}, jrvs.truncate(event.summary, 19)),
        m('td.start', event.date.format('DD. MM HH:mm'))
      ]);
    });
    return [
      m('p.fade', 'Creativia Scenen:'),
      m('h1', c.data.today ? c.data.today.date.format('HH:mm') : '--:--'),
      console.log(c.data.today.summary),
      m('h2', c.data.today ?
        jrvs.truncate(c.data.today.summary, 20) : 'Ingenting skjer!'),
      m('table', rows),
      m('p', {'class': 'fade updated-at'}, 'Sist oppdatert: ' +
        c.data.updatedAt)
    ];
  };

  if (creativiascene.el !== null) {
    m.module(creativiascene.el, creativiascene);
  }
})();
