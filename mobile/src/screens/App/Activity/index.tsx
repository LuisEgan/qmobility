import { useLazyQuery } from "@apollo/client";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { Button, Header, Icons } from "../../../components";
import { DrawerLeftMenu } from "../../../components/HOCs";
import theme, { Text } from "../../../config/Theme";
import { User } from "../../../gql";
import { IMyStats } from "../../../gql/User/queries";
import { APP_STACK_SCREENS_NAMES } from "../../../lib/constants";
import { FullScreenModal } from "../../Feedback";
import Stats from "./Stats";

const { height } = Dimensions.get("screen");

const Activty = () => {
  const { navigate } = useNavigation();
  const isFocused = useIsFocused();

  const [
    getMyStats,
    { data: getMyStatsData, loading: getMyStatsLoading },
  ] = useLazyQuery<{
    getMyStats: IMyStats;
  }>(User.queries.getMyStats);

  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  useEffect(() => {
    getMyStats();
  }, [isFocused]);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const EveRecommendation = () => (
    <View style={styles.recommendation}>
      <Text variant="heading2" color="primary">
        eVe Range Recommendation
      </Text>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <Text
          variant="subheadingLight"
          color="white"
          style={{ marginVertical: 5 }}
        >
          {`${getMyStatsData?.getMyStats.minRangeRequirement} - ${getMyStatsData?.getMyStats.maxRangeRequirement} miles`}
        </Text>

        <TouchableOpacity
          style={{ flexDirection: "row", alignItems: "center" }}
          onPress={() => navigate(APP_STACK_SCREENS_NAMES.MyRoutes)}
        >
          <Text color="white" style={{ marginRight: 5 }}>
            Edit trips
          </Text>
          <Icons icon="Edit" fill={theme.colors.white} size={15} />
        </TouchableOpacity>
      </View>
    </View>
  );

  if (getMyStatsLoading || !getMyStatsData?.getMyStats) return <FullScreenModal show />;

  return (
    <DrawerLeftMenu
      isDrawerOpen={isDrawerOpen}
      onDrawerToggle={setIsDrawerOpen}
    >
      <View style={styles.container}>
        <Header
          title="My Stats"
          subTitle="eActivity"
          icon="Menu"
          onPress={toggleDrawer}
        />

        <View style={styles.content}>
          <EveRecommendation />

          <Stats stats={getMyStatsData?.getMyStats} />

          <View style={{ height: height * 0.18, justifyContent: "center" }}>
            <Button
              variant="primary"
              label="See matching vehicles"
              onPress={() => navigate(APP_STACK_SCREENS_NAMES.MyMatch)}
            />
          </View>
        </View>
      </View>
    </DrawerLeftMenu>
  );
};

export default Activty;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
    backgroundColor: theme.colors.white,
    flex: 1,
    padding: 15,
  },

  user: {
    flexDirection: "row",
  },
  userText: {
    justifyContent: "space-around",
    paddingHorizontal: 15,
  },

  recommendation: {
    backgroundColor: theme.colors.secondaryDark,
    borderRadius: 10,
    marginVertical: 15,
    padding: 15,
  },
});
