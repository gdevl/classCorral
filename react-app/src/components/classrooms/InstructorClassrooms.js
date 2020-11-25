import React, { useEffect, useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { CardActionArea, CardActions, Grid, Paper, FormControl, InputLabel, Input } from "@material-ui/core";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Redirect } from "react-router-dom";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { BsFillPlusSquareFill } from "react-icons/bs";
import { BsPlusSquare } from "react-icons/bs";
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';


const useStyles = makeStyles((theme) => ({
  grid: {
    width: '100%',
    margin: '0px',
  },

  paper: {
    padding: theme.spacing(2),
    textAlign: 'left',
    backgroundColor: theme.palette.secondary.light,
    background: theme.palette.success.light,
    color: theme.palette.secondary.contrastText,
    height: '200px',
    minWidth: '300px',
    margin: '1em'
  },

  typography: {
    fontSize: theme.typography.fontSize
  },

  cardcontent: {
    padding: 0,
    "&:last-child": {
      paddingBottom: 0
    },
    height: '70%',
    width: '100%'
  },

  outlined: {
    // outline: '1px solid blue',
    margin: '0 auto',
    display: 'flex',
    flexWrap: 'wrap',
  },

  addClassContainer: {
    display: 'flex',
    justifyContent: 'space-between'
  },

  classModal: {
    position: 'absolute',
    top: 300,
    left: 550,
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },

  addClassSubmitButton: {
    marginTop: '10px'
  },

  addClassButton: {
    width: '10px'
  },

  enrollStudentsTransferList: {
    width: 200,
    height: 230,
    overflow: 'auto',
  },

  enrollStudentsModal: {
    position: 'absolute',
    top: 300,
    left: 550,
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },

  transferListGridContainer: {
    margin: 'auto',
    backgroundColor: 'white'
  }

}));


const userId = 1


