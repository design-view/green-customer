import React,{ useState, useEffect } from 'react';
import { Table, TableBody, TableRow, TableCell} from '@mui/material';
import PopupDom  from "./PopupDom";
import PopupPostCode from "./PopupPostCode";
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';
import useAsync from '../hooks/useAsync';
import { API_URL } from '../config/apiurl'
const EditCustomer = (props) => {
    const { no } = useParams()
    const [ formData, setFormData ] = useState({
        c_name: "",
        c_phone: "",
        c_birth: "",
        c_gender: "",
        c_add: "",
        c_adddetail: ""
    })
    async function getCustomer(){
        const response = await axios.get(`${ API_URL}/customers/${no}`)
        return response.data;
    }
    const state = useAsync(getCustomer);
    const { loading, error, data: customer} = state;

    useEffect(()=>{
        setFormData({
            c_name: customer? customer.name: "",
            c_phone: customer? customer.phone: "",
            c_birth: customer? customer.birth: "",
            c_gender: customer? customer.gender: "",
            c_add: customer? customer.add1: "",
            c_adddetail: customer? customer.add2: "",
        })
    },[customer])

    const navigate = useNavigate();
    //우편번호 관리하기
    const onAddData = (data) => {
        console.log(data);
        setFormData({
            ...formData,
            c_add: data.address
        })
    }
    //팝업창 상태 관리
    const [ isPopupOpen ,setIsPopupOpen] = useState(false);
    //팝업창 상태 true로 변경
    const openPostCode = ()=>{
        setIsPopupOpen(true);
    }
    //팝업창 상태 false로 변경
    const closePostCode = () => {
        setIsPopupOpen(false);
    }
    
    const onChange = (e) => {
        const { name, value } =  e.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }
    //폼 submit이벤트 
    const onSubmit = (e) => {
        //form에 원래 연결된 이벤트를 제거
        e.preventDefault();
        console.log(formData);


        //전화번호가 숫자인지 체크하기
        if(isNaN(formData.c_phone)){
            alert("전화번호는 숫자만 입력해주세요");
            setFormData({
                ...formData,
                c_phone:""
            })
        }
        //input에 값이 있는지 체크하고 
        //입력이 다되어있으면 post전송 
        if(formData.c_name !== "" && formData.c_phone !== "" && 
        formData.c_birth !== "" && formData.c_gender !== "" && 
        formData.c_add !== "" && formData.c_adddetail !== ""){
            updateCustomer()
        }

    }
    function updateCustomer(){
        axios.put(` ${API_URL}/editcustomer/${no}`,formData)
        .then(res=>{
            console.log(res);
            navigate('/')
        })
        .chtch(e=>{
            console.log(e)
        })
    }
    if(loading) return <div>로딩중.......</div>
    if(error) return <div>페이지를 나타낼수 없습니다.</div>
    if(!customer) return null;
    return (
        <div>
            <h2>고객 정보 수정하기</h2>
            <form onSubmit={onSubmit}>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell>이름</TableCell>
                            <TableCell>
                                <input name="c_name" type="text" 
                                value={formData.c_name} 
                                onChange={onChange}/>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>연락처</TableCell>
                            <TableCell>
                                <input name="c_phone" type="text" 
                                value={formData.c_phone} 
                                onChange={onChange}/>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>생년월일</TableCell>
                            <TableCell>
                                <input name="c_birth" type="date" 
                                value={formData.c_birth} 
                                onChange={onChange}/>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>성별</TableCell>
                            <TableCell>
                                여성<input name="c_gender" type="radio" 
                                value="여성" 
                                onChange={onChange}
                                checked={formData.c_gender === "여성" ? true : false}
                                />
                                남성<input name="c_gender" type="radio" 
                                value="남성" 
                                onChange={onChange} 
                                checked={formData.c_gender === "남성" ? true : false}/>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>주소</TableCell>
                            <TableCell>
                                <input name="c_add" type="text" 
                                value={formData.c_add} 
                                onChange={onChange}/>
                                <input name="c_adddetail" type="text"
                                value={formData.c_adddetail}
                                onChange={onChange}/>
                                <button type="button" onClick={openPostCode}>우편번호 검색</button>
                                <div id="popupDom">
                                    {isPopupOpen && (
                                        <PopupDom>
                                            <PopupPostCode onClose={closePostCode}
                                            onAddData={onAddData}
                                            />
                                        </PopupDom>
                                    )}
                                </div>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2}>
                                <button type="submit">등록</button>
                                <button type="reset">취소</button>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </form>
        </div>
    );
};

export default EditCustomer;