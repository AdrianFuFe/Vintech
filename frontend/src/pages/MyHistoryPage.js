import HeaderBackTitle from "../components/HeaderBackTitle";
import MenuBar from "../components/MenuBar";
import useRemoteHistory from "../hooks/useRemoteHistory";
import HistoryList from "../components/HistoryList";
import { Tabs, Tab, AppBar } from "@material-ui/core";
import { useState } from "react";

const TabPanel = (props) => {
  const { children, value, index } = props;
  return <div>{value === index && <h1>{children}</h1>}</div>;
};

const MyHistoryPage = (props) => {
  const [products] = useRemoteHistory();
  const dataSelled = products.selled;
  const dataBuyed = products.buyed;

  const [value, setValue] = useState(0);
  const handleTabs = (e, val) => {
    setValue(val);
  };

  return (
    <>
      {products && (
        <div id="history">
          <HeaderBackTitle />
          <AppBar id="bookings-menu" position="static" color="transparent">
            <Tabs
              value={value}
              variant="fullWidth"
              onChange={handleTabs}
              centered
            >
              <Tab label="Vendidos" />
              <Tab label="Comprados" />
            </Tabs>
          </AppBar>
          <TabPanel value={value} index={0}>
            <HistoryList data={dataSelled} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <HistoryList data={dataBuyed} />
          </TabPanel>
          <MenuBar />
        </div>
      )}
    </>
  );
};
export default MyHistoryPage;
