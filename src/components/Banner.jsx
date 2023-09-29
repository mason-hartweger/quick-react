import Navigation from './Navigation';

const Banner = ({title}) => (
    <div flexdirection='row'>
      <div><h1>{ title }</h1></div>
      <div style={{float: 'right'}}><Navigation></Navigation></div>
      
    </div>
);

export default Banner;