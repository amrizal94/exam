import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../styles/Result.css'
import ResultTable from './ResultTable'
import { resetAllAction } from '../redux/question_reducer'
import { resetResultAction } from '../redux/result_reducer'
import { useDispatch, useSelector } from 'react-redux'
import { attempts_Number, correctAnswer_Number } from '../helper/helper'
import { usePublishResult } from '../hooks/setResult'


export default function Result() {
    const dispatch = useDispatch()
    const { answers, queue } = useSelector(state => state.questions)
    const { result, userId } = useSelector(state => state.result);
    const attempts = attempts_Number(result)
    const minim = 60;
    const correctAnswers = correctAnswer_Number(result, answers)
    const score = correctAnswers / queue.length * 100
    const flag = score > 50

    /** store user result */
    usePublishResult({
        username: userId,
        result,
        correct: correctAnswers,
        minim,
        score,
        achived: flag ? 'Passed' : 'Failed',
    })

    const onRestart = () => {
        dispatch(resetAllAction());
        dispatch(resetResultAction());
    }
    return (
        <div className='container'>
            <h1 className='title text-light'>Exam Application</h1>

            <div className='result flex-center'>
                <div className='flex'>
                    <span>Username</span>
                    <span className='bold'>{userId || ""}</span>
                </div>
                <div className='flex'>
                    <span>Total Questions</span>
                    <span className='bold'>{queue.length || 0}</span>
                </div>
                <div className='flex'>
                    <span>Correct answer</span>
                    <span className='bold'>{correctAnswers || 0}</span>
                </div>
                <div className='flex'>
                    <span>Passing criteria</span>
                    <span className='bold'>{minim || 0} %</span>
                </div>
                <div className='flex'>
                    <span>Score</span>
                    <span className='bold'>{score || 0} %</span>
                </div>
                <div className='flex'>
                    <span>Status</span>
                    <span style={{ color: `${flag ? "#2aff95" : "#ff2a66"}` }} className='bold'>{flag ? 'Passed' : 'Failed'}</span>
                </div>
            </div>

            <div className='start'>
                <Link className='btn' to={'/'} onClick={onRestart}>Restart</Link>
            </div>
            <div className='container'>
                {/* result table */}
                <ResultTable />
            </div>
        </div>



    )
}
