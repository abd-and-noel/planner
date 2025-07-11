import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  IconButton,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
  Fade,
  Slide,
  Chip,
  Checkbox,
  useMediaQuery
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Assignment as AssignmentIcon,
  CalendarToday as CalendarIcon,
  Close as CloseIcon
} from '@mui/icons-material';

const Assignments = ({ 
  assignments, 
  setAssignments, 
  courses, 
  showSnackbar 
}) => {
  const [showAssignmentForm, setShowAssignmentForm] = useState(false);
  const [editingAssignment, setEditingAssignment] = useState(null);
  const [assignmentForm, setAssignmentForm] = useState({
    title: '',
    courseId: '',
    dueDate: '',
    type: 'Assignment',
    description: '',
    completed: false
  });
  const isSmallMobile = useMediaQuery('(max-width:600px)');

  const handleAddAssignment = () => {
    if (assignmentForm.title.trim() && assignmentForm.courseId && assignmentForm.dueDate) {
      const newAssignment = {
        id: Date.now(),
        title: assignmentForm.title.trim(),
        courseId: parseInt(assignmentForm.courseId),
        dueDate: assignmentForm.dueDate,
        type: assignmentForm.type,
        description: assignmentForm.description.trim(),
        completed: false
      };
      setAssignments([...assignments, newAssignment]);
      setAssignmentForm({
        title: '',
        courseId: '',
        dueDate: '',
        type: 'Assignment',
        description: '',
        completed: false
      });
      setShowAssignmentForm(false);
      showSnackbar('Assignment added successfully!');
    } else {
      showSnackbar('Please fill in all required fields', 'error');
    }
  };

  const handleEditAssignment = (assignment) => {
    setEditingAssignment(assignment.id);
    setAssignmentForm({
      ...assignment,
      courseId: assignment.courseId.toString()
    });
    setShowAssignmentForm(true);
  };

  const handleUpdateAssignment = () => {
    if (assignmentForm.title.trim() && assignmentForm.courseId && assignmentForm.dueDate) {
      setAssignments(assignments.map(assignment => 
        assignment.id === editingAssignment ? { 
          ...assignment, 
          title: assignmentForm.title.trim(),
          courseId: parseInt(assignmentForm.courseId),
          dueDate: assignmentForm.dueDate,
          type: assignmentForm.type,
          description: assignmentForm.description.trim()
        } : assignment
      ));
      setAssignmentForm({
        title: '',
        courseId: '',
        dueDate: '',
        type: 'Assignment',
        description: '',
        completed: false
      });
      setShowAssignmentForm(false);
      setEditingAssignment(null);
      showSnackbar('Assignment updated successfully!');
    } else {
      showSnackbar('Please fill in all required fields', 'error');
    }
  };

  const handleDeleteAssignment = (assignmentId) => {
    setAssignments(assignments.filter(assignment => assignment.id !== assignmentId));
    showSnackbar('Assignment deleted successfully!');
  };

  const toggleAssignmentComplete = (assignmentId) => {
    setAssignments(assignments.map(assignment => 
      assignment.id === assignmentId 
        ? { ...assignment, completed: !assignment.completed }
        : assignment
    ));
    const assignment = assignments.find(a => a.id === assignmentId);
    showSnackbar(
      assignment.completed ? 'Assignment marked as incomplete' : 'Assignment completed!',
      assignment.completed ? 'info' : 'success'
    );
  };

  const getAssignmentStatus = (assignment) => {
    if (assignment.completed) return 'completed';
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dueDate = new Date(assignment.dueDate);
    dueDate.setHours(0, 0, 0, 0);
    const diffTime = dueDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'overdue';
    if (diffDays <= 3) return 'upcoming';
    return 'normal';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return '#4caf50';
      case 'overdue': return '#f44336';
      case 'upcoming': return '#ff9800';
      default: return '#2196f3';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completed': return 'Completed';
      case 'overdue': return 'Overdue';
      case 'upcoming': return 'Due Soon';
      default: return 'Normal';
    }
  };

  const formatDate = (dateString) => {
    const options = { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric',
      weekday: 'short'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const cancelForm = () => {
    setShowAssignmentForm(false);
    setEditingAssignment(null);
    setAssignmentForm({
      title: '',
      courseId: '',
      dueDate: '',
      type: 'Assignment',
      description: '',
      completed: false
    });
  };

  const getCourseById = (courseId) => {
    return courses.find(course => course.id === courseId);
  };

  return (
    <Card sx={{ borderRadius: 3, boxShadow: '0 4px 12px rgba(0,0,0,0.08)', height: '100%' }}>
      <Box sx={{ 
        px: 3, 
        py: 2, 
        borderBottom: '1px solid #e0e0e0',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Typography variant="h6" fontWeight="600">
          Assignments ({assignments.length})
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setShowAssignmentForm(!showAssignmentForm)}
          disabled={courses.length === 0}
          sx={{ 
            borderRadius: 2, 
            textTransform: 'none',
            fontSize: { xs: '0.8rem', sm: '0.875rem' },
            px: { xs: 2, sm: 3 }
          }}
        >
          {isSmallMobile ? 'Add' : 'Add Assignment'}
        </Button>
      </Box>

      <Box sx={{ p: 3 }}>
        <Slide direction="down" in={showAssignmentForm} mountOnEnter unmountOnExit>
          <Paper sx={{ p: 3, mb: 3, backgroundColor: '#f8f9fa', borderRadius: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="subtitle1" fontWeight="600">
                {editingAssignment ? 'Edit Assignment' : 'Add New Assignment'}
              </Typography>
              <IconButton onClick={cancelForm} size="small">
                <CloseIcon />
              </IconButton>
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Assignment Title"
                  variant="outlined"
                  value={assignmentForm.title}
                  onChange={(e) => setAssignmentForm({...assignmentForm, title: e.target.value})}
                  sx={{ bgcolor: '#fff', borderRadius: 1 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Course</InputLabel>
                  <Select
                    value={assignmentForm.courseId}
                    label="Course"
                    onChange={(e) => setAssignmentForm({...assignmentForm, courseId: e.target.value})}
                    sx={{ bgcolor: '#fff', borderRadius: 1 }}
                  >
                    {courses.map((course) => (
                      <MenuItem key={course.id} value={course.id}>
                        {course.code} - {course.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Due Date"
                  type="date"
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                  value={assignmentForm.dueDate}
                  onChange={(e) => setAssignmentForm({...assignmentForm, dueDate: e.target.value})}
                  sx={{ bgcolor: '#fff', borderRadius: 1 }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Type</InputLabel>
                  <Select
                    value={assignmentForm.type}
                    label="Type"
                    onChange={(e) => setAssignmentForm({...assignmentForm, type: e.target.value})}
                    sx={{ bgcolor: '#fff', borderRadius: 1 }}
                  >
                    <MenuItem value="Assignment">Assignment</MenuItem>
                    <MenuItem value="Homework">Homework</MenuItem>
                    <MenuItem value="Project">Project</MenuItem>
                    <MenuItem value="Exam">Exam</MenuItem>
                    <MenuItem value="Quiz">Quiz</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  variant="outlined"
                  multiline
                  rows={3}
                  value={assignmentForm.description}
                  onChange={(e) => setAssignmentForm({...assignmentForm, description: e.target.value})}
                  sx={{ bgcolor: '#fff', borderRadius: 1 }}
                />
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={editingAssignment ? handleUpdateAssignment : handleAddAssignment}
                    sx={{ borderRadius: 2, textTransform: 'none' }}
                  >
                    {editingAssignment ? 'Update Assignment' : 'Add Assignment'}
                  </Button>
                  <Button
                    variant="outlined"
                    fullWidth
                    onClick={cancelForm}
                    sx={{ borderRadius: 2, textTransform: 'none' }}
                  >
                    Cancel
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Slide>

        {assignments.length > 0 ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {assignments.map((assignment) => {
              const course = getCourseById(assignment.courseId);
              const status = getAssignmentStatus(assignment);
              return (
                <Fade key={assignment.id} in timeout={300}>
                  <Card sx={{ 
                    borderRadius: 2,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                    borderLeft: `4px solid ${getStatusColor(status)}`,
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 4px 16px rgba(0,0,0,0.1)'
                    }
                  }}>
                    <CardContent sx={{ p: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                        <Checkbox
                          checked={assignment.completed}
                          onChange={() => toggleAssignmentComplete(assignment.id)}
                          sx={{ mr: 1 }}
                        />
                        <Box sx={{ flex: 1 }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography 
                              variant="subtitle1" 
                              fontWeight="600"
                              sx={{
                                textDecoration: assignment.completed ? 'line-through' : 'none',
                                color: assignment.completed ? 'text.secondary' : 'text.primary'
                              }}
                            >
                              {assignment.title}
                            </Typography>
                            <Chip
                              label={getStatusText(status)}
                              size="small"
                              sx={{ 
                                backgroundColor: `${getStatusColor(status)}20`,
                                color: getStatusColor(status),
                                fontWeight: 500
                              }}
                            />
                          </Box>
                          {course && (
                            <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                              <Box sx={{ 
                                width: 12, 
                                height: 12, 
                                borderRadius: '50%', 
                                backgroundColor: course.color,
                                mr: 1
                              }} />
                              <Typography variant="body2" color="text.secondary">
                                {course.code} • {assignment.type}
                              </Typography>
                            </Box>
                          )}
                          <Typography variant="body2" sx={{ mt: 1 }}>
                            {assignment.description}
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', mt: 1.5 }}>
                            <CalendarIcon fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
                            <Typography variant="caption" color="text.secondary">
                              Due: {formatDate(assignment.dueDate)}
                            </Typography>
                          </Box>
                        </Box>
                        <Box sx={{ display: 'flex', gap: 0.5 }}>
                          <IconButton
                            onClick={() => handleEditAssignment(assignment)}
                            size="small"
                          >
                            <EditIcon fontSize="small" color="primary" />
                          </IconButton>
                          <IconButton
                            onClick={() => handleDeleteAssignment(assignment.id)}
                            size="small"
                          >
                            <DeleteIcon fontSize="small" color="error" />
                          </IconButton>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Fade>
              );
            })}
          </Box>
        ) : (
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            py: 6,
            color: 'text.secondary'
          }}>
            <AssignmentIcon sx={{ fontSize: 48, mb: 2, opacity: 0.5 }} />
            <Typography variant="body1" sx={{ mb: 1 }}>
              {courses.length === 0 
                ? 'Add a course first to create assignments' 
                : 'No assignments added yet'}
            </Typography>
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={() => setShowAssignmentForm(true)}
              disabled={courses.length === 0}
              sx={{ borderRadius: 2, textTransform: 'none' }}
            >
              Add your first assignment
            </Button>
          </Box>
        )}
      </Box>
    </Card>
  );
};

export default Assignments;