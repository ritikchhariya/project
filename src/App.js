import './App.css';
import { useState } from 'react';
import chocolateData from './Data';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import Slider from 'react-slick'; // Import Slider component from react-slick
import 'slick-carousel/slick/slick.css'; // Import slick-carousel CSS
import 'slick-carousel/slick/slick-theme.css'; // Import slick-carousel theme CSS

function App() {
  const [selectedChocolates, setSelectedChocolates] = useState([]);

  // Your existing code for handling chocolate selection and s
  
    const handleChocolateSelection = (chocolate, quantity) => {
      const updatedSelection = [...selectedChocolates];
      const existingIndex = updatedSelection.findIndex((c) => c.id === chocolate.id);
  
      if (existingIndex !== -1) {
        updatedSelection[existingIndex].quantity = quantity;
      } else {
        updatedSelection.push({ ...chocolate, quantity });
      }
  
      const totalItems = updatedSelection.reduce((total, c) => total + c.quantity, 0);
  
      if (totalItems <= 8) {
        setSelectedChocolates(updatedSelection);
      }
    };
  
    const addChocolate = (chocolate) => {
      handleChocolateSelection(chocolate, (selectedChocolates.find((c) => c.id === chocolate.id)?.quantity || 0) + 1);
    };
  
    const subtractChocolate = (chocolate) => {
      const currentQuantity = selectedChocolates.find((c) => c.id === chocolate.id)?.quantity || 0;
      if (currentQuantity > 0) {
        handleChocolateSelection(chocolate, currentQuantity - 1);
      }
    };
  
    const getTotalChocolatesAdded = (chocolateId) => {
      const selectedChocolate = selectedChocolates.find((c) => c.id === chocolateId);
      return selectedChocolate ? selectedChocolate.quantity : 0;
    };
  
    const totalSelectedChocolates = selectedChocolates.reduce((total, c) => total + c.quantity, 0);
  
    const totalPrice = selectedChocolates.reduce((total, c) => total + c.price * c.quantity, 0);
  
    // Create an array of chocolateData grouped into arrays of 4
    // const groupedChocolates = chocolateData.reduce((acc, _, index) => {
    //   if (index % 4 === 0) {
    //     acc.push(chocolateData.slice(index, index + 4));
    //   }
    //   return acc;
    // }, []);
  // Slider settings
  const sliderSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4, // Number of cards to show at once (adjust as needed)
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1200, // Breakpoint for medium-sized screens
        settings: {
          slidesToShow: 3, // Adjust the number of cards for medium screens
        },
      },
      {
        breakpoint: 992, // Breakpoint for small-sized screens
        settings: {
          slidesToShow: 2, // Adjust the number of cards for small screens
        },
      },
      {
        breakpoint: 768, // Breakpoint for extra small screens
        settings: {
          slidesToShow: 1, // Adjust the number of cards for extra small screens (mobile)
        },
      },
    ],
  };
  return (
   <>
    <div className="container">
        <div className="head">
        <h4 className='heading'>Total Chocolate: {totalSelectedChocolates}</h4>
        <h4 className='heading2'>Total Price: ${totalPrice.toFixed(2)}</h4>
        </div>
        <Slider {...sliderSettings}>
          {chocolateData.map((chocolate) => (
            <div className="card bg-light" key={chocolate.id}>
              <img src={chocolate.img} style={{ width: "100%", height: "50%" }} className="card-img-top" alt={chocolate.name} />
              <div className="card-body">
                <h5 className="card-title">{chocolate.name}</h5>
                <p className="card-text">Price: ${chocolate.price.toFixed(2)}</p>
                <span>Chocolates Added: {getTotalChocolatesAdded(chocolate.id)}</span>
                <div>
                <button className='btn btn-outline-danger m-2 ' onClick={() => addChocolate(chocolate)}>Add Chocolate</button>
                <button className='btn btn-outline-danger m-1 ' onClick={() => subtractChocolate(chocolate)}>Subtract Chocolate</button>

                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
   </>
  );
}

export default App;
