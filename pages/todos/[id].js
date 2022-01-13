import { Button, Card, CardActions, CardContent, Grid, Typography } from "@mui/material"
import { collection, doc, getDoc, getDocs } from "firebase/firestore"
import { db } from "../../firebase"
import Link from "next/link"

const Detail = ({todoProps}) => {
  const todo = JSON.parse(todoProps)
  return (
    <Grid 
      container 
      spacing={0} 
      direction="column" 
      alignItems="center" 
      justifyContent="center"
      style={{minHeight: '100vh'}}
    >
      <Grid item xs={3}>
        <Card 
          sx={{minWidth: 275, maxWidth:500, boxShadow:3,}}
          style={{backgroundColor:'#fafafa'}}
        >
          <CardContent>
            <Typography variant="h5" component="div">
              {todo.title}
            </Typography>
            <Typography sx={{mb:1.5}} color="text.secondary">
              {todo.detail}
            </Typography>
          </CardContent>
          <CardActions>
            <Link href="/" passHref>
              <Button size="small">홈으로</Button>
            </Link>
          </CardActions>
        </Card>
      </Grid> 
    </Grid>
  )
}
export default Detail

export const getStaticPaths = async () => {
  // 다이나믹한 경로를 설정하는 것이기에 getStaticPaths를 이용하여야함
  const snapshot = await getDocs(collection(db,'todos'));
  const paths = snapshot.docs.map(doc => {
    return {
      params: {id: doc.id.toString()}
    }
  })
  return {
    paths,
    fallback: false
  }
}
export const getStaticProps = async (context) => {
  // getStaticPaths를 통해서 만들어진 params를 이용해
  // getStaticProps로 props를 만들어서 리턴함
  const id = context.params.id;
  const docRef = doc(db, 'todos', id);
  const docSnap = await getDoc(docRef);
    return {
    props: { todoProps: JSON.stringify(docSnap.data()) || null }
  }
}

//----------------------------------------------


// import { Button, Card, CardActions, CardContent, Grid, Typography } from "@mui/material"
// import { collection, doc, getDoc, getDocs } from "firebase/firestore"
// import { db } from "../../firebase"
// import Link from "next/link"

// const Detail = ({todoProps}) => {
//   const todo = JSON.parse(todoProps)
//   return (
//     <Grid 
//       container 
//       spacing={0} 
//       direction="column" 
//       alignItems="center" 
//       justifyContent="center"
//       style={{minHeight: '100vh'}}
//     >
//       <Grid item xs={3}>
//         <Card 
//           sx={{minWidth: 275, maxWidth:500, boxShadow:3,}}
//           style={{backgroundColor:'#fafafa'}}
//         >
//           <CardContent>
//             <Typography variant="h5" component="div">
//               {todo.title}
//             </Typography>
//             <Typography sx={{mb:1.5}} color="text.secondary">
//               {todo.detail}
//             </Typography>
//           </CardContent>
//           <CardActions>
//             <Link href="/" passHref>
//               <Button size="small">홈으로</Button>
//             </Link>
//           </CardActions>
//         </Card>
//       </Grid> 
//     </Grid>
//   )
// }
// export default Detail

// export const getStaticPaths = async () => {
//   // 다이나믹한 경로를 설정하는 것이기에 getStaticPaths를 이용하여야함
//   const snapshot = await getDocs(collection(db,'todos'));
//   const paths = snapshot.docs.map(doc => {
//     return {
//       params: {id: doc.id.toString()}
//     }
//   })
//   return {
//     paths,
//     fallback: false
//   }
// }
// export const getStaticProps = async (context) => {
//   // getStaticPaths를 통해서 만들어진 params를 이용해
//   // getStaticProps로 props를 만들어서 리턴함
//   const id = context.params.id;
//   const docRef = doc(db, 'todos', id);
//   const docSnap = await getDoc(docRef);
//     return {
//     props: { todoProps: JSON.stringify(docSnap.data()) || null }
//   }
// }