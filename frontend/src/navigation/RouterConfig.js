import Home from "../pages/Home";
import {Routes, Route} from 'react-router-dom'
import { CREATE_COURSE, ROOT } from "./CONSTANTS";
import CreateCourse from "../pages/CreateCourse";

const RouterConfig = () => {
    return (
        <Routes>
            <Route exact path={ROOT} element={<Home />} />
            <Route path={CREATE_COURSE} element={<CreateCourse />} />
        </Routes>
    )
}

export default RouterConfig