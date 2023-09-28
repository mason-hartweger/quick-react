import Banner from './components/Banner';
import CourseCard from './components/CourseCard';
import TermSelectorPage from './components/TermSelectorPage'
import 'bootstrap/dist/css/bootstrap.min.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useJsonQuery } from './utilities/fetch';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

const Main = () => {
  const [data, isLoading, error] = useJsonQuery('https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php');
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
    <QueryClientProvider client={queryClient}>
        <div className="container">
          <Main />
        </div>
    </QueryClientProvider>
  </BrowserRouter>
);

export default App;