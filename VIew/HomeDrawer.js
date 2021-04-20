import React from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import Home from './Home';
import MyAccount from '../components/homePage/Drawer/MyAccount';
import ContactUs from '../components/homePage/Drawer/ContactUs';
import AboutUs from '../components/homePage/Drawer/AboutUs';
import LogOut from '../components/homePage/Drawer/LogOut';

const Drawer = createDrawerNavigator();

function HomeDrawer() {
    return (
    <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="MyAccount" component={MyAccount} />
        <Drawer.Screen name="ContactUS" component={ContactUs} />
        <Drawer.Screen name="AboutUS" component={AboutUs} />
        <Drawer.Screen name="LogOut" component={LogOut} />
      </Drawer.Navigator>
    );
}

export default HomeDrawer