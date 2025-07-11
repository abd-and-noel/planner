import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  IconButton,
  TextField,
  Card,
  CardContent,
  Fade,
  Slide,
  useMediaQuery
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Book as BookIcon,
  Close as CloseIcon
} from '@mui/icons-material';

const courseColors = [
  '#1976d2', '#388e3c', '#7b1fa2', '#c2185b',
  '#f57c00', '#d32f2f', '#512da8', '#00796b',
  '#5d4037', '#455a64', '#f44336', '#9c27b0'
];

const Courses = ({ courses, setCourses, showSnackbar }) => {
  const [showCourseForm, setShowCourseForm] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [courseForm, setCourseForm] = useState({
    name: '',
    code: '',
    color: courseColors[0]
  });
  const isSmallMobile = useMediaQuery('(max-width:600px)');

  const handleAddCourse = () => {
    if (courseForm.name.trim() && courseForm.code.trim()) {
      const duplicateCode = courses.find(course => 
        course.code.toLowerCase() === courseForm.code.toLowerCase()
      );
      
      if (duplicateCode) {
        showSnackbar('Course code already exists!', 'error');
        return;
      }

      const newCourse = {
        id: Date.now(),
        name: courseForm.name.trim(),
        code: courseForm.code.trim().toUpperCase(),
        color: courseColors[courses.length % courseColors.length]
      };
      setCourses([...courses, newCourse]);
      setCourseForm({ name: '', code: '', color: courseColors[0] });
      setShowCourseForm(false);
      showSnackbar('Course added successfully!');
    } else {
      showSnackbar('Please fill in all required fields', 'error');
    }
  };

  const handleEditCourse = (course) => {
    setEditingCourse(course.id);
    setCourseForm(course);
    setShowCourseForm(true);
  };

  const handleUpdateCourse = () => {
    if (courseForm.name.trim() && courseForm.code.trim()) {
      const duplicateCode = courses.find(course => 
        course.code.toLowerCase() === courseForm.code.toLowerCase() && 
        course.id !== editingCourse
      );
      
      if (duplicateCode) {
        showSnackbar('Course code already exists!', 'error');
        return;
      }

      setCourses(courses.map(course => 
        course.id === editingCourse ? { 
          ...course, 
          name: courseForm.name.trim(),
          code: courseForm.code.trim().toUpperCase(),
          color: courseForm.color
        } : course
      ));
      setCourseForm({ name: '', code: '', color: courseColors[0] });
      setShowCourseForm(false);
      setEditingCourse(null);
      showSnackbar('Course updated successfully!');
    } else {
      showSnackbar('Please fill in all required fields', 'error');
    }
  };

  const handleDeleteCourse = (courseId) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      setCourses(courses.filter(course => course.id !== courseId));
      showSnackbar('Course deleted successfully!');
    }
  };

  const cancelForm = () => {
    setShowCourseForm(false);
    setEditingCourse(null);
    setCourseForm({ name: '', code: '', color: courseColors[0] });
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
          My Courses ({courses.length})
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setShowCourseForm(!showCourseForm)}
          sx={{ 
            borderRadius: 2, 
            textTransform: 'none',
            fontSize: { xs: '0.8rem', sm: '0.875rem' },
            px: { xs: 2, sm: 3 }
          }}
        >
          {isSmallMobile ? 'Add' : 'Add Course'}
        </Button>
      </Box>

      <Box sx={{ p: 3 }}>
        <Slide direction="down" in={showCourseForm} mountOnEnter unmountOnExit>
          <Paper sx={{ p: 3, mb: 3, backgroundColor: '#f8f9fa', borderRadius: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="subtitle1" fontWeight="600">
                {editingCourse ? 'Edit Course' : 'Add New Course'}
              </Typography>
              <IconButton onClick={cancelForm} size="small">
                <CloseIcon />
              </IconButton>
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Course Name"
                  variant="outlined"
                  value={courseForm.name}
                  onChange={(e) => setCourseForm({...courseForm, name: e.target.value})}
                  sx={{ bgcolor: '#fff', borderRadius: 1 }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Course Code"
                  variant="outlined"
                  value={courseForm.code}
                  onChange={(e) => setCourseForm({...courseForm, code: e.target.value})}
                  sx={{ bgcolor: '#fff', borderRadius: 1 }}
                />
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={editingCourse ? handleUpdateCourse : handleAddCourse}
                    sx={{ borderRadius: 2, textTransform: 'none' }}
                  >
                    {editingCourse ? 'Update Course' : 'Add Course'}
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

        {courses.length > 0 ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {courses.map((course) => (
              <Fade key={course.id} in timeout={300}>
                <Card sx={{ 
                  borderRadius: 2,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                  border: '1px solid #e0e0e0',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.1)'
                  }
                }}>
                  <CardContent sx={{ p: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                        <Box sx={{ 
                          width: 16, 
                          height: 16, 
                          borderRadius: '50%', 
                          backgroundColor: course.color,
                          mr: 2
                        }} />
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="subtitle1" fontWeight="600" noWrap>
                            {course.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {course.code}
                          </Typography>
                        </Box>
                      </Box>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton
                          onClick={() => handleEditCourse(course)}
                          size="small"
                        >
                          <EditIcon fontSize="small" color="primary" />
                        </IconButton>
                        <IconButton
                          onClick={() => handleDeleteCourse(course.id)}
                          size="small"
                        >
                          <DeleteIcon fontSize="small" color="error" />
                        </IconButton>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Fade>
            ))}
          </Box>
        ) : (
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            py: 6,
            color: 'text.secondary'
          }}>
            <BookIcon sx={{ fontSize: 48, mb: 2, opacity: 0.5 }} />
            <Typography variant="body1" sx={{ mb: 1 }}>
              No courses added yet
            </Typography>
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={() => setShowCourseForm(true)}
              sx={{ borderRadius: 2, textTransform: 'none' }}
            >
              Add your first course
            </Button>
          </Box>
        )}
      </Box>
    </Card>
  );
};

export default Courses;