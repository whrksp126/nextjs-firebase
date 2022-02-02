import {Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText} from '@mui/material/';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Button, TextField, Box, IconButton } from "@mui/material"
import { useEffect, useState } from "react"
import { db } from '../firebase';
import { collection, doc, getDocs, query, setDoc } from 'firebase/firestore';

import { useAuth } from '../Auth';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

const Management = () => {

  const {
    currentUser
  } = useAuth();


  // 차량 등록 기능 구현
  const [addCar, setAddCar] = useState(true);

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCarNameError(false)
    setCarNumberError(false)
    if (carName === '') {
      setCarNameError(true)
    }
    if (carNumber === '') {
      setCarNumberError(true)
    }
    if (carName && carNumber) {
      try {
        await setDoc(doc(db, 'carManagement', carNumber), {
          carName: carName,
          carNumber: carNumber,
          carImage: carImage,
          userEmail: currentUser.email
        });
        setCarNumber('');

      } catch {
        console.log('오류 발생')
      }
      setCarName('');
      setCarNumber('');
      setCarImage('');
      setOpen(false);
      location.reload()
    } else {
      console.log('모델 명과 차량 번호는 필수 사항 입니다.')
    }
    // console.log('carName은', carName, 'carNumber은', carNumber, 'carImage는', carImage)
  }
  console.log(currentUser.email);

  const [carName, setCarName] = useState('');
  const [carNumber, setCarNumber] = useState('');
  const [carImage, setCarImage] = useState('');
  const [carNameError, setCarNameError] = useState(false);
  const [carNumberError, setCarNumberError] = useState(false);

  // 차량 정보 불러오기 기능 구현

  const [readData, setReadData] = useState([]);
  const Data = async () => {
    const q = query(collection(db, 'carManagement'));
    const querySnapshot = await getDocs(q, 'snapshot');
    const data = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setReadData(data)
  };
  useEffect(() => {
    Data();
  }, []);

  useEffect(() => {

    if (idData.id === undefined) {
      console.log('데이터가 없습니다.')
      setAddCar(false);
    } else {
      console.log('데이터가 있습니다.')
      setAddCar(true);
    }

  }, [readData])

  // console.log('readData', readData)


  // id 값에 맞는 데이터만 idData에 저장하기
  let idData = {}
  for (let i = 0; i < readData.length; i++) {
    if (readData[i].userEmail === currentUser.email) {
      idData = readData[i];
    }
  }
  console.log('idData',idData)

  const [value, setValue] = useState(null);

  return   <><>
    <IconButton
      sx={{
        width: '100%',
        height: 120,
        backgroundColor: '#fafafa',
        border: 1,
        borderRadius: 3,
        borderColor: 'grey.500',
        boxShadow: 0,
        '&:hover': {
          backgroundColor: '#eeeeee',
          opacity: [0.9, 0.8, 0.7],
          boxShadow: 1,
        },
      }}
      onClick={handleClickOpen}
    >

        <AddCircleOutlineIcon color="#fafafa" fontSize="large" />
        <p>신규 관리 내역 추가</p>
    </IconButton>

    차량 정보 입력
    <Dialog open={open} onClose={handleClose}>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <DialogTitle>엔진 오일 관리 내역 등록</DialogTitle>
        <DialogContent>

        <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label="Basic example"
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>

          <TextField
            value={engineOilChangeDay}
            onChange={(e) => setCarName(e.target.value)}
            error={carNameError}
            required
            autoFocus
            margin="dense"
            id="engineOilChangeDay"
            label="교체 날짜"
            type="string"
            fullWidth
            variant="standard" />
        </DialogContent>

        <DialogContent>

          <TextField
            value={carNumber}
            onChange={(e) => setCarNumber(e.target.value)}
            error={carNumberError}
            required
            autoFocus
            margin="dense"
            id="CarNum"
            label="교체 가격"
            type="string"
            fullWidth
            variant="standard" />
        </DialogContent>

        <DialogContent>

          <TextField
            value={carImage}
            onChange={(e) => setCarImage(e.target.value)}
            autoFocus
            margin="dense"
            id="CarNum"
            label="상품 명"
            type="string"
            fullWidth
            variant="standard" />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>돌아가기</Button>
          <Button type="submit">저장</Button>
        </DialogActions>
      </form>
    </Dialog>
  </>
    <div>
      <h1>관리 내용 추가</h1>
      <h1>엔진 오일.</h1>
      <h1>타이어.</h1>
      <h1>세차.</h1>
      <h1>에어컨 필터.</h1>
      <h1>유류.</h1>
      <h1>보험.</h1>
      <h1>비용 관리(세차,유류).</h1>
    </div></>
  
}

export default Management
