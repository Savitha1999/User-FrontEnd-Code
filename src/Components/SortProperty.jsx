import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const SortProperty = () => {
  const navigate = useNavigate();

  const handleSortChange = (path) => {
    navigate(path);
  };
  const handlePageNavigation = () => {
    navigate('/mobileviews'); // Redirect to the desired path
  };
  return (
     <div className="container d-flex align-items-center justify-content-center p-0">
           <div className="d-flex flex-column align-items-center justify-content-center m-0" style={{ maxWidth: '500px', margin: 'auto', width: '100%' ,fontFamily: 'Inter, sans-serif'}}>
 
       <div className="row g-2 w-100">
         <div className="d-flex align-items-center justify-content-start w-100" style={{background:"#EFEFEF" }}>
           <button className="pe-5" onClick={handlePageNavigation}
           ><FaArrowLeft color="#30747F"/> 
         </button> <h3 className="m-0 ms-3" style={{fontSize:"20px"}}>Sort Property</h3> </div>
            
           <div className="w-100">
       
        <div className="card-body p-0">
          <ul className="list-group list-group-flush">
            <li className="list-group-item cursor-pointer">
              <div className="form-check ">
                <input
                  className="form-check-input"
                  type="radio"
                  name="sortOption"
                  id="lowToHigh"
                  onChange={() => handleSortChange('/sort/low-to-high')}
                />
                <label className="form-check-label" htmlFor="lowToHigh">
                  Price: Low to High
                </label>
              </div>
            </li>

            <li className="list-group-item cursor-pointer">
              <div className="form-check ">
                <input
                  className="form-check-input"
                  type="radio"
                  name="sortOption"
                  id="highToLow"
                  onChange={() => handleSortChange('/sort/high-to-low')}
                />
                <label className="form-check-label" htmlFor="highToLow">
                  Price: High to Low
                </label>
              </div>
            </li>

            <li className="list-group-item cursor-pointer">
              <div className="form-check ">
                <input
                  className="form-check-input"
                  type="radio"
                  name="sortOption"
                  id="oldToNew"
                  onChange={() => handleSortChange('/sort/old-to-new')}
                />
                <label className="form-check-label" htmlFor="oldToNew">
                  Sort :- Old Date to New Date
                </label>
              </div>
            </li>

            <li className="list-group-item cursor-pointer">
              <div className="form-check ">
                <input
                  className="form-check-input"
                  type="radio"
                  name="sortOption"
                  id="newToOld"
                  onChange={() => handleSortChange('/sort/new-to-old')}
                />
                <label className="form-check-label" htmlFor="newToOld">
                  Sort :- New Date to Old Date
                </label>
              </div>
            </li>

            <li className="list-group-item cursor-pointer">
              <div className="form-check ">
                <input
                  className="form-check-input"
                  type="radio"
                  name="sortOption"
                  id="withImage"
                  onChange={() => handleSortChange('/sort/with-image')}
                />
                <label className="form-check-label" htmlFor="withImage">
                  Sort :- Property With Image
                </label>
              </div>
            </li>

            <li className="list-group-item cursor-pointer">
              <div className="form-check ">
                <input
                  className="form-check-input"
                  type="radio"
                  name="sortOption"
                  id="notViewed"
                  onChange={() => handleSortChange('/sort/zero-view')}
                />
                <label className="form-check-label" htmlFor="notViewed">
                  Not Viewed Property
                </label>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    </div>
    </div>

  );
};

export default SortProperty;
