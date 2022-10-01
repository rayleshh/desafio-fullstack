import './App.css';
import { Container } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import RouterConfig from './navigation/RouterConfig';

function App() {
  return (
    <div className="App">
      <Container>
        <BrowserRouter>
          <RouterConfig />
        </BrowserRouter>
      </Container>
    </div>
  );
}

export default App;
