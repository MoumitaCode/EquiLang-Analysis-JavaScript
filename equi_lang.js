let barChartInstance = null;
let pieChartInstance = null;

// Function to display Total ELL Students in 50 States
function totalELL() {
    document.getElementById("output").innerHTML = "<p>Total ELLs in 50 states: 4,754,139</p>";
}

// Function to display Students with Disabilities in Michigan
function studentsWithDisabilities() {
    document.getElementById("output").innerHTML = "<p>Total students with disabilities in Michigan: 660,357</p><p>Percentage: 13.9%</p>";
}

// Function to show Bar Chart
function showBarChart() {
    document.getElementById("barChart").style.display = "block";

    const ctx = document.getElementById("barChart").getContext("2d");

    // Destroy previous instance if it exists
    if (barChartInstance) {
        barChartInstance.destroy();
    }

    barChartInstance = new Chart(ctx, {
        type: "bar",
        data: {
            labels: ["California", "Texas", "Florida", "New York"],
            datasets: [
                {
                    label: "ELL Students",
                    data: [1090375, 954145, 290057, 241791],
                    backgroundColor: "skyblue",
                },
                {
                    label: "Number of Schools",
                    data: [10121, 8758, 3976, 4873],
                    backgroundColor: "green",
                }
            ]
        }
    });
}

// Function to show Pie Chart
function showPieChart() {
    document.getElementById("pieChart").style.display = "block";

    const ctx = document.getElementById("pieChart").getContext("2d");

    // Destroy previous instance if it exists
    if (pieChartInstance) {
        pieChartInstance.destroy();
    }

    pieChartInstance = new Chart(ctx, {
        type: "pie",
        data: {
            labels: ["White", "Hispanic/Latino", "Black", "Asian", "Two or more races"],
            datasets: [{
                data: [6.5, 76.5, 4.3, 10.6, 0.7],
                backgroundColor: ["blue", "red", "yellow", "purple", "orange"]
            }]
        }
    });
}