$(function () {
    //line chart
    var ctx = document.getElementById("line-chartcanvas");
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ["{?= implode('","', $stats.poliChart.labels) ?}"],
            datasets: [{
                    label: "Pasien",
                    borderColor: "#34316E",
                    borderWidth: "2",
                    backgroundColor: "rgba(30, 30, 45, 0.2)",
                    pointHighlightStroke: "#1e1e2d",
                    pointRadius: 0,
                    data: [{?= implode(',', $stats.poliChart.visits) ?}],
                }
            ]
        },
        options: {
            legend: {
                display: false
            },
            responsive: true,
            tooltips: {
                mode: 'index',
                intersect: false
            },
            hover: {
                mode: 'nearest',
                intersect: true
            },
            maintainAspectRatio: false
        }
    });

    //Medical treatment chart
    var ctx2 = document.getElementById("medical-treatment-chart");
    var myChart2 = new Chart(ctx2, {
        type: 'line',
        data: {
            labels: ["{?= implode('","', $stats.RanapTahunChart.labels) ?}"],
            datasets: [
            {
                label: "Dirawat",
                borderColor: "#F58634",
                borderWidth: "2",
                backgroundColor: "transparent",
                pointHighlightStroke: "#1e1e2d",
                pointRadius: 0,
                data: [{?= implode(',', $stats.RanapTahunChart.visits) ?}],
            },
            {
                label: "Dirujuk",
                borderColor: "#34316E",
                borderWidth: "2",
                backgroundColor: "transparent",
                pointHighlightStroke: "#1e1e2d",
                pointRadius: 0,
                data: [{?= implode(',', $stats.RujukTahunChart.visits) ?}],
            }
            ]
        },
        options: {
            legend: {
                display: false
            },
            tooltips: {
                mode: 'index',
                intersect: false
            },
            hover: {
                mode: 'nearest',
                intersect: true
            },
            responsive: true,
            maintainAspectRatio: false
        }
    });

    //Heart surgery chart
    var ctx1 = document.getElementById("heart-surgery-chart");
    var myChart1 = new Chart(ctx1, {
        type: 'line',
        data: {
            labels: ["{?= implode('","', $stats.KunjunganTahunChart.labels) ?}"],
            datasets: [
            {
                label: "{?=date('Y')?}",
                borderColor: "#F58634",
                borderWidth: "2",
                backgroundColor: "transparent",
                pointHighlightStroke: "#1e1e2d",
                pointRadius: 0,
                data: [{?= implode(',', $stats.KunjunganTahunChart.visits) ?}],
            }
            ]
        },
        options: {
            legend: {
                display: false
            },
            responsive: true,
            tooltips: {
                mode: 'index',
                intersect: false
            },
            hover: {
                mode: 'nearest',
                intersect: true
            },
            maintainAspectRatio: false
        }
    });

    //Toal Revenue Doughnut chart
    var ctx2 = document.getElementById("total-revenue-chart");
    var myChart2 = new Chart(ctx2, {
        type: 'doughnut',
        data: {
            labels: [
                "Tunai",
                "BPJS",
                "Lain-Lain"
            ],
            datasets: [{
                backgroundColor: ["#4caf50", "#34316E", "#F58634"],
                pointRadius: 0,
                data: [{$stats.tunai.count}, {$stats.bpjs.count}, {$stats.lainnya.count}],
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
});

$(document).ready(function () {
    // Edit Hospital Info
    $('.edit-hospital-link').on('click', function (e) {
        e.preventDefault();
        $(".view-hospital-fields").hide();
        $(".edit-hospital-fields").show();
    });
    $('#update-hospital-info, #cancel-hospital-info').on('click', function (e) {
        e.preventDefault();
        $(".view-hospital-fields").show();
        $(".edit-hospital-fields").hide();
    });
});
