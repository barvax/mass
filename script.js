var progressValues = [23, 44, 98,3, 12, 77,33]; // Initial progress values for each progress bar
var progressBars = document.querySelectorAll('.progress-bar');
var percentageTexts = document.querySelectorAll('.percentage');
var currentValue;
var currentCell;
var currentColorCell;



function readExcelFile() {
    var input = document.getElementById('excelFileInput');
    var file = input.files[0];
    var reader = new FileReader();
  
    reader.onload = function(e) {
      var data = new Uint8Array(e.target.result);
      var workbook = XLSX.read(data, { type: 'array' });
      var sheetName = workbook.SheetNames[0];
      var worksheet = workbook.Sheets[sheetName];
      var jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
  
      var tableElement = createTableFromData(jsonData);
      document.body.appendChild(tableElement);
    };
  
    reader.readAsArrayBuffer(file);
  }
  
  function createTableFromData(data) {
    var table = document.createElement('table');
    table.id = "table-data"
    var thead = document.createElement('thead');
    var tbody = document.createElement('tbody');
  
    // Create table header (thead)
    var headerRow = document.createElement('tr');
    data[0].forEach(function (cellData) {
      var th = document.createElement('th');
      th.textContent = cellData;
      headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);
  
    // Create table body (tbody)
    for (var i = 1; i < data.length; i++) {
      var row = document.createElement('tr');
      data[i].forEach(function (cellData) {
        var cell = document.createElement('td');
         var colors = document.createElement('div');
        colors.innerHTML+=(`<div class="ron">
        <div ></div>
        <div ></div>
        <div ></div>
        <div ></div>
        <div ></div>
    </div>`)
        cell.textContent = cellData;
        cell.dataArr = [false,false,false,false,false,false]
        
        
        cell.addEventListener("click",(e)=>{
            console.log(e.target.textContent);
            currentValue = Number(e.target.textContent);
            currentCell = cell;
            currentColorCell=colors;
      console.log(cell.dataArr);
            openPopup(cell.dataArr);
        })
       
        row.appendChild(cell);
        cell.appendChild(colors);

   
      });
      tbody.appendChild(row);
    }
    table.appendChild(tbody);
  var myTable =document.getElementById("table");
  myTable.appendChild(table);
    return table;
  }
  

  
  function updateProgressBars() {
    progressBars.forEach(function(progressBar, index) {
      var progress = progressValues[index];
      var circumference = 2 * Math.PI * progressBar.getAttribute('r');
      var offset = circumference - (progress / 100) * circumference;
    
      // Update progress bar stroke dashoffset
      progressBar.style.strokeDashoffset = offset;
    
      // Update percentage text
      percentageTexts[index].textContent = `${progress}%`;
    });
  }
  
  // Example usage: Update progress after a delay
  setTimeout(function() {
   // progressValues = [80, 30, 60, 50, 20, 70]; // New progress values for each progress bar
    updateProgressBars();
  }, 2000);

  
  var tableCells = document.querySelectorAll('#table-data td');
var popupOverlay = document.querySelector('.popup-overlay');
var closeBtn = document.querySelector('.close-button');

// Add click event listener to each table cell
tableCells.forEach(function(cell) {
  cell.addEventListener('click', function() {
    openPopup();
  });
});

// Function to open the pop-up dialog
function openPopup(z) {
    var index = 0;
  popupOverlay.style.display = 'block';
  checkboxes.forEach(function (checkbox) {
   //var x = checkbox.target.checked ;
   console.log(checkbox.checked);
   checkbox.checked = z[index];
   index++;
  });
}

// Function to close the pop-up dialog
function closePopup() {
  popupOverlay.style.display = 'none';
}

// Add click event listener to the close button
closeBtn.addEventListener('click', function() {
  closePopup();
});


// Get all checkbox elements
const checkboxes = document.querySelectorAll('.checkboxes input[type="checkbox"]');

// Add event listener to each checkbox
checkboxes.forEach(function (checkbox) {
  checkbox.addEventListener('change', function (e) {
    console.log(currentCell.dataArr)
    if (e.target.checked) {
        var root = currentColorCell.children[0];
     
     if(e.target.value=="Chemical Yield"){
        console.log(e.target.value);
        currentCell.dataArr[0]=true;
        progressValues[0]+=currentValue;
       
        root.children[0].classList.add('chemical-yield-line');   
       
     }else if(e.target.value=="Isolated Yield"){
        currentCell.dataArr[1]=true;
        progressValues[1]+=currentValue;
        root.children[1].classList.add('isolated-yield-line')
     }else if(e.target.value=="Yield Loss"){
        currentCell.dataArr[2]=true;
        progressValues[2]+=currentValue;
        root.children[2].classList.add('Yield-Loss')
     }else if(e.target.value=="Recovery"){
        currentCell.dataArr[3]=true;
        progressValues[3]+=currentValue;
        root.children[3].classList.add('Recovery')
     }else if(e.target.value=="Imp Loss"){
        currentCell.dataArr[4]=true;
        progressValues[4]+=currentValue;
        root.children[4].classList.add('Imp-Loss')
     }
    } else {
        var root = currentColorCell.children[0];
      console.log('Checkbox unmarked:', e.target.value);
      if(e.target.value=="Chemical Yield"){
        console.log(e.target.value);
        currentCell.dataArr[0]=false;
        progressValues[0]-=currentValue;
        root.children[0].classList.remove('chemical-yield-line');   
       
     }else if(e.target.value=="Isolated Yield"){
        currentCell.dataArr[1]=false;
        progressValues[1]-=currentValue;
        root.children[1].classList.remove('isolated-yield-line')
     }else if(e.target.value=="Yield Loss"){
        currentCell.dataArr[2]=false;
        progressValues[2]-=currentValue;
        root.children[2].classList.remove('Yield-Loss')
     }else if(e.target.value=="Recovery"){
        currentCell.dataArr[3]=false;
        progressValues[3]-=currentValue;
        root.children[3].classList.remove('Recovery')
     }else if(e.target.value=="Imp Loss"){
        currentCell.dataArr[4]=false;
        progressValues[4]-=currentValue;
        root.children[4].classList.remove('Imp-Loss')
     }
      // Perform any desired actions when the checkbox is unmarked
    }
  });
});

function updateProgressBarValues(){
    setTimeout(function() {
        // progressValues = [80, 30, 60, 50, 20, 70]; // New progress values for each progress bar
         updateProgressBars();
       }, 2000);

       closePopup();
}
var collapsibleBtn = document.querySelector('.collapsible');
var content = document.querySelector('.content');

collapsibleBtn.addEventListener('click', function() {
  content.classList.toggle('show');
});
  