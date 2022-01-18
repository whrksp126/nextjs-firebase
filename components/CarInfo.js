import {Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText} from '@mui/material/';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Button, TextField, Box, IconButton } from "@mui/material"
import { useContext, useEffect, useRef, useState } from "react"
import { db } from '../firebase';
import { collection, doc, getDocs, query, setDoc } from 'firebase/firestore';
import Image from 'next/image';

import { useAuth } from '../Auth';


// 차량 정보 card ui
import { useTheme } from '@mui/material/styles';
import {Card,CardContent,CardMedia,Typography} from '@mui/material';
import {SkipPreviousIcon,PlayArrowIcon,SkipNextIcon} from '@mui/icons-material';



const CarInfo = () => {
    const theme = useTheme();
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


    //   if (readData.length === 0) {
    //     console.log('데이터가 없습니다.')
    //     setAddCar(false);
    //   } else {
    //     console.log('데이터가 있습니다.')
    //     setAddCar(true);
    //   }
    // if(idData.id === undefined){
    //   console.log('idData.id === 0')
    //   setAddCar(false)
    // }
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


  return (
    addCar === true ? (
      <>
      <Card sx={{ display: 'flex' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', zIndex:'tooltip', position: "absolute",}}>
            <CardContent sx={{ flex: '1 0 auto' }}>
              <Typography component="div" variant="h5">
                {idData.carName}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" component="div">
                {idData.carNumber}
              </Typography>
            </CardContent>
          </Box>
          <CardMedia
            component="img"
            // fullWidth
            sx={{ 
              marginTop: 2,
              marginLeft: "40%",
              zIndex:'modal',
              width: 350 ,
            }}
            image={idData.carImage}
            alt="차량 이미지"
          />
      {/* 데이터 베이스에 있는 모든 데이터를 불러오기 */}
      {/* {readData.map((val, id) => {
        // console.log(val.id)
        // console.log(val.carName)
        // console.log(val.carImage)
        return (
          <div key={id}>
          <Box sx={{ display: 'flex', flexDirection: 'column', zIndex:'tooltip', position: "absolute",}}>
            <CardContent sx={{ flex: '1 0 auto' }}>
              <Typography component="div" variant="h5">
                {val.carName}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" component="div">
                {val.carNumber}
              </Typography>
            </CardContent>
          </Box>
          <CardMedia
            component="img"
            // fullWidth
            sx={{ 
              marginTop: 2,
              marginLeft: "40%",
              zIndex:'modal',
              width: 350 ,
            }}
            image={val.carImage}
            alt="차량 이미지"
          />
          </div>
        )
        
      })} */}
      </Card>
      </>
      
      ) : (

      <>
    <IconButton
          sx={{
            width: '100%',
            height: 220,
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
          <Box>
            <AddCircleOutlineIcon color="#fafafa" fontSize="large" />
            <p>차량 정보를 등록하세요!</p>
          </Box>
        </IconButton>
        
        {/* 차량 정보 입력 */}
          <Dialog open={open} onClose={handleClose}>
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <DialogTitle>차량 정보 입력</DialogTitle>
            <DialogContent>
              <DialogContentText>
                등록할 차량의 모델 명(이름)을 입력해 주세요.
              </DialogContentText>
              <TextField
                value={carName}
                onChange={(e) => setCarName(e.target.value)}
                error={carNameError}
                required
                autoFocus
                margin="dense"
                id="CarName"
                label="모델 명"
                type="string"
                fullWidth
                variant="standard" />
            </DialogContent>

            <DialogContent>
              <DialogContentText>
                등록할 차량의 번호를 입력해 주세요.
              </DialogContentText>
              <TextField
                value={carNumber}
                onChange={(e) => setCarNumber(e.target.value)}
                error={carNumberError}
                required
                autoFocus
                margin="dense"
                id="CarNum"
                label="차량 번호"
                type="string"
                fullWidth
                variant="standard" />
            </DialogContent>

            <DialogContent>
              <DialogContentText>
                등록할 차량의 사진(url)을 입력해 주세요.
              </DialogContentText>
              <TextField
                value={carImage}
                onChange={(e) => setCarImage(e.target.value)}
                autoFocus
                margin="dense"
                id="CarNum"
                label="차량 이미지"
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
        // <>
        // <Box
        //   sx={{width: '100%',height: 220,backgroundColor: '#fafafa',border: 1,borderRadius: 3,borderColor: 'grey.500',
        //     boxShadow: 0,
        //     // '&:hover': {
        //     //   backgroundColor: '#eeeeee',
        //     //   opacity: [0.9, 0.8, 0.7],
        //     //   boxShadow: 1,
        //     // },
        //   }}
        // > 
        // <div>
        //   {readData.map((val, id) => {
        //     console.log(val.id)
        //     console.log(val.carName)
        //     console.log(val.carImage)
        //     return (
        //       <div key={id}>
        //         <p>차량 모델 명</p>
        //         <h1>{val.carName}</h1>
        //         <p>차량 번호</p>
        //         <h2>{val.carNumber}</h2>
        //         <Box>
        //           {val.carImage ? 
        //             <Image src={val.carImage} alt="차량 이미지" width="50" height="50" /> 
        //             : 
        //             null 
        //           }
        //         </Box>
                
        //       </div>
        //     )
        //   })}
        // </div>
        // {/* <h1>
        //   {carData.carName}
        //   </h1>
        //   <h2>{carData.carNumber}</h2>
        //   <div>{carData.carImage}</div>
        //   <Image src={carData.carImage} alt="/" width="50" height="50"/> */}
        // </Box>
        // </>
      )
  )
}

export default CarInfo
