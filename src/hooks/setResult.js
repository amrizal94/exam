import { postServerData } from '../helper/helper';
import * as Action from '../redux/result_reducer'

export const PushAnswer = (result) => async (dispatch) => {
    try {
        await dispatch(Action.pushResultAction(result))
    } catch (error) {
        console.log(error);
    }
}

export const UpdateResult = (trace, checked) => async (dispatch) => {
    try {
        await dispatch(Action.updateResultAction(trace, checked));
    } catch (error) {
        console.log(error);
    }
}

/** inser user data */
export const usePublishResult = (resultData) => {
    const { result, username } = resultData;
    (async () => {
        try {
            if (result && !username) throw new Error("couldn't get result");
            await postServerData(`${process.env.REACT_APP_SERVER_HOSTNAME}/api/result`, resultData, data => data)
        } catch (error) {
            console.log(error);
        }
    })();
}