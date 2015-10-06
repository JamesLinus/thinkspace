$(function() {
  // smooth scroll to anchor & active nav
  $('header li > a.scrollto').on('click', function(event) {
    event.preventDefault();
    var anchor = $(this);

    $('header li > a.scrollto').removeClass('active');
    $(this).addClass('active');

    $('html, body').animate({
      scrollTop: $('.' + anchor.attr('href')).offset().top - 75
    }, 1500);
  });

  // sending form thourght formspree
  $('form[name="contact"]').on('submit', function(e) {
    e.preventDefault();

    // hide notice message
    $('.contact__message').hide();

    var first_name = $('#first_name').val(),
        last_name = $('#last_name').val(),
        corporate_name = $('#corporate_name').val(),
        label_people_number = $('#label_people_number').val(),
        email = $('#email').val(),
        phone = $('#phone').val(),
        message = $('#message').val();

    $.ajax({
        url: "//formspree.io/" + APP.contact_email,
        method: "POST",
        data: {
          first_name: first_name,
          last_name: last_name,
          corporate_name: corporate_name,
          label_people_number: label_people_number,
          phone: phone,
          email: email,
          message: message
        },
        dataType: "json"
    }).done(function(response) {
      if (response.success === "email sent" ) {
        // on success
        $('.contact__message.success').show();

        return;
      } else {
        // on error
        $('.contact__message.error').show();
      }
    });
  });

    // google map
    var marker;

    function initMap() {
      var myLatLng = {lat: 46.519276, lng: 6.638259};

      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 16,
        scrollwheel:  false,
        disableDefaultUI: true,
        center: myLatLng
      });

      marker = new google.maps.Marker({
        map: map,
        draggable: false,
        animation: google.maps.Animation.DROP,
        position: myLatLng
      });

      marker.addListener('click', toggleBounce);
    }

    function toggleBounce() {
      if (marker.getAnimation() !== null) {
        marker.setAnimation(null);
      } else {
        marker.setAnimation(google.maps.Animation.BOUNCE);
      }
    }

    function outputUpdate(vol) {
    	document.querySelector('#label_people_number').value = vol;
    }

    google.maps.event.addDomListener(window, 'load', initMap);
});
