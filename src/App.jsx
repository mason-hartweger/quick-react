import Banner from './components/Banner';
import CourseCard from './components/CourseCard';
import TermSelectorPage from './components/TermSelectorPage'
import 'bootstrap/dist/css/bootstrap.min.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useJsonQuery } from './utilities/fetch';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { useDbData } from './utilities/firebase';

const Main = () => {
  const [data, isLoading, error] = useDbData('/');
  if (error) return <h1>Error loading user data: {`${error}`}</h1>;
  if (isLoading) return <h1>Loading user data...</h1>;
  if (!data) return <h1>No user data found</h1>;

  return <div>
    <Banner title={data.title}/>
    <TermSelectorPage data={data.courses}/>
  </div>
}

const queryClient = new QueryClient();

const App = () => (
  <BrowserRouter>
  <Routes>
  <Route path="/" element={
    <QueryClientProvider client={queryClient}>
        <div className="container">
          <Main />
        </div>
    </QueryClientProvider>
    }/>
  </Routes>
  </BrowserRouter>
);

export default App;