var JQ = jQuery.noConflict(); 
JQ(document).ready(function () { 
    BindEmpDetails();
    JQ('#btnAdd').click(function () {
        JQ('#mdl').css("display", "block");
    });

})
    function closeModal() {
        $('#mdl').css("display", "none");
    }


var InnerHtml = "<table id='tblEmp' class='table table-striped table-bordered table-hover'>";
InnerHtml += "<thead class='thead-dark' style='background-color: #3498db; color: white;'>";
InnerHtml = InnerHtml + "<tr><th>Name</th>"
InnerHtml = InnerHtml + "<th>Email</th>"
InnerHtml = InnerHtml + "<th>PhoneNumber</th>"
InnerHtml = InnerHtml + "<th>DateOfBirth</th>"
InnerHtml = InnerHtml + "<th>Address</th>"
InnerHtml = InnerHtml + "<th>Department</th>"
InnerHtml = InnerHtml + "<th>Salary</th>"
InnerHtml = InnerHtml + "<th>Update</th>"
InnerHtml = InnerHtml + "<th>Delete</th><tr>"
InnerHtml = InnerHtml + " </thead>"

function BindEmpDetails() {
    JQ.ajax({
        type: "Get",
        url: "/Employee/Empdetals",
        success: function (data) {

            var tbodyHTML = '<tbody>'
            JQ.each(data, function (index, employee) {
                tbodyHTML += '<tr>';
                tbodyHTML += '<td>' + employee.firstName + ' ' + employee.lastName + '</td>';
                tbodyHTML += '<td>' + employee.email +'</td>';
                tbodyHTML += '<td>' + employee.phoneNumber +'</td>';
                tbodyHTML += '<td>' + employee.dateOfBirth +'</td>';
                tbodyHTML += '<td>' + employee.address +'</td>';
                tbodyHTML += '<td>' + employee.department +'</td>';
                tbodyHTML += '<td>' + employee.salary +'</td>';
                tbodyHTML += '<td>Edit</td>';
                tbodyHTML += '<td>delete</td>';
                tbodyHTML += '</tr>';
            });
            tbodyHTML += '</tbody></table>'

            InnerHtml += tbodyHTML

            JQ('#tblDiv').html(InnerHtml)
        },
        error: function (error) {

        }

    })
}