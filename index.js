$(document).ready(function () {
    // hide all sections
    $("section").hide();

    // show welcome-section by default
    $("#welcome-section").show();
    $("#contacts").hide();
    $(".oval-content").hide();



    //  -- -- -- -- -- -- -- -- -- -- -- -- -- -- NAVIGATION  -- -- -- -- -- -- -- -- -- -- -- -- -- -- 
    // get the first nav link position and width
    var firstNavLink = $('.nav-link:first');
    $('#nav-slider').css({
        left: firstNavLink.position().left,
        width: firstNavLink.outerWidth()
    });

    // Add 'active' class to the first nav link
    firstNavLink.addClass('active');


    // event listener for nav links
    $(".nav-link").click(function () {

        $('.nav-link').removeClass('active');
        $(this).addClass('active');
        var sectionToShow = $(this).attr("data-section");

        $("section").hide();
        $("#" + sectionToShow).show();

        var isContactSection = $(this).hasClass('contact');
        if (isContactSection) {
            $('#nav-slider').css('height', '1.3em');
            $("#contacts").fadeIn();
            document.querySelector('h3').innerText = 'Contact me!'; // Corrected line

        } else {
            $("#contacts").fadeOut();
            $('#nav-slider').css('height', '0em');
            document.querySelector('h3').innerText = "Hi, I'm Alina";
        }

        $('#nav-slider').css({   // move the slider to the clicked link
            left: $(this).position().left,
            width: $(this).width() //navSliderWidth
        });
    });

    // update slider position on window resize
    $(window).on('resize', function () {
        // Get the currently active link
        var activeLink = $('.nav-link.active');

        // Update the slider's position to match the active link
        if (activeLink.length) {
            $('#nav-slider').css({
                left: activeLink.position().left,
                width: activeLink.width()
            });
        }
    });


    //  -- -- -- -- -- -- -- -- -- -- -- -- -- -- OFFSETS -- -- -- -- -- -- -- -- -- -- -- -- -- -- 
    $('.circle, .descr').each(function (i) { /* i is the index of the current element */
        var top_of_element = $(this).offset().top;
        var bottom_of_element = $(this).offset().top + $(this).outerHeight();
        var bottom_of_screen = $(window).scrollTop() + $(window).innerHeight();
        var top_of_screen = $(window).scrollTop();

        if ((bottom_of_screen > top_of_element) && (top_of_screen < bottom_of_element)) {
            // the element is visible, add the animation class
            $(this).css('animation-delay', i * 0.1 + 's').addClass('animate');
        }
    });


    //  -- -- -- -- -- -- -- -- -- -- -- -- -- -- POP-UP CIRCLES -- -- -- -- -- -- -- -- -- -- -- -- -- -- 
    $('.circle').on('click', function (e) {
        // Close the previously opened circle
        $('.circle.active').removeClass('active').css({
            width: '20em',
            height: '20em',

        });
        $('.circle-content').show(); // Show circle content for all circles
        $('.oval-content').hide(); // Show circle content for all circles


        if ($(this).hasClass('active')) {
            // If the clicked circle is already active, close it and show circle content
            e.stopPropagation();
            $(this).removeClass('active').css({
                width: '20em',
                height: '20em'
            });
            $(this).find('.oval-content').hide();
            $(this).find('.circle-content').show();
        } else {
            // If the clicked circle is not active, open it and show oval content
            $(this).addClass('active').css({
                width: '20em',
                height: '40em'
            });
            $(this).find('.circle-content').hide();
            $(this).find('.oval-content').show();

            //  -- -- -- -- -- -- -- -- -- -- -- -- -- -- CAROUSEL -- -- -- -- -- -- -- -- -- -- -- -- -- --

            let slideIndex = 0;
            let carouselContainer = $(this).find('.carousel-container');
            let slides = carouselContainer.find('.slide');
            let dots = carouselContainer.find('.dot');

            function showSlides(n) {
                if (n >= slides.length) slideIndex = 0;
                if (n < 0) slideIndex = slides.length - 1;

                slides.removeClass('active');
                dots.removeClass('active');

                slides.eq(slideIndex).addClass('active');
                dots.eq(slideIndex).addClass('active');


            }

            function currentSlide(n) {
                slideIndex = n - 1;
                showSlides(slideIndex);
            }

            $('.carousel-slide img').on('click', function () {
                let imageUrl = $(this).attr('src');
                $('.zoomed-image').attr('src', imageUrl);

                // Show the modal
                $('#imageModal').css('display', 'block');
            });


            // Add event listener to dots
            dots.on('click', function (e) {
                e.stopPropagation();
                currentSlide($(this).index() + 1);
            });

            $('.modal-close-button').on('click', function () {
                $('#imageModal').css('display', 'none');
            });

            showSlides(slideIndex);
        }
    });

    // Close button click event
    $('.close-button').on('click', function (e) {
        e.stopPropagation();
        $(this).closest('.circle').removeClass('active').css({
            width: '20em',
            height: '20em'
        });
        $(this).closest('.circle').find('.oval-content').hide();
        $(this).closest('.circle').find('.circle-content').show();
    });



});


    //  -- -- -- -- -- -- -- -- -- -- -- -- -- -- POP-UP GALLERY -- -- -- -- -- -- -- -- -- -- -- -- -- --
/* $('.prevButton').on('click', function (e) {
     e.stopPropagation();
 
     var imageDiv = $(this).closest('.circle');
     var images = imageDiv.data('images');
     var currentImage = imageDiv.data('currentImage');
 
     if (currentImage > 0) {
         currentImage--;
         imageDiv.data('currentImage', currentImage);
         imageDiv.find('.galleryImage').attr('src', images[currentImage]);
     }
 });
 
 $('.nextButton').on('click', function (e) {
     e.stopPropagation();
 
     var imageDiv = $(this).closest('.circle');
     var images = imageDiv.data('images');
     var currentImage = imageDiv.data('currentImage');
 
     if (currentImage < images.length - 1) {
         currentImage++;
         imageDiv.data('currentImage', currentImage);
         imageDiv.find('.galleryImage').attr('src', images[currentImage]);
     }
 });
 
 
 
});
 
document.addEventListener("DOMContentLoaded", function () {
 // your existing code
 document.getElementsByClassName('close-button')[0].addEventListener('click', function () {
     document.getElementById('popupWindow').style.display = "none";
 });
 
 window.addEventListener('click', function (event) {
     if (event.target == document.getElementById('popupWindow')) {
         document.getElementById('popupWindow').style.display = "none";
     }
 });
 
 document.getElementById('prevButton').addEventListener('click', showPreviousImage);
 document.getElementById('nextButton').addEventListener('click', showNextImage);
 
 var currentImageIndex = 0;
 var imagesArray = [];
});
 
 
 
function openPopupWindow(title, description, images) {
 document.getElementById('popupWindow').style.display = "block";
 document.getElementById('popupTitle').innerText = title;
 document.getElementById('popupDescription').innerText = description.replace('\n', '<br>');
 imagesArray = images;
 currentImageIndex = 0;
 displayImage(currentImageIndex);
}
 
function displayImage(index) {
 var gallery = document.getElementById('gallery');
 gallery.innerHTML = '';
 var img = document.createElement('img');
 img.src = imagesArray[index];
 gallery.appendChild(img);
}
 
function showPreviousImage() {
 if (currentImageIndex > 0) {
     currentImageIndex--;
     displayImage(currentImageIndex);
 }
}
 
function showNextImage() {
 if (currentImageIndex < imagesArray.length - 1) {
     currentImageIndex++;
     displayImage(currentImageIndex);
 }
}*/