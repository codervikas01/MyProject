var JQ = jQuery.noConflict();
JQ(document).ready(function () {
    BindEmpDetails();
    JQ('#btnAdd').click(function () {
        JQ('#addEmpTitle').css('display', 'block');
        JQ('#updateEmpTitle').css('display', 'none');
        JQ('#fname').val('');
        JQ('#lname').val('');
        JQ('#email').val('');
        JQ('#phoneNumber').val('');
        JQ('#dob').val('');
        JQ('#address').val('');
        JQ('#department').val('');
        JQ('#salary').val('');
        JQ('#mdlEditEmp').css("display", "block");
    });

    JQ('.highlight-row').removeClass('highlight-row');
    JQ('.highlight-row').css('transform', 'none'); // Reset the transformation
});

function closeModal() {
    JQ('#mdlEditEmp').css("display", "none");
    JQ('#mdlDeleteEmp').css("display", "none");
}

function BindEmpDetails()  {
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

    JQ.ajax({
        type: "Get",
        url: "/Employee/Empdetals",
        success: function (data) {

            var tbodyHTML = '<tbody>'
            JQ.each(data, function (index, employee) {
                tbodyHTML += '<tr row-id="' + employee.employeeId + '">';
                tbodyHTML += '<td>' + employee.firstName + ' ' + employee.lastName + '</td>';
                tbodyHTML += '<td>' + employee.email + '</td>';
                tbodyHTML += '<td>' + employee.phoneNumber + '</td>';
                var formattedDate = new Date(employee.dateOfBirth).toLocaleDateString('en-GB');
                tbodyHTML += '<td>' + formattedDate + '</td>';
                tbodyHTML += '<td>' + employee.address + '</td>';
                tbodyHTML += '<td>' + employee.department + '</td>';
                tbodyHTML += '<td>' + employee.salary + '</td>';
                tbodyHTML += '<td><button class="edit-button" data-employee-id="' + employee.employeeId + '"><i class="fas fa-edit" style="color:deepskyblue;"></i></button></td>';
                tbodyHTML += '<td><button class="delete-button" data-employee-id="' + employee.employeeId + '"><i class="fas fa-trash-alt" style="color:crimson;"></i></button></td>';
                tbodyHTML += '</tr>';
            });
            tbodyHTML += '</tbody></table>'

            InnerHtml += tbodyHTML

            JQ('#tblDiv').html(InnerHtml);
            tbodyHTML = '';
            InnerHtml = '';

            // Use event delegation for dynamically created or updated buttons
            JQ('#tblDiv').on('click', '.edit-button', function () {
                var employeeId = JQ(this).data('employee-id');
                EditPopUp(employeeId);
            });

            JQ('#tblDiv').on('click', '.delete-button', function () {
                var employeeId = JQ(this).data('employee-id');
                DeleteEmp(employeeId);
            });
        },
        error: function (error) {

        }
    })
}

