// Function to load the CSV file
function loadCSV() {
    fetch('ELLData.csv')  
        .then(response => response.text())
        .then(csvText => {
            Papa.parse(csvText, {
                header: true,
                complete: function(results) {
                    const data = results.data;  
                    showMenu(data);  // Show menu options after CSV is loaded
                }
            });
        })
        .catch(error => {
            alert('Error loading CSV file!');
            console.error(error);
        });
}

// Function to show options after CSV is loaded
function showMenu(data) {
    const output = document.getElementById('output');
    output.innerHTML = `
        <p>Choose an option:</p>
        <button onclick="totalELL(data)">Total ELL Learners</button>
        <button onclick="studentsWithDisabilities(data)">Students with Disabilities (Michigan)</button>
        <button onclick="visualizations(data)">Show Visualizations</button>
    `;
}

// Function to show the total ELL learners in the 50 states
function totalELL(data) {
    const totalELL = data.find(row => row.State === '50 states, District of Columbia, and Puerto Rico')['Total Students'];
    alert(`Total ELLs in 50 states: ${totalELL}`);
}

// Function to show students with disabilities in Michigan
function studentsWithDisabilities(data) {
    const michiganRow = data.find(row => row.State === 'Michigan');
    const totalDisabilities = michiganRow['Students With Disabilities Served Under IDEA  Number'];
    const disabilityPercent = michiganRow['Students With Disabilities Served Under IDEA  Percent'];
    
    alert(`Total students with disabilities in Michigan: ${totalDisabilities}`);
    alert(`Percentage of students with disabilities in Michigan: ${disabilityPercent}%`);
}

// Function to show visualizations (charts)
function visualizations(data) {
    const output = document.getElementById('output');
    output.innerHTML = `
        <p>Choose a visualization:</p>
        <button onclick="barChart()">Bar Chart</button>
        <button onclick="pieChart()">Pie Chart</button>
    `;
}

// Function to create a bar chart
function barChart() {
    const ctx = document.createElement('canvas');
    document.getElementById('output').appendChild(ctx);

    const states = ['California', 'Texas', 'Florida', 'New York'];
    const ellStudents = [1090375, 954145, 290057, 241791];

    new Chart(ctx, {
        type: 'bar',  
        data: {
            labels: states,  
            datasets: [{
                label: 'ELL Students',
                data: ellStudents,  
                backgroundColor: 'skyblue'  
            }]
        }
    });
}

// Function to create a pie chart
function pieChart() {
    const ctx = document.createElement('canvas');
    document.getElementById('output').appendChild(ctx);

    const raceEthnicity = ['White', 'Hispanic/Latino', 'Black', 'Asian', 'Two or more races'];
    const percentages = [6.5, 76.5, 4.3, 10.6, 0.7];

    new Chart(ctx, {
        type: 'pie',  
        data: {
            labels: raceEthnicity,  
            datasets: [{
                data: percentages,  
                backgroundColor: ['red', 'blue', 'green', 'yellow', 'purple']  
            }]
        }
    });
}