// get all workout data from back-end

fetch("/api/timesheets/tasks")
    .then(response => {
        return response.json();
    })
    .then(data => {
        console.log(data)
        populateChart(data);
    });

function generatePalette() {
    const arr = [
        "#003f5c",
        "#2f4b7c",
        "#665191",
        "#a05195",
        "#d45087",
        "#f95d6a",
        "#ff7c43",
        "ffa600",
        "#003f5c",
        "#2f4b7c",
        "#665191",
        "#a05195",
        "#d45087",
        "#f95d6a",
        "#ff7c43",
        "ffa600"
    ]

    return arr;
}
function populateChart(data) {
    let durations = duration(data);
    let timespent = calculateTotalTime(data);
    let tasks = taskNames(data);
    let categories = categoryNames(data);
    const colors = generatePalette();

    let line = document.querySelector("#canvas").getContext("2d");
    let bar = document.querySelector("#canvas2").getContext("2d");
    let pie = document.querySelector("#canvas3").getContext("2d");
    let pie2 = document.querySelector("#canvas4").getContext("2d");

    let lineChart = new Chart(line, {
        type: "line",
        data: {
            labels: [
                "Sunday",
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday"
            ],
            datasets: [
                {
                    label: "Duration In Minutes",
                    backgroundColor: "red",
                    borderColor: "red",
                    data: durations,
                    fill: false
                }
            ]
        },
        options: {
            responsive: true,
            title: {
                display: true
            },
            scales: {
                xAxes: [
                    {
                        display: true,
                        scaleLabel: {
                            display: true
                        }
                    }
                ],
                yAxes: [
                    {
                        display: true,
                        scaleLabel: {
                            display: true
                        }
                    }
                ]
            }
        }
    });

    let barChart = new Chart(bar, {
        type: "bar",
        data: {
            labels: [
                "Sunday",
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
            ],
            datasets: [
                {
                    label: "Pounds",
                    data: durations,
                    backgroundColor: [
                        "rgba(255, 99, 132, 0.2)",
                        "rgba(54, 162, 235, 0.2)",
                        "rgba(255, 206, 86, 0.2)",
                        "rgba(75, 192, 192, 0.2)",
                        "rgba(153, 102, 255, 0.2)",
                        "rgba(255, 159, 64, 0.2)"
                    ],
                    borderColor: [
                        "rgba(255, 99, 132, 1)",
                        "rgba(54, 162, 235, 1)",
                        "rgba(255, 206, 86, 1)",
                        "rgba(75, 192, 192, 1)",
                        "rgba(153, 102, 255, 1)",
                        "rgba(255, 159, 64, 1)"
                    ],
                    borderWidth: 1
                }
            ]
        },
        options: {
            title: {
                display: true,
                text: "Pounds Lifted"
            },
            scales: {
                yAxes: [
                    {
                        ticks: {
                            beginAtZero: true
                        }
                    }
                ]
            }
        }
    });

    let pieChart = new Chart(pie, {
        type: "pie",
        data: {
            labels: tasks,
            datasets: [
                {
                    label: "Excercises Performed",
                    backgroundColor: colors,
                    data: durations
                }
            ]
        },
        options: {
            title: {
                display: true,
                text: "Excercises Performed"
            }
        }
    });

    let donutChart = new Chart(pie2, {
        type: "doughnut",
        data: {
            labels: categories,
            datasets: [
                {
                    label: "Excercises Performed",
                    backgroundColor: colors,
                    data: categories
                }
            ]
        },
        options: {
            title: {
                display: true,
                text: "Excercises Performed"
            }
        }
    });
}

function duration(data) {
    let durations = [];

    data.forEach(timesheet => {
        //   console.log(timesheet.timespent);
        durations.push(timesheet.timespent);
        //   console.log(durations);
        // timesheet.timespent.forEach(timesheet => {
        //   durations.push(timesheet.timespent);
        // });
    });

    return durations;
}

function calculateTotalTime(data) {
    let totalTasks = [];
    let totalCategories = [];
    const tasksList = [...new Set(data.map(x => x.task))]
    const categoryList = [...new Set(data.map(x => x.task))]
    for (i = 0; i < tasksList.length; i++) {
        let value = data.filter((tasks) => {
            return tasks.task === tasksList[i];
        }).map((tasks) => {
            console.log(tasks.timespent)
            return tasks.timespent;
        }).reduce((total, tasks) => {
            return total + tasks.timespent;
        });
        totalTasks.push({"Name": tasksList[i]}, {"Time": value});
        // console.log(total)
    };
    console.log(totalTasks);
    return totalTasks;
}

function taskNames(data) {

    const tasksList = [...new Set(data.map(x => x.task))]
    return tasksList;
}

function categoryNames(data) {
    const categoryList = [...new Set(data.map(x => x.category))]
    console.log(categoryList);
    return categoryList;
}