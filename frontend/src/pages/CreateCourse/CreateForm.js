import { Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import API from "../../services/api";
import '../../App.css'


const CreateForm = () => {
    const [fields, setFields] = useState({})

    const handleFieldsChange = (event) => {
        const auxFields = { ...fields }
        auxFields[event.target.name] = event.target.value;
        setFields(auxFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const course = { ...fields }
        course.timeStart += course.timeStart ? ":00.000-03:00" : ""
        course.timeEnd += course.timeEnd ? ":00.000-03:00" : ""
        const response = await API.post('courses', course)
        console.log(response)
        console.log(course)
        document.location.assign("/")
    }

    return (
        <form onSubmit={handleSubmit} className='newCourse_form'>
            <TextField label='Nome do Curso' name="courseName" id="courseName" value={fields.courseName} onChange={handleFieldsChange} required/>
            <Typography>Hora início:</Typography>
            <TextField type='datetime-local' name="timeStart" value={fields.timeStart} onChange={handleFieldsChange}/>
            <Typography>Hora fim:</Typography>
            <TextField type='datetime-local' name="timeEnd" value={fields.timeEnd} onChange={handleFieldsChange}/>
            <Button type="submit">Submit</Button>
        </form>
    )
}

export default CreateForm