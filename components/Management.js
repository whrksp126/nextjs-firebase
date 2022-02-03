import {Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText} from '@mui/material/';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Button, TextField, Box, IconButton } from "@mui/material"
import { useEffect, useState } from "react"
import { db } from '../firebase';
import { collection, doc, getDocs, query, setDoc } from 'firebase/firestore';

import { useAuth } from '../Auth';

const Management = () => {

  const {
    currentUser
  } = useAuth();


  // 차량 등록 기능 구현
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setOilChangePriceError(false)
    setOilChangeDateError(false)
    if (oilChangePrice === '') {
      setOilChangePriceError(true)
    }
    if (oilChangeDate === '') {
      setOilChangeDateError(true)
    }
    if (oilChangePrice && oilChangeDate) {
      try {
        await setDoc(doc(db, 'carManagement', oilChangeDate), {
          oilChangePrice: oilChangePrice,
          oilChangeDate: oilChangeDate,
          oilChangeName: oilChangeName,
          oilChangeMemo: oilChangeMemo,
          userEmail: currentUser.email
        });
        setOilChangeDate('');

      } catch {
        console.log('오류 발생')
      }
      setOilChangePrice('');
      setOilChangeDate('');
      setOilChangeName('');
      setOilChangeMemo('');
      setOpen(false);
      location.reload()
    } else {
      console.log('모델 명과 차량 번호는 필수 사항 입니다.')
    }
  }

  const [oilChangePrice, setOilChangePrice] = useState('');
  const [oilChangeDate, setOilChangeDate] = useState();
  const [oilChangeName, setOilChangeName] = useState('');
  const [oilChangeMemo, setOilChangeMemo] = useState('');

  const [oilChangePriceError, setOilChangePriceError] = useState(false);
  const [oilChangeDateError, setOilChangeDateError] = useState(false);

  // 차량 정보 불러오기 기능 구현

  return   <><>
    <IconButton
      sx={{width: '100%', height: 120, backgroundColor: '#fafafa', border: 1, borderRadius: 3, borderColor: 'grey.500', boxShadow: 0,
        '&:hover': { backgroundColor: '#eeeeee', opacity: [0.9, 0.8, 0.7], boxShadow: 1, },
      }}
      onClick={handleClickOpen}
    >
      <AddCircleOutlineIcon color="#fafafa" fontSize="large" />
      <p>엔진 오일 관리 내역 추가</p>
    </IconButton>

    <Dialog open={open} onClose={handleClose}>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <DialogTitle>엔진 오일 관리 내역 등록</DialogTitle>
        <DialogContent>
          <TextField
            value={oilChangeDate}
            error={oilChangeDateError}
            id="oilChangeDate"
            label="엔진 오일 교체 날짜"
            type="date"
            margin="dense"
            // defaultValue="todate"
            sx={{ width: 220 }}
            InputLabelProps={{ shrink: true }}
          />
        </DialogContent>

        <DialogContent>
          <TextField
            value={oilChangePrice}
            onChange={(e) => setOilChangePrice(e.target.value)}
            error={oilChangeDateError}
            required
            autoFocus
            margin="dense"
            id="oilChangePrice"
            label="엔진 오일 교체 가격"
            type="string"
            fullWidth
            variant="standard" />
        </DialogContent>

        <DialogContent>
          <TextField
            value={oilChangeName}
            onChange={(e) => setOilChangeName(e.target.value)}
            autoFocus
            margin="dense"
            id="oilChangeName"
            label="엔진 오일 상품 명"
            type="string"
            fullWidth
            variant="standard" 
          />
        </DialogContent>

        <DialogContent>
          <TextField
            value={oilChangeMemo}
            onChange={(e) => setOilChangeMemo(e.target.value)}
            autoFocus
            margin="dense"
            id="oilChangeMemo"
            label="기타 사항"
            type="string"
            fullWidth
            variant="standard"
          />
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
