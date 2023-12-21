import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

/** custom hook */
import { useFetchQuestion } from '../hooks/FetchQuestion'
import { PushAnswer, UpdateResult } from '../hooks/setResult';

export default function Questions({ onChecked }) {
    const [checked, setChecked] = useState(undefined);
    const { trace, queue } = useSelector(state => state.questions);
    const { result } = useSelector(state => state.result);
    const [{ isLoading, apiData, serverError }] = useFetchQuestion()

    const questions = useSelector(state => state.questions.queue[state.questions.trace])
    const dispatch = useDispatch()

    useEffect(() => {
        if (checked !== undefined) {
            dispatch(UpdateResult({ trace, checked }))
        }
        /** reset the value of the checked variable after update answer */
        setChecked(undefined)
    }, [checked])

    const onSelect = (i) => {
        /** insert a new result in the array */
        if (result.length <= trace && trace < queue.length - 1) {
            dispatch(PushAnswer(checked))
            /** reset the value of the checked variable */
            setChecked(undefined)
        } else {
            onChecked(i)
        }
        setChecked(i)
    }

    if (isLoading) return <h3 className='text-light'>isLoading</h3>
    if (serverError) return <h3 className='text-light'>{serverError || 'Unknown Error'} </h3>

    return (
        <div className='questions'>
            <h2 className='text-light'>{questions?.question}</h2>

            <ul key={questions?.id}>
                {
                    questions?.options.map((option, index) => (
                        <li key={index}>
                            <input
                                type="radio"
                                value={false}
                                name="options"
                                id={`q${index}-option`}
                                onChange={() => onSelect(index)} />

                            <label
                                className='text-primary'
                                htmlFor={`q${index}-option`}>{option}</label>
                            <div className={`check ${result[trace] === index ? 'checked' : ''}`}></div>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}
