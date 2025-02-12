// 1. Function to load the CSV file
function loadCSV() {
    fetch("data/ELLData.csv")  // Make sure this path matches the location of your CSV file
        .then(response => response.text())  // Convert to text
        .then(csvText => {
            Papa.parse(csvText, {
                header: true,  // Treat the first row as headers
                complete: function(results) {
                    const data = results.data;  
                    showMenu(data);  // Show the menu after loading the CSV
                }
            });
        })
        .catch(error => alert('Error loading the CSV file.'));
}

// 2. Function to show options for the user
function showMenu(data) {
    const output = document.getElementById('output');
    output.innerHTML = `
        <p>Choose an option:</p>
        <button onclick="totalELL(data)">Total ELL Learners</button>
        <button onclick="studentsWithDisabilities(data)">Students with Disabilities (Michigan)</button>
        <button onclick="visualizations(data)">Show Visualizations</button>
    `;
}

// 3. Function to show the total ELL learners in 50 states
function totalELL(data) {
    // Find total ELL students in the 50 states row
    const totalELL = data.find(row => row.State === '50 states, District of Columbia, and Puerto Rico')['Total Students'];
    alert(`Total ELLs in 50 states: ${totalELL}`);
}

// 4. Function to show students with disabilities in Michigan
function studentsWithDisabilities(data) {
    // Find Michigan row and get disability data
    const michiganRow = data.find(row => row.State === 'Michigan');
    const totalDisabilities = michiganRow['Students With Disabilities Served Under IDEA  Number'];
    const disabilityPercent = michiganRow['Students With Disabilities Served Under IDEA  Percent'];
    
    alert(`Total students with disabilities in Michigan: ${totalDisabilities}`);
    alert(`Percentage of students with disabilities in Michigan: ${disabilityPercent}%`);
}

// 5. Function to show visualizations (charts)
function visualizations(data) {
    const output = document.getElementById('output');
    output.innerHTML = `
        <p>Choose a visualization:</p>
        <button onclick="barChart(data)">Bar Chart</button>
        <button onclick="pieChart(data)">Pie Chart</button>
    `;
}

// 6. Function to create a bar chart
function barChart(data) {
    // Remove existing canvas if any
    document.querySelectorAll('canvas').forEach(canvas => canvas.remove());

    const ctx = document.createElement('canvas');
    document.getElementById('output').appendChild(ctx);

    // Example states and their ELL students (you can modify this with actual data)
    const states = ['California', 'Texas', 'Florida', 'New York'];
    const ellStudents = [1090375, 954145, 290057, 241791];

    new Chart(ctx, {
        type: 'bar',  // Bar chart type
        data: {
            labels: states,  // X-axis labels
            datasets: [{
                label: 'ELL Students',
                data: ellStudents,  // Data for Y-axis
                backgroundColor: 'skyblue'  // Color for the bars
            }]
        }
    });
}

// 7. Function to create a pie chart
function pieChart(data) {
    // Remove existing canvas if any
    document.querySelectorAll('canvas').forEach(canvas => canvas.remove());

    const ctx = document.createElement('canvas');
    document.getElementById('output').appendChild(ctx);

    const raceEthnicity = ['White', 'Hispanic/Latino', 'Black', 'Asian', 'Two or more races'];
    const percentages = [6.5, 76.5, 4.3, 10.6, 0.7];

    new Chart(ctx, {
        type: 'pie',  // Pie chart type
        data: {
            labels: raceEthnicity,  // Labels for the pie sections
            datasets: [{
                data: percentages,  // Data for the pie chart
                backgroundColor: ['red', 'blue', 'green', 'yellow', 'purple']  // Section colors
            }]
        }
    });
}