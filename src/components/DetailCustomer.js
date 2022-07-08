import React from 'react';
import { Table, TableBody, TableCell, TableRow } from "@mui/material";
import { useParams, useNavigate, Link } from 'react-router-dom';
import useAsync from '../hooks/useAsync';
import axios from "axios";
import { API_URL } from '../config/apiurl'
const DetailCustomer = (props) => {
    const param = useParams();
    const navigate = useNavigate();
    const { no } = param;
    console.log(no);
    async function getCustomer() {
        const response = await axios.get(
            `${API_URL}/customers/${no}`
        )
        return response.data;
    }
    const state = useAsync(getCustomer);
    const { loading, error, data: customer } = state;
    
    //삭제하기
    const onDelete = () => {
        axios.delete(`http://localhost:3001/delCoustomer/${no}`)
        .then(result=>{
            console.log("삭제되었습니다.");
            navigate("/");
        })
        .catch(err=>{
            console.log(err);
        })
    }


    if(loading) return <div>로딩중........</div>
    if(error) return <div>페이지를 나타낼수 없습니다.</div>
    if(!customer) return null;
    return (
        <div>
            <h2>고객 상세 정보</h2>
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell>고객명</TableCell>
                        <TableCell>{customer.name}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>연락처</TableCell>
                        <TableCell>{customer.name}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>생년월일</TableCell>
                        <TableCell>{customer.birth}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>성별</TableCell>
                        <TableCell>{customer.gender}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>주소</TableCell>
                        <TableCell>{customer.add1}{customer.add2}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan={2}>
                            <button onClick={onDelete}>삭제</button>
                            <Link to={`/editcustomer/${no}`}>수정</Link>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    );
};

export default DetailCustomer;