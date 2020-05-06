$(document).ready(function () {
    var ctx = document.getElementById('orderChart')
    if(ctx){
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
    }
    categories = JSON.parse($('#JSONcategories').text())
    hierarchy = 0
    function getMenuItem(data) {
        $.each(data, function(i, item) {
            hierarchyText = ''
            for (let index = 0; index < hierarchy; index++) {
                hierarchyText += '-'
            }
            console.log(hierarchyText + data[i].name)
            if(data[i].child.length > 0){
                hierarchy++
                getMenuItem(data[i].child)
                hierarchy--
            }
        })
    }
    getMenuItem(categories)
})