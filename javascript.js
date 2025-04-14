const container = document.getElementById('container')

function mouseOver(event)
{
    const rgbButton = document.getElementById("rgb-button");
    const darkenButton = document.getElementById("darken-button");
    
    if (getComputedStyle(darkenButton).backgroundColor[9] == "1")
    {
        const colour = getComputedStyle(event.target).backgroundColor;
        let colourArray = [0,0,0];
        let newColourArray = [0,0,0];
        let index = 0;
        for (let i = 0; i < colour.length; i++)
        {
            if (colour[i] >= '0' && colour[i] <= '9')
            {
                colourArray[index] = colourArray[index]*10 + Number(colour[i]);
            }
            else if (colour[i] == "\,")
            {
                index += 1;
            }
        }
        for (let i = 0; i < 3; i++)
        {
            newColourArray[i] = Math.max(0, colourArray[i]-25)
        }
        
        let newColourString = "rgb("+newColourArray[0]+", "+newColourArray[1]+", "+newColourArray[2]+")"

        event.target.style.backgroundColor = newColourString;
    }
    else
    {
        if (getComputedStyle(rgbButton).backgroundColor[9] == "2")
        {
            event.target.style.backgroundColor = "black";
        }
        else
        {
            event.target.style.backgroundColor = "#"+ Math.floor(Math.random()*16777215).toString(16);
        }
    }
}

function createGrid(gridSize)
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

function clearGrid(event)
{
    const squares = document.getElementsByClassName("square");
    for (let i = 0; i < squares.length; i++)
    {
        squares[i].style.backgroundColor = "whitesmoke";
    }

}

function resizeGrid(event)
{
    const resizeInputValue = document.getElementById("resize-input").value;
    console.log(resizeInputValue);
    const resizeInputInteger = parseInt(resizeInputValue, 10);
    console.log(resizeInputInteger);

    if (!isNaN(resizeInputInteger) && resizeInputInteger<=100)
    {
        const container = document.getElementById("container");
        const squares = document.getElementsByClassName("square");
        
        while (squares.length)
        {
            container.removeChild(container.lastChild);
        }

        createGrid(resizeInputInteger);
    }
    else
    {
        document.getElementById("resize-input").value = "";
    }

}

function changeColours(event)
{
    const rgbButton = document.getElementById("rgb-button");
    if (getComputedStyle(rgbButton).backgroundColor[9] == "2")
    {
        rgbButton.style.backgroundColor = "#DDA0DD";
    }
    else
    {
        rgbButton.style.backgroundColor = "#EFEFEF";

    }

}

function reduceOpacity(event)
{
    const darkenButton = document.getElementById("darken-button");
    if (getComputedStyle(darkenButton).backgroundColor[9] == "2")
    {
        darkenButton.style.backgroundColor = "#686868";
    }
    else
    {
        darkenButton.style.backgroundColor = "#EFEFEF";

    }

}

const clearButton = document.getElementById('clear-button');
clearButton.addEventListener('click', clearGrid);

const resizeButton = document.getElementById('resize-button');
resizeButton.addEventListener('click', resizeGrid);

const rgbButton = document.getElementById('rgb-button');
rgbButton.addEventListener('click', changeColours);

const darkenButton = document.getElementById('darken-button');
darkenButton.addEventListener('click', reduceOpacity);


createGrid(16);