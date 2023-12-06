var JQ = jQuery.noConflict();
JQ(document).ready(function () {
    BindEmpDetails();
    JQ('#btnAdd').click(function () {
        JQ('#mdl').css("display", "block");
    });

})
function closeModal() {
    JQ('#mdl').css("display", "none");
}


var InnerHtml = "<table id='tblEmp' class='table table-striped table-bordered table-hover'>";
InnerHtml += "<thead class='thead-dark' style='background-color: #3498db; color: white;'>";
InnerHtml += "<tr><th>Name</th>"
InnerHtml += "<th>Email</th>"
InnerHtml += "<th>PhoneNumber</th>"
InnerHtml += "<th>DateOfBirth</th>"
InnerHtml += "<th>Address</th>"
InnerHtml += "<th>Department</th>"
InnerHtml += "<th>Salary</th>"
InnerHtml += "<th>Update</th>"
InnerHtml += "<th>Delete</th><tr>"
InnerHtml += " </thead>"

function BindEmpDetails() {
    JQ.ajax({
        type: "Get",
        url: "/Employee/Empdetals",
        success: function (data) {

            var tbodyHTML = '<tbody>'
            JQ.each(data, function (index, employee) {
                tbodyHTML += '<tr>';
                tbodyHTML += '<td>' + employee.firstName + ' ' + employee.lastName + '</td>';
                tbodyHTML += '<td>' + employee.email + '</td>';
                tbodyHTML += '<td>' + employee.phoneNumber + '</td>';
                tbodyHTML += '<td>' + employee.dateOfBirth + '</td>';
                tbodyHTML += '<td>' + employee.address + '</td>';
                tbodyHTML += '<td>' + employee.department + '</td>';
                tbodyHTML += '<td>' + employee.salary + '</td>';
                tbodyHTML += '<td><button class="edit-button" data-employee-id="' + employee.employeeId + '">Edit</button></td>';
                tbodyHTML += '<td><button class="delete-button" data-employee-id="' + employee.employeeId + '">delete</td>';
                tbodyHTML += '</tr>';
            });
            tbodyHTML += '</tbody></table>'

            InnerHtml += tbodyHTML

            JQ('#tblDiv').html(InnerHtml);

            JQ('.edit-button').on('click', function () {
                var employeeId = JQ(this).data('employee-id');
                EditPopUp(employeeId);
            });

            JQ('.delete-button').on('click', function () {
                var employeeId = JQ(this).data('employee-id');
                Delete(employeeId);
            });

        },
        error: function (error) {

        }
    })
}

function EditPopUp(id) {
    JQ('#mdl').css("display", "block");
    // You can use the 'id' parameter to do further processing or open a modal for the specific employee.
}

function Delete(id) {
    alert(id)
}
function AddEmp() {
    JQ("#Empform").validate({
        rules: {
            FirstName: {
                required: true,
                minlength: 2
            },
            LastName: {
                required: true,
                minlength: 2
            },
            Email: {
                required: true,
                email: true
            },
            PhoneNumber: {
                required: true,
            },
            DOB: {
                required: true,
            },
            Address: {
                required: true,
            },
            Department: {
                required: true,
            },
            Salary: {
                required: true,
            },
        },
        messages: {
            FirstName: {
                required: "Please enter the first name",
                minlength: "First name must be at least 2 characters long"
            },
            LastName: {
                required: "Please enter the last name",
                minlength: "Last name must be at least 2 characters long"
            },
            Email: {
                required: "Please enter the email address",
                email: "Please enter a valid email address"
            },
            PhoneNumber: {
                required: "Please enter the phone number",
            },
            DOB: {
                required: "Please enter the Date Of Birth",
            },
            Address: {
                required: "Please enter the Address",
            },
            Department: {
                required: "Please enter the Department",
            },
            Salary: {
                required: "Please enter the Salary",
            },
        },
        submitHandler: function (form) {
            SaveEmp();
        }
    });
}

function SaveEmp() {

    var employee = {
        firstName: JQ('#fname').val(),
        lastName: JQ('#lname').val(),
        email: JQ('#email').val(),
        phoneNumber: JQ('#phoneNumber').val(),
        dateOfBirth: JQ('#dob').val(),
        address: JQ('#address').val(),
        department: JQ('#department').val(),
        salary: JQ('#salary').val(),
        isActive: true
    }

    JQ.ajax({
        url: "Employee/AddEmployee",
        type: "POST",
        data: employee,
        success: function (response) {
            if (response == 0) {
                closeModal()
                JQ('#fname').val('');
                JQ('#ldname').val('');
                JQ('#email').val('');
                JQ('#phoneNumber').val('');
                JQ('#dob').val('');
                JQ('#address').val('');
                JQ('#department').val('');
                JQ('#salary').val('');
                JQ('#tblDiv').html('')
                BindEmpDetails();
                alert("Record added successfully.");
            }
            else {
                alert("Somthing is wrong.");
            }
        },
        error: function (error) {
            alert("Somthing is wrong.");
        }

    })

}