const InstructorClassrooms = () => {

  const classes = useStyles()

  const [classrooms, setClassrooms] = useState([])
  const [dialogOpen, setDialogOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [className, setClassName] = useState('')
  const [classDescription, setClassDescription] = useState('')
  const [classTime, setClassTime] = useState('')
  const [addStudentModalOpen, setAddStudentModalOpen] = useState(false)
  const [checked, setChecked] = useState([]);
  // const [left, setLeft] = useState([0, 1, 2, 3]);
  // const [right, setRight] = useState([4, 5, 6, 7]);
  const [left, setLeft] = useState(['Ryan', 'Gabe']);
  const [right, setRight] = useState(['Ranson', 'Warren']);
  const [transferListDisplay, setTransferListDisplay] = useState('none')

  // FUNCTIONALITY FOR THE TRANSFER LIST --------------------------------------------------------

  function not(a, b) {
    return a.filter((value) => b.indexOf(value) === -1);
  }

  function intersection(a, b) {
    return a.filter((value) => b.indexOf(value) !== -1);
  }

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleAllRight = () => {
    setRight(right.concat(left));
    setLeft([]);
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const handleAllLeft = () => {
    setLeft(left.concat(right));
    setRight([]);
  };


  // ------------------------------------------------------------------------------

  const handleDeactivateConfirmation = () => {
    setDialogOpen(true);
  }

  const handleDialogClose = () => {
    setDialogOpen(false);
  }

  const handleClassDelete = async (classId) => {
    setDialogOpen(false);
    // const res = await fetch(`api/users/${userId}/classes/${classId}/delete`)
    alert('Deleted Class')
  }

  const handleAddClass = () => {
    setModalOpen(true);
  }

  const handleCloseModal = () => {
    setModalOpen(false);
  }

  const handleAddStudent = () => {
    setAddStudentModalOpen(true);
  }

  const handleCloseStudentModal = () => {
    setAddStudentModalOpen(false);
  }

  const handleInputChange = (e) => {
    if(e.target.id === 'name-input') {
      setClassName(e.target.value)
      // console.log(className)
    } else if(e.target.id === 'description-input') {
      setClassDescription(e.target.value)
    } else {
      setClassTime(e.target.value)
    }
  }

  const submitClass = async () => {
    const body = {
      className,
      classDescription,
      classTime
    }

    // const res = await fetch(`api/users/${userId}/classes/create`, {

    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(body)
    // })
    // alert('Class Created:')
    console.log(body)
  }

  const handleCreateClass = (e) => {
    e.preventDefault()
    setModalOpen(false)
    submitClass()
  }


  useEffect(() => {
    const fetchClassData = async () => {
      const res = await fetch(`/api/users/${userId}/classes`)
      const classroomData = await res.json()
      setClassrooms(classroomData)
      // classrooms.push(classroomData)
      // console.log(classroomData)
    }
    fetchClassData()

  }, [])



  // CONTENT OF THE 'CREATE A CLASS' MODAL -------------------------------------------------------------------------------------------------------------------------------------


  const addClassBody = (
    <div className={classes.classModal}>
      <h2 id="simple-modal-title">Class Info:</h2>
      {/* <p id="simple-modal-description">
        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
      </p> */}
      <div>
        <FormControl>
          <InputLabel htmlFor="name-input">Name</InputLabel>
          <Input id="name-input" onChange={handleInputChange}/>
        </FormControl>
      </div>
      <div>
        <FormControl>
          <InputLabel htmlFor="description-input">Description</InputLabel>
          <Input id="description-input" onChange={handleInputChange}/>
        </FormControl>
      </div>
      <div>
        <FormControl>
          <InputLabel htmlFor="timeslot-input">Time Slot</InputLabel>
          <Input id="timeslot-input" onChange={handleInputChange}/>
        </FormControl>
      </div>
      <div>
        <Button variant="contained" color="primary" style={{ color: "white" }} size="small" className={classes.addClassSubmitButton} onClick={handleCreateClass} type='submit'>Create Class</Button>
      </div>
    </div>
  );

  //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


  // FUNCTION THAT GENERATES THE TRANSFER LIST CONTENT---------------------------------------------------------------------------------------------------------------------------------

  const customList = (items) => (
    <Paper className={classes.enrollStudentsTransferList}>
      <List dense component="div" role="list">
        {items.map((value) => {
          const labelId = `transfer-list-item-${value}-label`;

          return (
            <ListItem key={value} role="listitem" button onClick={handleToggle(value)}>
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              {/* <ListItemText id={labelId} primary={`List item ${value + 1}`} /> */}
              <ListItemText id={labelId} primary={value} />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Paper>
  );

  //----------------------------------------------------------------------------------------------------------------------------------------------------------------


  // console.log(classrooms)
  return (
    <>
      <div className={classes.addClassContainer}>
        <h1>
          Add Class
        </h1>
        <div className="plus-icon">
          <Button style={{maxWidth: '5px'}} size='small'>
            <BsPlusSquare size={25} onClick={handleAddClass}/>
          </Button>
        </div>
      </div>
      <div className={classes.outlined}>

          {classrooms.map((classroom, idx) => {
            // console.log('CLASSROOM', classroom.classSize)
            return (
              <>
              <Card className={classes.paper}>
                <CardContent className={classes.cardcontent}>
                  <div className="classroom-data">
                    <div className="classroom-name">
                      <h2>
                        {classroom.className}: {classroom.ClassTime}
                      </h2>
                    </div>
                    <div className="classroom-size">
                      <h4>
                        Class Size: {classroom.ClassSize}
                      </h4>
                    </div>
                  </div>
                </CardContent>
                <CardActions className="classroom-buttons-container">
                  <Button variant="contained" color="primary" style={{ color: "white" }} size="small">View</Button>
                  <Button variant="contained" color="primary" style={{ color: "white" }} size="small" onClick={handleAddStudent}>Enroll Students</Button>
                  <Button variant="contained" color="primary" style={{ color: "white" }} size="small" onClick={handleDeactivateConfirmation}>Deactivate</Button>
                </CardActions>
              </Card>



                {/* CODE FOR THE DELETE CLASS DIALOG BOX */}

                <Dialog
                  open={dialogOpen}
                  onClose={handleDialogClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">{"Are you sure that you want to delete this class?"}</DialogTitle>
                  <DialogActions>
                    <Button onClick={handleDialogClose} color="primary">
                      Disagree
                    </Button>
                    <Button onClick={handleClassDelete} color="primary" autoFocus>
                      Agree
                    </Button>
                  </DialogActions>
                </Dialog>




                {/* CODE FOR THE ADD A CLASS MODAL */}


                <Modal
                  open={modalOpen}
                  onClose={handleCloseModal}
                  aria-labelledby="simple-modal-title"
                  aria-describedby="simple-modal-description"
                >
                  {addClassBody}
                </Modal>





                  {/* CODE FOR THE TRANSFER LIST AND MODAL THAT CONTAINS IT */}

                  <Modal
                    open={addStudentModalOpen}
                    onClose={handleCloseStudentModal}
                  >
                   <Grid container spacing={2} justify="center" alignItems="center" className={classes.transferListGridContainer}>
                    <Grid item>{customList(left)}</Grid>
                    <Grid item>
                      <Grid container direction="column" alignItems="center">
                        <Button
                          variant="outlined"
                          size="small"
                          className={classes.button}
                          onClick={handleAllRight}
                          disabled={left.length === 0}
                          aria-label="move all right"
                        >
                          ≫
                        </Button>
                        <Button
                          variant="outlined"
                          size="small"
                          className={classes.button}
                          onClick={handleCheckedRight}
                          disabled={leftChecked.length === 0}
                          aria-label="move selected right"
                        >
                          &gt;
                        </Button>
                        <Button
                          variant="outlined"
                          size="small"
                          className={classes.button}
                          onClick={handleCheckedLeft}
                          disabled={rightChecked.length === 0}
                          aria-label="move selected left"
                        >
                          &lt;
                        </Button>
                        <Button
                          variant="outlined"
                          size="small"
                          className={classes.button}
                          onClick={handleAllLeft}
                          disabled={right.length === 0}
                          aria-label="move all left"
                        >
                          ≪
                        </Button>
                      </Grid>
                    </Grid>
                    <Grid item>{customList(right)}</Grid>
                  </Grid>
                </Modal>
              </>
            )
          })}
      </div>
    </>
  )
}


export default InstructorClassrooms;