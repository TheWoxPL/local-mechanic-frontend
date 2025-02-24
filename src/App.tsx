import { BrowserRouter, Route, Routes } from 'react-router';
import { IndexPage } from 'src/pages/indexPage/indexPage';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IndexPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
