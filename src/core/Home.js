// material-UI imports
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
// assets import not working don't know why
// import unicornbikeImg from '../unicornbike.jpg'
import {Link} from 'react-router-dom'
import MenuAppBar from './Appbar'
// Style Declarations
const useStyle = makeStyles(theme => ({
    card: {
      maxWidth: 600,
      margin: 'auto',
      marginTop: theme.spacing(5),
      marginBottom: theme.spacing(5)
    },
    title: {
      padding:`${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(2)}px`,
      color: theme.palette.openTitle
    },
    media: {
      minHeight: 400
    },
    credit: {
      padding: 10,
      textAlign: 'right',
      backgroundColor: '#ededed',
      borderBottom: '1px solid #d0d0d0',
      '& a':{
        color: '#3f4771'
      } 
    }
}))

export default function Home() {
    const classes = useStyle()

    return (
      <div>
        <MenuAppBar />
        <Card className={classes.card}>
            <Typography variant="h6" className="classes.title">
                Home Page
            </Typography>
            <CardMedia 
                className={classes.media}
                image={`${process.env.PUBLIC_URL}/assets/images/unicornbike.jpg`} 
                title="Unicorn Bicycle" 
            />
            
            <CardContent>
                <Typography variant="body2" component="p">
                    Welcome to the MERN Skeleton home page.
                    <Link to="/users">Users</Link>
                </Typography>
            </CardContent>
        </Card>
      </div>
    )
}