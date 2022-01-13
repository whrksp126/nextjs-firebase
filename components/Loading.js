import { Grid } from "@mui/material"
import ReactLoding from 'react-loading'

const Loading = ({type, color}) => {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{minHeight: '100vh'}}
    >
      <ReactLoding type={type} color={color} height={'20%'} width={'20%'} />
      
    </Grid>
  )
}

export default Loading


//---------------------------------

// import { Grid } from "@mui/material"
// import ReactLoding from 'react-loading'

// const Loading = ({type, color}) => {
//   return (
//     <Grid
//       container
//       spacing={0}
//       direction="column"
//       alignItems="center"
//       justifyContent="center"
//       style={{minHeight: '100vh'}}
//     >
//       <ReactLoding type={type} color={color} height={'20%'} width={'20%'} />
      
//     </Grid>
//   )
// }

// export default Loading
