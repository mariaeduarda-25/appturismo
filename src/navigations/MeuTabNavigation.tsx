import { BottomTabNavigationProp, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../styles/colors";
import DetailsStackNavigation from "./DetailsStackNavigation";
import {FormsScreen} from "../screens/Forms";


export type MeuStackParamList = {
  PublicacaoTab: undefined;
  Forms: undefined;
};
type MeuScreenProp = BottomTabNavigationProp<MeuStackParamList, 'PublicacaoTab'>
export type MeuTypes = {
  navigation: MeuScreenProp;
};
const Tab = createBottomTabNavigator<MeuStackParamList>();


export function MeuTabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveBackgroundColor: colors.secondary,
        tabBarInactiveBackgroundColor: colors.primary,
        tabBarActiveTintColor: colors.black,
        tabBarInactiveTintColor: colors.black,
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="PublicacaoTab"
        component={DetailsStackNavigation}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="airplane" size={size} color={color} />
          ),
          tabBarLabel: "Publicação",
        }}
      />
      <Tab.Screen
        name="Forms"
        component={FormsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="briefcase" size={size} color={color} />
          ),
          tabBarLabel: "Formulário",
        }}
      />
    </Tab.Navigator>
  );
}