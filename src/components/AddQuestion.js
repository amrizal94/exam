import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import Questions from './Questions'
import { MoveNextQuestion, MovePrevQuestion } from '../hooks/FetchQuestion';

/** redux store import */
import { useSelector, useDispatch } from 'react-redux'
import { PushAnswer } from '../hooks/setResult';

export default function AddQuestion() {
    const [checked, setChecked] = useState(undefined)
    const { result } = useSelector(state => state.result);
    const { trace, queue } = useSelector(state => state.questions);

    const dispatch = useDispatch()


    /** next button event handler */
    const onNext = () => {
        if (trace < queue.length) {
            /** update the trace value by one using MoveNextAction */
            dispatch(MoveNextQuestion())

            /** insert a new result in the array */
            if (result.length <= trace) {
                dispatch(PushAnswer(checked))
                /** reset the value of the checked variable */
            }
        }

        /** reset the value of the checked variable */
        setChecked(undefined)
    }

    /** prev button event handler */
    const onPrev = () => {
        if (trace > 0) {
            /** update the trace value by one using MovePrevAction */
            dispatch(MovePrevQuestion())
        }
    }

    const onChecked = (check) => {
        setChecked(check)
    }

    /** finished exam after the last question */
    if (result.length && result.length >= queue.length) {
        return <Navigate to={'/result'} replace="true"></Navigate >
    }

    return (
        <div className='container'>
            <h1 className='title text-light'>Exam Application</h1>

            {/* display questions */}
            <Questions onChecked={onChecked} />
            <div className='grid'>
                {trace > 0 ? <button className='btn prev' onClick={onPrev}>Prev</button>
                    : <div></div>}
                <button className='btn next' onClick={onNext}>Next</button>
            </div>
        </div>
    )
}
