import { Box, Container } from '@mui/material'
import React, { useEffect, useState } from 'react'
import API from '../../services/api'
import CourseCard from './CourseCard'
import '../../App.css'

const CoursesList = () => {
    const [courses, setCourses] = useState([])

    const getCourses = async () => {
        const response = await API.getAll('courses')
        const data = await response.json()
        setCourses(data)
    }

    useEffect(() => {
        getCourses()
    }, [])
    return (
        <Box className='courses_list'>{courses.map((course, idx) => (<CourseCard course={course} key={idx} />))}</Box>
    )
}

export default CoursesList