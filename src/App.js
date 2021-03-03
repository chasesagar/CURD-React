import './App.css';
import { BrowserRouter } from 'react-router-dom';
import MainRouter from './MainRouter';
import { ThemeProvider } from '@material-ui/styles'
import theme from './theme'


function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <MainRouter/>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
