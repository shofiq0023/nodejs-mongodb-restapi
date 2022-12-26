const router = require("express").Router();
const mongoose = require("mongoose");

const employeeSchema = require("../schemas/Employees.model.js");

const EmployeesData = mongoose.model("EmployeesData", employeeSchema);

router.route("/employees")
    // Create employees
    .post((req, res) => {
        const newEmployee = new EmployeesData({
            employee_name: req.body.employeeName,
            employee_department: req.body.employeeDepartment,
            employee_salary: req.body.employeeSalary
        });

        newEmployee.save((err) => {
            if (!err) {
                res.send("Saved successfully");
            } else {
                res.send("err");
            }
        });
    })

    // Get employees
    .get((req, res) => {
        EmployeesData.find((err, found) => {
            if (!err) {
                res.send(found);
            } else {
                res.send(err);
            }
        })
    })

// Gets a single employee information
router.route("/employees/:id")
    .get((req, res) => {
        EmployeesData.findOne({ _id: req.params.id }, (err, found) => {
            if (found) {
                res.send(found);
            } else {
                res.send("No employee found");
            }
        })
    })

    // Update employee
    .put((req, res) => {
        EmployeesData.updateOne({ _id: req.params.id }, {
            $set: {
                employee_name: req.body.employeeName,
                employee_department: req.body.employeeDepartment,
                employee_salary: req.body.employeeSalary
            }
        }, (err, result) => {
            if (!err) {
                res.send("Successfully updated");
            } else {
                res.send(err);
            }
        })
    })

    // Delete a single document by id
    .delete((req, res) => {
        EmployeesData.deleteOne({ _id: req.params.id}, (err) => {
            if (!err) {
                res.send("Delete successful");
            } else {
                res.send(err);
            }
        });
    });


module.exports = router;