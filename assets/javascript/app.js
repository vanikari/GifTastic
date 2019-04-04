// Initial array of movies
var topics = ["dog", "cat", "elephant", "rabbit", "owl", "peacock", "eagle", "chicken", "pig"];

// Function for displaying animal data
function renderButtons() {

    // Deleting the animals prior to adding new animals
    $("#buttons-view").empty();

    // Looping through the array of animals
    for (var i = 0; i < topics.length; i++) {

        // Then dynamicaly generating buttons for each animal in the array
        var animalButton = $("<button>");
        // Adding a class of animal-btn to our button
        animalButton.addClass("animal-btn");
        // Adding a data-attribute
        animalButton.attr("data-name", topics[i]);
        // Providing the initial button text
        animalButton.text(topics[i]);
        // Adding the button to the buttons-view div
        $("#buttons-view").append(animalButton);
    }
}

// This function handles events when a new animal button is clicked
$("#add-animal").on("click", function (event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    var newAnimal = $("#animal-input").val().trim();

    // Adding new animal from the textbox to our array
    topics.push(newAnimal);

    // Calling renderButtons which handles the processing of the topics array
    renderButtons();
});

// Calling the renderButtons function to display the intial buttons
renderButtons();

// displayMovieInfo function re-renders the HTML to display the appropriate content
function displayGif() {

    var animal = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=kOlvhDKNjvNmMxdhDI0Ujev6JRS0sA3m&limit=10";

    // Creating an AJAX call for the specific movie button being clicked
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);

        var results = response.data
        $("#gifs-view").empty();

        for (var i = 0; i < results.length; i++) {
            // Creating a div to hold the animal gif
            var animalDiv = $("<div class='animal'>");

            // Storing the rating data
            var rating = results[i].rating;

            // Creating an element to have the rating displayed
            var pOne = $("<p>").html("Rating: " + rating + "<br><br>");

            // Displaying the rating
            animalDiv.append(pOne);

            // Retrieving the URL for the image
            var imgURL = results[i].images.fixed_height_still.url;

            // Creating an element to hold the image
            var image = $("<img>").attr("src", imgURL);

            // Adding a class of gif to the image
            image.addClass("gif");

            // Adding an attribute data-state and setting it to still
            image.attr("data-state", "still")

            // Adding an attribute to store the index of the image
            image.attr("data-ident", i);

            // Appending the image
            animalDiv.append(image);

            // Putting the entire movie above the previous movies
            $("#gifs-view").prepend(animalDiv);
        }

        // on click evnt when clicked on an image
        $(".gif").on("click", function () {
            var state = $(this).attr("data-state");
            var index = $(this).attr("data-ident");
            // change the data-state to animate
            if (state === "still") {
                $(this).attr("src", results[index].images.fixed_height.url);
                $(this).attr("data-state", "animate");
            }
            // change the data-state to still
            else {
                $(this).attr("src", results[index].images.fixed_height_still.url);
                $(this).attr("data-state", "still");
            }

        });
    });
};

// Adding a click event listener to all elements with a class of "animal-btn"
$(document).on("click", ".animal-btn", displayGif);

