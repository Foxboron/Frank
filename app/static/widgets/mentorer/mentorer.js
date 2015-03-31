    var prevMentors;

    clearImpressMentors();

    // Define impress and get it to run
    var impMentors = impress("mentorer");
    var impressMentors;

    var rMentors = 0;


    function clearImpressMentors()
    {

        $.ajax({
            method: 'GET',
            crossDomain: true,
            url: 'http://localhost:5000/mentorer',
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

                if (html != prevMentors) {
                    prevMentors = html;
                    $('#mentorer').empty();
                    $('#mentorer').append(html);

                    impressMentors = impMentors;
                    impressMentors.init();
                    impressMentors.goto(0, 0);
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
            rMentors++;
            if (rMentors%2==1)
            {
                clearImpressMentors();
            }
        }

        if (typeof timing !== 'undefined') clearInterval(timing);
        var duration = (e.target.getAttribute('data-transition-duration') ? e.target.getAttribute('data-transition-duration') : 2000); // use the set duration or fallback to 2000ms
        timing = setInterval(impressMentors.next, duration);
    });
