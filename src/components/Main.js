import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { setUserId } from '../redux/result_reducer'
import '../styles/Main.css'
import { getServerData } from '../helper/helper'

export default function Main() {
    const [data, setData] = useState([]);
    useEffect(() => {
        getServerData(`${process.env.REACT_APP_SERVER_HOSTNAME}/api/questions`, (res) => {
            console.log(process.env.REACT_APP_SERVER_HOSTNAME);
            const [{ questions, minim }] = res
            setData({ totalQuestions: questions.length, minim })
        })
    }, [])
    const inputRef = useRef(null)
    const linkRef = useRef(null)
    const dispatch = useDispatch()

    const startQuiz = () => {
        if (inputRef.current?.value) {
            dispatch(setUserId(inputRef.current?.value))
        }
    }
    return (
        <div className='container'>
            <h1 className='title text-light'>Exam Application</h1>
            <ol>
                <li>You will be asked {data?.totalQuestions || 0} questions one after another.</li>
                <li>Passing score requirements: {data?.minim}%.</li>
                <li>You can review and change answes before the exam finis.</li>
                <li>The result will be declared at the end exam.</li>
            </ol>
            <form id='form' onSubmit={() => { linkRef.current.click() }}>
                <input ref={inputRef} className='userid' type="text" placeholder='username*' />
            </form>
            <div className='start'>
                <Link ref={linkRef} className='btn' to={'exam'} onClick={startQuiz}>Start Exam</Link>
            </div>
        </div >
    )
}
