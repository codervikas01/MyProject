//var JQ = jQuery.noConflict(); 
$(document).ready(function () { 
    BindEmpDetails();
})

var InnerHtml = "<table id='tblEmp'><thead>"
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
    $.ajax({
        type: "Get",
        url: "/Employee/Empdetals",
        success: function (data) {

            var tbodyHTML = '<tbody>'
            $.each(data, function (index, employee) {
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

            $('#tblDiv').html(InnerHtml)
        },
        error: function (error) {

        }

    })
}