import React, { useEffect, useState } from 'react'
import { getServerData } from "../helper/helper";


export default function ResultTable() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const timer = setTimeout(() => {
            getServerData(`${process.env.REACT_APP_SERVER_HOSTNAME}/api/result`, (res) => {
                setData(res)
            })
        }, 1000);
        return () => clearTimeout(timer);

    }, [])
    return (
        <div>
            <table>
                <thead className='table-header'>
                    <tr className='table-row'>
                        <td>Name</td>
                        <td>Total Questions</td>
                        <td>Correct answer</td>
                        <td>Passing criteria</td>
                        <td>Score</td>
                        <td>Status</td>
                    </tr>
                </thead>
                <tbody>
                    {!data ?? <div>No Data Found</div>}
                    {
                        data.map((v, i) => (
                            <tr className='table-body' key={i}>
                                <td>{v?.username || ''}</td>
                                <td>{v?.result.length || 0}</td>
                                <td>{v?.correct || 0}</td>
                                <td>{v?.minim || 0}</td>
                                <td>{v?.score || 0}</td>
                                <td>{v?.achived || ""}</td>
                            </tr>
                        ))
                    }

                </tbody>
            </table>
        </div>
    )
}
