(function () {
  'use strict';

  var kiosk = {
    'el': document.getElementById('kiosk')
  };

    // Save the previous state
  // kiosk.controller = function () {
  //   var ctrl = this;
  //   ctrl.data = {};
  //   kiosk.el.addEventListener('kiosk', function (event) {
  //     ctrl.data = event.detail;
  //     m.render(kiosk.el, kiosk.view(ctrl));
  //   });
  // };

  // kiosk.view = function (ctrl) {
  //   if (Object.keys(ctrl.data).length === 0) {
  //     return m('p', 'Waiting for data');
  //   }
  //   return [
  //     m('pre', JSON.stringify(ctrl.data, null, '  '))
  //   ];
  // };

  // if (kiosk.el !== null) {
  //   m.module(kiosk.el, kiosk);
  // }
})();

    var prevKiosk;

    clearKiosk();

    // Define impress and get it to run
    var impKiosk = impress("kiosk");
    var impressKiosk;

    var rKiosk = 0;


    function clearKiosk()
    {

        $.ajax({
            method: 'GET',
            crossDomain: true,
            url: 'http://localhost:5000/kiosk',
            success: function (data, status, xhr) {
                var d = JSON.parse(data);

                var html = '';
                $(d.data).each(function(i){
                    html += '<div class="step" data-y="'+ i*2000 +'">'+ d.data[i].content +'</div>';

                    // Clone the first slide to create a full circle
                    if (i == d.data.length -1) {
                        html += '<div class="step laststep" data-y="'+ (i+1)*2000 +'">'+ d.data[0].content +'</div>';
                    }
                });

                if (html != prevKiosk) {
                    prevKiosk = html;
                    $('#kiosk').empty();
                    $('#kiosk').append(html);

                    impressKiosk = impKiosk;
                    impressKiosk.init();
                    impressKiosk.goto(0, 0);
                }
            },
            error: function (xhr, status, error) {
                console.log(status.text);
            }
        });
    }


    document.addEventListener('impress:stepenter', function(e){
        if ($(e.target).hasClass('laststep')) {
            // Don't spam the API
            rKiosk++;
            if (rKiosk%2==1)
            {
                clearKiosk();
            }
        }

        if (typeof timing !== 'undefined') clearInterval(timing);
        var duration = (e.target.getAttribute('data-transition-duration') ? e.target.getAttribute('data-transition-duration') : 2000); // use the set duration or fallback to 2000ms
        timing = setInterval(impressKiosk.next, duration);
    });
