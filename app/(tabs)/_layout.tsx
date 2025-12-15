import { Tabs } from "expo-router";
import { LayoutGrid, Clock, Calendar, User } from "lucide-react-native";
import { TabProvider } from "../../contexts/tabContext";
import { CustomTabBar } from "../../components/shared/navBar";

export default function TabsLayout() {
  return (
    <TabProvider>
      <Tabs
        screenOptions={{ headerShown: false }}
        tabBar={(props) => <CustomTabBar {...props} />}
      >
        <Tabs.Screen
          name="a"
          options={{
            title: "Home",
            tabBarIcon: ({ color, size }) => (
              <LayoutGrid color={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name="b"
          options={{
            title: "Attendance",
            tabBarIcon: ({ color, size }) => (
              <Clock color={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name="c"
          options={{
            title: "Apply",
            tabBarIcon: ({ color, size }) => (
              <Calendar color={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name="d"
          options={{
            title: "Profile",
            tabBarIcon: ({ color, size }) => <User color={color} size={size} />,
          }}
        />
      </Tabs>
    </TabProvider>
  );
}