function EditPopUp(id) {

    JQ('#updateEmpTitle').css('display', 'block');
    JQ('#addEmpTitle').css('display', 'none');

    JQ.ajax({
        type: "Get",
        url: "Employee/GetEmpById?id=" + id,
        success: function (response) {
            if (response != null || response != 1) {
                JQ('#empId').val(response.employeeId);
                JQ('#fname').val(response.firstName);
                JQ('#lname').val(response.lastName);
                JQ('#email').val(response.email);
                JQ('#phoneNumber').val(response.phoneNumber);
                var formattedDate = new Date(response.dateOfBirth).toISOString().split('T')[0];
                JQ('#dob').val(formattedDate);
                JQ('#address').val(response.address);
                JQ('#department').val(response.department);
                JQ('#salary').val(response.salary);
                JQ('#mdlEditEmp').css("display", "block");
            }
            else {
                alert("Somthing is wrong.");
            }
        },
        error: function () {
            alert("Somthing is wrong.");

        }

    });
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

            if (JQ('#empId').val() == '') {
                SaveEmp();
            }
            else {
                UpadteEmp();
            }
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
                JQ('#lname').val('');
                JQ('#email').val('');
                JQ('#phoneNumber').val('');
                JQ('#dob').val('');
                JQ('#address').val('');
                JQ('#department').val('');
                JQ('#salary').val('');
                JQ('#tblDiv').html('');
                BindEmpDetails();
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

function UpadteEmp() {
    var employee = {
        EmployeeId: JQ('#empId').val(),
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
        url: "Employee/UpdateEmployee",
        type: "POST",
        data: employee,
        success: function (response) {
            if (response !== 0 && response !== 2) {
                closeModal();
                // Reset form fields
                JQ('#empId, #fname, #lname, #email, #phoneNumber, #dob, #address, #department, #salary').val('');

                // Update table values based on the response
                var $row = JQ('#tblEmp tbody tr[row-id="' + response.employeeId + '"]');
                if ($row.length > 0) {
                    //$row.addClass('highlight-row');
                    // Use setTimeout to remove the class and reset the transformation after 1 second
                    JQ('#successMsg').text('Employee updated successfully!').css('color', 'turquoise');
                    JQ('#editDeleteSuccess').val("Edit")
                    JQ('#mdlsuccess').css('display', 'block')
                    JQ('#overlay').css('display', 'block')
                    $row.addClass('highlight-row');
                    JQ('#empSuccessId').val(response.employeeId);
                    $row.find('td:eq(0)').text(response.firstName + ' ' + response.lastName);
                    $row.find('td:eq(1)').text(response.email);
                    $row.find('td:eq(2)').text(response.phoneNumber);
                    var DOB = new Date(response.dateOfBirth).toLocaleDateString("en-GB")
                    $row.find('td:eq(3)').text(DOB);
                    $row.find('td:eq(4)').text(response.address);
                    $row.find('td:eq(5)').text(response.department);
                    $row.find('td:eq(6)').text(response.salary);

                    // Update buttons
                    $row.find('td:eq(7)').html('<button class="edit-button" data-employee-id="' + response.employeeId + '"><i class="fas fa-edit" style="color:deepskyblue;style="color:deepskyblue;></i></button>');
                    $row.find('td:eq(8)').html('<button class="delete-button" data-employee-id="' + response.employeeId + '"><i class="fas fa-trash-alt" style="color:crimson;"></i></button>');

                }
                else {
                    console.log("No matching row found.");
                }
            } else {
                alert("Something is wrong.");
            }
        },
        error: function (error) {
            alert("Something is wrong.");
            console.error("Error updating employee:", error);
        }
    });
}

function DeleteEmp(EmpId) {

    var empName = JQ('#tblEmp tbody tr[row-id="' + EmpId + '"]').find('td:eq(0)').text();
    JQ('#EmpId').val(EmpId);
    JQ('#empName').text(empName);
    JQ('#mdlDeleteEmp').css('display', 'block')
}

JQ(document).on('click', '#confirmDeleteButton', function () {
    var EmpId = JQ('#EmpId').val();
    JQ.ajax({
        url: "Employee/DeleteEmployee?id=" + EmpId,
        type: "Get",
        success: function (response) {
            if (response == 0) {

                var $row = JQ('#tblEmp tbody tr[row-id="' + EmpId + '"]');
                JQ('#successMsg').text('Employee Deleted successfully!').css('color', 'crimson');
                JQ('#editDeleteSuccess').val("Delete")
                JQ('#mdlsuccess').css('display', 'block')
                JQ('#overlay').css('display', 'block')
                JQ('#empSuccessId').val(EmpId);

                // Add class for highlighting
                $row.addClass('highlight-Delrow');

                // Use setTimeout to remove the class and apply delete animation after 2 seconds


                JQ('#mdlDeleteEmp').css('display', 'none')

            }
            else {
                JQ('#mdlDeleteEmp').css('display', 'none')

                alert("Somthing is wrong.");
            }
        },
        error: function (error) {
            JQ('#mdlDeleteEmp').css('display', 'none')
            alert("Somthing is wrong.");
        }

    })

})

function closesuccessModal() {
    JQ('#mdlsuccess').css('display', 'none');
    JQ('#overlay').css('display', 'none')
    var employeeId = JQ('#empSuccessId').val();
    var $row = JQ('#tblEmp tbody tr[row-id="' + employeeId + '"]');
    JQ('#successMsg').text('').css('color', 'none')

    if (JQ('#editDeleteSuccess').val() == "Edit") {

        $row.css('transform', 'scale(1.01)');
        setTimeout(function () {
            $row.css('transform', 'none'); // Reset the transformation
            $row.removeClass('highlight-row');
        }, 2000);
        JQ('#editDeleteSuccess').val('')
    }
    else {
        setTimeout(function () {
            // Add class for delete animation
            $row.addClass('deleted');
            // Remove the row from the DOM after the animation duration
            setTimeout(function () {
                $row.remove();
            }, 500); // Adjust the time to match your animation duration
        }, 500);
        JQ('#editDeleteSuccess').val('')

    }

}