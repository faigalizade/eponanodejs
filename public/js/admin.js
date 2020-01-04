$(document).ready(function () {
    var ctx = document.getElementById('orderChart')
    var chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['25', '26', '27', '28', '29', '30', '31'],
            datasets: [{
                label: 'December',
                backgroundColor: '#3f72af',
                borderColor: '#3f72af',
                data: [0, 10, 5, 2, 20, 30, 45]
            }]
        },

        // Configuration options go here
        options: {}
    })
})