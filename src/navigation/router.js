import {createAppContainer} from 'react-navigation';
import Employes from '../screens/employes';
import EmployesForm from '../screens/create_employes';
import EmployeeDetails from '../screens/employee_details';
import {createStackNavigator} from 'react-navigation-stack';

const HomePage = createStackNavigator({
  Employes: {
    screen: Employes,
    navigationOptions: ({}) => ({
      title: 'Employees',
      headerStyle: {
        backgroundColor: 'rgb(255,217,25)',
      },
    }),
  },
  EmployeeDetails: {
    screen: EmployeeDetails,
    navigationOptions: ({}) => ({
      title: 'Employee Details',

      headerStyle: {
        backgroundColor: 'rgb(255,217,25)',
      },
    }),
  },

  EmployesForm: {
    screen: EmployesForm,
    navigationOptions: ({navigation}) => ({
      title: navigation.state.params.title,

      headerStyle: {
        backgroundColor: 'rgb(255,217,25)',
      },
    }),
  },
});

const AppContainer = createAppContainer(HomePage);
export default AppContainer;
