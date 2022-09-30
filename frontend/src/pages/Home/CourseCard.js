import React from 'react'
import Card from '@mui/material/Card';
import { Box, CardContent, Typography } from '@mui/material';
import '../../App.css'
import API from '../../services/api';

const CourseCard = ({ course }) => {
    const rooms = course.scheduleList.map(schedule => (schedule.classRoomList.map((classRoomObj) => classRoomObj.classRoom.name)))
    const teachers = course.teacher.map((teacher, idx) => (teacher.name))
    const schedule = course.scheduleList.map(schedule => ({ timeEnd: schedule.timeEnd, timeStart: schedule.timeStart }))
    const timeStart = schedule[0] && new Date(schedule[0].timeStart)
    const timeEnd = schedule[0] && new Date(schedule[0].timeEnd)
    const timeStr = (time) => ("00" + time.getHours()).slice(-2) + ":" + ("00" + time.getMinutes()).slice(-2) || "";

    const deleteCourse = async (id) => {
        await API.deleteOne("courses", id)
        document.location.reload()
    }
    return <Card variant='outlined' className='course_card'>
        <CardContent>
            <Box component='div' className='card_head'>
            <Typography variant='h3' className='card_title'>{course.name}</Typography>
            <Box component='a' className='card_delete_icon' onClick={() => deleteCourse(course.id)}>
            <span class="material-icons">
                delete
            </span>
            </Box>
            </Box>
            <Typography>
                Prof. {(teachers.length > 0 && teachers.sort().map((teacher, idx) => (<span key={idx}>{teacher} | </span>))) || "não definido(a)."}
            </Typography>
            <Typography className='card_foot'>
                <span>Sala {( rooms[0] && rooms[0].length > 0 && rooms[0].sort().map((classRoom, idx) => (<span key={idx}>{classRoom} | </span>))) || "não definida."}</span>
                <span>{timeStart && timeEnd && timeStr(timeStart) + " às " + timeStr(timeEnd) || "Horário não definido."}</span>
            </Typography>
        </CardContent>
    </Card>
}

export default CourseCard