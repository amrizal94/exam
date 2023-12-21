import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import axios from "axios";


export const attempts_Number = (result) => result.filter(r => r !== undefined).length;

export const correctAnswer_Number = (result, answers) => result.map((element, i) => answers[i] === element).filter(i => i).length;

/** check user auth */
export const CheckUserExist = ({ children }) => {
    const auth = useSelector(state => state.result.userId)
    return auth ? children : <Navigate to={'/'} replace={true}></Navigate>
}

/** get server data */
export const getServerData = async (url, callback) => {
    const data = await (await axios.get(url))?.data;
    return callback ? callback(data) : data;
}

/** post server data */
export const postServerData = async (url, result, callback) => {
    const data = await (await axios.post(url, result))?.data;
    return callback ? callback(data) : data;
}