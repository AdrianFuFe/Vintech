import HeaderBackTitle from '../components/HeaderBackTitle';
import MenuBar from '../components/MenuBar';
import {Tabs, Tab, AppBar} from '@material-ui/core';
import { useState } from 'react';
import useRemoteBookingsIn from '../hooks/useRemoteBookingsIn';
import useRemoteBookingsOut from '../hooks/useRemoteBookingsOut';
import BookingsList from '../components/BookingsList';


const TabPanel = (props) => {
  const {children, value, index}= props;
  return(
    <div>
      {
        value===index
        && 
        (<h1>{children}</h1>)
      }
    </div>
  )
}

const MyBookingsPage = (props) => {

  const [bookingsIn] = useRemoteBookingsIn();
  const [bookingsOut] = useRemoteBookingsOut();

  console.log(bookingsIn);
  
  const [value, setValue] = useState(0);
  const handleTabs = (e,val) => {
    setValue(val)
  }


  return (
    <>
      <HeaderBackTitle />
      <AppBar position='static' color='transparent'>
        <Tabs value={value} variant='fullWidth' onChange={handleTabs} centered> 
          <Tab label='RECIBIDAS'/>
          <Tab label='ENVIADAS'/>
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <BookingsList bookings={bookingsIn.bookings} bkInfo={bookingsIn.bkInfo}/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <BookingsList bookings={bookingsOut.bookings} bkInfo={bookingsOut.bkInfo}/>
      </TabPanel>
      <MenuBar />
    </>
  )
}
export default MyBookingsPage;