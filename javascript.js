const container = document.getElementById('container')

function mouseOver(event) // Mouse is hovering over square
{
    const rgbButton = document.getElementById("rgb-button");
    const darkenButton = document.getElementById("darken-button");
    
    if (getComputedStyle(darkenButton).backgroundColor[9] == "1") // Darken button has been pressed
    {   
        const colour = getComputedStyle(event.target).backgroundColor; // Retrieve current square colour
        let colourArray = [0,0,0];
        let newColourArray = [0,0,0];
        let index = 0;
        for (let i = 0; i < colour.length; i++) // Convert backgroundColor string to an array of integers
        {
            if (colour[i] >= '0' && colour[i] <= '9')
            {
                colourArray[index] = colourArray[index]*10 + Number(colour[i]); // rgb value can be 1-3 digits long
            }
            else if (colour[i] == "\,") // Commas seperate rgb values
            {
                index += 1;
            }
        }
        for (let i = 0; i < 3; i++) // Reduce each rgb value by 25 to darken the square's colour
        {
            newColourArray[i] = Math.max(0, colourArray[i]-25)
        }
        
        let newColourString = "rgb("+newColourArray[0]+", "+newColourArray[1]+", "+newColourArray[2]+")"
        // Convert colour array back to string and apply new colour to square
        event.target.style.backgroundColor = newColourString;
    }
    else // Darken button off
    {
        if (getComputedStyle(rgbButton).backgroundColor[9] == "2") // Colour button off
        {
            event.target.style.backgroundColor = "black"; // Paint square black
        }
        else // Colour button on
        {
            event.target.style.backgroundColor = "#"+ Math.floor(Math.random()*16777215).toString(16); // Paint square random colour
        }
    }
}

function createGrid(gridSize) // Create n x n grid of squares
{
    const pixelSize = document.getElementById('container').clientWidth / gridSize;

    for (let i = 0; i < gridSize; i++)
    {
        for (let j = 0; j < gridSize; j++)
        {
            const square = document.createElement("div");
            square.classList.add("square");
            square.style.width = pixelSize + "px";
            square.style.height = pixelSize + "px";
            square.style.backgroundColor = "whitesmoke";
            square.style.boxSizing = "border-box";
            square.addEventListener('mouseover', mouseOver)
            container.appendChild(square);
        }
    }
}

function clearGrid(event) // Restore square colour to default light grey
{
    const squares = document.getElementsByClassName("square");
    for (let i = 0; i < squares.length; i++)
    {
        squares[i].style.backgroundColor = "whitesmoke";
    }

}

function resizeGrid(event) // Change grid dimensions
{
    const resizeInputValue = document.getElementById("resize-input").value; // Take new grid dimension from user input
    console.log(resizeInputValue);
    const resizeInputInteger = parseInt(resizeInputValue, 10); // Convert text string to integer
    console.log(resizeInputInteger);

    if (!isNaN(resizeInputInteger) && resizeInputInteger<=100) // If the number is valid and less than 100
    {
        const container = document.getElementById("container");
        const squares = document.getElementsByClassName("square");
        
        while (squares.length) // Delete all the current squares
        {
            container.removeChild(container.lastChild);
        }

        createGrid(resizeInputInteger); // Create a new grid of sqaures
    }
    else
    {
        document.getElementById("resize-input").value = ""; // Clear input element of invalid value
    }

}

function changeColours(event) // Toggle between painting with black and with random colours
{
    const rgbButton = document.getElementById("rgb-button");
    if (getComputedStyle(rgbButton).backgroundColor[9] == "2") // Default button background
    {
        rgbButton.style.backgroundColor = "#DDA0DD"; // Change to new dark background
    }
    else // Button background has already been changed, button was already pressed
    {
        rgbButton.style.backgroundColor = "#EFEFEF"; // Change back to default state

    }

}

function reduceOpacity(event) // Toggle between painting and darkening
{
    const darkenButton = document.getElementById("darken-button");
    if (getComputedStyle(darkenButton).backgroundColor[9] == "2") // Default button background
    {
        darkenButton.style.backgroundColor = "#686868";  // Change to new dark background
    }
    else // Button background has already been changed, button was already pressed
    {
        darkenButton.style.backgroundColor = "#EFEFEF"; // Change back to default state

    }

}

// Button events

const clearButton = document.getElementById('clear-button');
clearButton.addEventListener('click', clearGrid);

const resizeButton = document.getElementById('resize-button');
resizeButton.addEventListener('click', resizeGrid);

const rgbButton = document.getElementById('rgb-button');
rgbButton.addEventListener('click', changeColours);

const darkenButton = document.getElementById('darken-button');
darkenButton.addEventListener('click', reduceOpacity);

// Iniitial grid

createGrid(16);