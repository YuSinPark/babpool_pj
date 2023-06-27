import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './ownerpages/Home';
import MyStore from './ownerpages/MyStore';
import NavBarElements from './components/NavBar/NavBarElements';
import MyStoreDetails from './ownerpages/MyStoreDetails';
import RegisterRestaurant from './ownerpages/RegisterRestaurant';
import MenuDetails from './ownerpages/MenuDetails';
import ReviewDetails from './ownerpages/ReviewDetails';
import OrderSearch from './ownerpages/OrderSearch';
import AnnounceAndOrigin from './ownerpages/AnnounceAndOrigin';
import OwnerSignup from './ownerpages/OwnerSignup';
import OwnerLogin from './ownerpages/OwnerLogin';
import RepresentativeMenu from './ownerpages/RepresentativeMenu';
import SoldOutHide from './ownerpages/SoldOutHide';
import OwnerMypage from './ownerpages/OwnerMypage';
import ChangePassword from './ownerpages/ChangePassword';
import ChangeNickname from './ownerpages/ChangeNickname';
import MenuOption from './ownerpages/MenuOption';
import SalesManagement from './ownerpages/SalesManagement';
import OrderManagement from './ownerpages/OrderManagement';
import FindMemberId from './ownerpages/FindMemberId';
import ResetPassword from './ownerpages/ResetPassword';
import OrderManagementCooking from './ownerpages/OrderManagementCooking';
import OrderManagementCooked from './ownerpages/OrderManagementCooked';
import "./firebase-messaging-sw"
import "./App.css";

function App() {

  return (
    <div className="App">
      <Router>
      <NavBarElements />
      <div className='content'>
        <Routes>
          <Route path = "/" element = { <HomePage />} />
          <Route path = "/Register" element = { <RegisterRestaurant />} />
          <Route path = "/MyStore/" element = { <MyStore />} />
          <Route path = "/MyStore/:restaurantId" element = { <MyStoreDetails />} />
          <Route path = "/MyStore/:restaurantId/SalesManagement" element = { <SalesManagement />} />
          <Route path = "/MyStore/:restaurantId/MenuManagement" element = { <MenuDetails />} />
          <Route path = "/MyStore/:restaurantId/MenuManagement/MenuOption" element = { <MenuOption />} />
          <Route path = "/MyStore/:restaurantId/MenuManagement/AnnounceAndOrigin" element = { <AnnounceAndOrigin />} />
          <Route path = "/MyStore/:restaurantId/MenuManagement/Represent" element = { <RepresentativeMenu />} />
          <Route path = "/MyStore/:restaurantId/ReviewManagement" element = { <ReviewDetails />} />
          <Route path = "/MyStore/:restaurantId/OrderManagement" element = { <OrderManagement />} />
          <Route path = "/MyStore/:restaurantId/OrderManagement/Cooking" element = { <OrderManagementCooking />} />
          <Route path = "/MyStore/:restaurantId/OrderManagement/Cooked" element = { <OrderManagementCooked />} />
          <Route path = "/MyStore/:restaurantId/OrderManagement/OrderSearch" element = { <OrderSearch />} />
          <Route path = "/MyStore/:restaurantId/SoldOutHide" element = { <SoldOutHide />} />
          <Route path = "/OwnerMypage" element = { <OwnerMypage />} />
          <Route path = "/ChangeNickname" element = { <ChangeNickname />} />
          <Route path = "/ChangePassword" element = { <ChangePassword />} /> 
          <Route path = "/OwnerLogin" element = { <OwnerLogin />} />
          <Route path = "/OwnerSignup" element = { <OwnerSignup />} />
          <Route path = "/FindMemberId" element = { <FindMemberId/> } />
          <Route path = '/ResetPassword' element = { < ResetPassword/>} />
        </Routes>
      </div>
      </Router>
    </div>
  );
}
export default App;