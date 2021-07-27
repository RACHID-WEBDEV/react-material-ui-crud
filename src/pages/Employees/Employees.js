import React, { useState } from "react";
import EmployeeForm from "./EmployeeForm";
import PageHeader from "../../Components/PageHeader";
import PeopleOutlineTwoToneIcon from "@material-ui/icons/PeopleOutlineTwoTone";
import {
     Paper,
     makeStyles,
     TableBody,
     TableRow,
     Toolbar,
     InputAdornment,
} from "@material-ui/core";
import useTable from "../../Components/useTable";
import * as employeeService from "../../services/employeeService";
import { TableCell } from "@material-ui/core";
import Controls from "../../Components/controls/Controls";
import { Search } from "@material-ui/icons";
import AddIcon from "@material-ui/icons/Add";
import Popup from "../../Components/Popup";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import CloseIcon from "@material-ui/icons/Close";
import Notification from "../../Components/Notification";
import ConfirmDialog from "../../Components/ConfirmDialog";

const useStyles = makeStyles((theme) => ({
     pageContent: {
          margin: theme.spacing(5),
          padding: theme.spacing(3),
     },
     searchInput: {
          width: "75%",
     },
     newButton: {
          position: "absolute",
          right: "10px",
     },
}));

const headCells = [
     { id: "fullname", label: "Employee Name" },
     { id: "email", label: "Email Address (Personal)" },
     { id: "mobile", label: "Mobile Number" },
     { id: "department", label: "Department" },
     { id: "actions", label: "Actions", disableSorting: true },
];

export default function Employees() {
     const classes = useStyles();

     const [recordsForEdit, setRecordsForEdit] = useState(null);

     const [records, setRecords] = useState(employeeService.getAllEmployees());

     const [filterFn, setFilterFn] = useState({
          fn: (items) => {
               return items;
          },
     });
     const [openPopup, setOpenPopup] = useState(false);

     const [notify, SetNotify] = useState({
          isOpen: false,
          message: "",
          type: "",
     });

     const [confirmDialog, setConfirmDialog] = useState({
          isOpen: false,
          title: "",
          subTitle: "",
     });

     const {
          TblContainer,
          TblHead,
          TblPagination,
          recordsAfterPagingAndSorting,
     } = useTable(records, headCells, filterFn);

     const handleSearch = (e) => {
          let target = e.target;

          setFilterFn({
               fn: (items) => {
                    if (target.value === "") return items;
                    else
                         return items.filter((x) =>
                              x.fullname.toLowerCase().includes(target.value)
                         );
               },
          });
     };

     const addOrEdit = (employee, resetForm) => {
          if (employee.id === 0) employeeService.insertEmployee(employee);
          else employeeService.updateEmployee(employee);
          resetForm();
          setRecordsForEdit(null);
          setOpenPopup(false);
          setRecords(employeeService.getAllEmployees());
          SetNotify({
               isOpen: true,
               message: "Submitted Sucessfully",
               type: "success",
          });
     };
     const openInPopup = (item) => {
          setRecordsForEdit(item);
          setOpenPopup(true);
     };
     const onDelete = (id) => {
          setConfirmDialog({
               ...confirmDialog,
               isOpen: false,
          });
          employeeService.deleteEmployee(id);
          setRecords(employeeService.getAllEmployees());
          SetNotify({
               isOpen: true,
               message: "Deleted Sucessfully",
               type: "error",
          });
     };

     return (
          <>
               <PageHeader
                    title="New Employee"
                    subTitle="Form design with validation"
                    icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
               />
               <Paper className={classes.pageContent}>
                    {/* EmployeeForm here */}

                    <Toolbar>
                         <Controls.Input
                              label="Search Employees"
                              className={classes.searchInput}
                              InputProps={{
                                   startAdornment: (
                                        <InputAdornment position="start">
                                             <Search />
                                        </InputAdornment>
                                   ),
                              }}
                              onChange={handleSearch}
                         />
                         <Controls.Button
                              text="Add New"
                              variant="outlined"
                              startIcon={<AddIcon />}
                              className={classes.newButton}
                              onClick={() => {
                                   setOpenPopup(true);
                                   setRecordsForEdit(null);
                              }}
                         />
                    </Toolbar>

                    <TblContainer>
                         <TblHead />
                         <TableBody>
                              {recordsAfterPagingAndSorting().map((item) => (
                                   <TableRow key={item.id}>
                                        <TableCell>{item.fullname}</TableCell>
                                        <TableCell>{item.email}</TableCell>
                                        <TableCell>{item.mobile}</TableCell>
                                        <TableCell>{item.department}</TableCell>
                                        <TableCell>
                                             <Controls.ActionButton
                                                  color="primary"
                                                  onClick={() => {
                                                       openInPopup(item);
                                                  }}
                                             >
                                                  <EditOutlinedIcon fontSize="small" />
                                             </Controls.ActionButton>
                                             <Controls.ActionButton
                                                  color="secondary"
                                                  onClick={() => {
                                                       setConfirmDialog({
                                                            isOpen: true,
                                                            title: "Are You Sure You Want to Delete This Record?",
                                                            subTitle:
                                                                 "You can't undo this operation ",
                                                            onConfirm: () => {
                                                                 onDelete(
                                                                      item.id
                                                                 );
                                                            },
                                                       });
                                                  }}
                                             >
                                                  <CloseIcon fontSize="small" />
                                             </Controls.ActionButton>
                                        </TableCell>
                                   </TableRow>
                              ))}
                         </TableBody>
                    </TblContainer>
                    <TblPagination />
               </Paper>
               <Popup
                    title="Employee Form"
                    openPopup={openPopup}
                    setOpenPopup={setOpenPopup}
               >
                    <EmployeeForm
                         recordsForEdit={recordsForEdit}
                         addOrEdit={addOrEdit}
                    />
               </Popup>
               <Notification notify={notify} SetNotify={SetNotify} />
               <ConfirmDialog
                    confirmDialog={confirmDialog}
                    setConfirmDialog={setConfirmDialog}
               />
          </>
     );
}
