$(document).ready(function () {
    // Init
    $('.image-section').hide();
    $('.loader').hide();
    $('#result').hide();

    // Predict
    $('#btn-predict').click(function () {
        var form_data = new FormData($('#upload-file')[0]);

        // Show loading animation
        $(this).hide();
        $('.loader').show();

        // Make prediction by calling api /predict
        $.ajax({
            type: 'POST',
            url: '/predict',
            data: form_data,
            contentType: false,
            cache: false,
            processData: false,
            dataType: 'json',  // Add this line to expect a JSON response
            async: true,
            success: function (data) {
                // Get and display the result
                $('.loader').hide();
                $('#result').fadeIn(600);
                $('#result').text('Prediction: ' + data.prediction + ' Accuracy: ' + data.accuracy + ' Label: ' + data.label);

                // Display the single random image from the npy file
                var image_base64_list = data.image_base64_list;
                $('#image-container').empty();
                for (var i = 0; i < image_base64_list.length; i++) {
                    var image_base64 = image_base64_list[i];
                    var img_element = $('<img class="uploaded_image">');
                    img_element.attr('src', 'data:image/png;base64,' + image_base64);
                    $('#image-container').append(img_element);
                }

                // Show the image section
                $('.image-section').show();

                console.log('Success!');
            },
            error: function (xhr, status, error) {
                console.log(xhr.responseText);
                $('#result').text('Oops! Something went wrong. Please try again later.');
            }
        });
    });
});





