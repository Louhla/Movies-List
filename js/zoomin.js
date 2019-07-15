$(document).ready(function () {
    $.ajax({
        type: "GET",
        url: "https://swapi.co/api/films/",
        dataType: 'json',
        success: function (datast) {
            for (var key in datast.results) {
                var obj = datast.results[key];
                if (!window.localStorage.items) {
                    $("#movie-list").append("<li>" + obj.title + "</li>");
                } else {
                    var selectedTitlesArray = JSON.parse(localStorage.items);
                    var isSelected = false;
                    for (var index in selectedTitlesArray) {
                        if (selectedTitlesArray[index] == obj.title) {
                            isSelected = true;
                        }
                    }
                    if(isSelected){
                        $("#movie-list").append("<li class='watched'>" + obj.title + "</li>");
                    }else{
                        $("#movie-list").append("<li>" + obj.title + "</li>");
                    }
                }
            }
        }
    })
})

$("#movie-list").on("click", "li", function () {
    $(this).addClass("watched");
    var selectedMovie = $(this).html();
    store(selectedMovie);
    function store(movie) {
        if(window.localStorage.items){
            var selectedTitlesArray = JSON.parse(localStorage.items);
            selectedTitlesArray.push(movie);
            localStorage.items = JSON.stringify(selectedTitlesArray);
        }else{
            var newArr = [];
            newArr.push(movie);
            localStorage.items = JSON.stringify(newArr);

        }

    }
})