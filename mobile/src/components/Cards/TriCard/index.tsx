import React from "react";
import { View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import theme, { Text } from "../../../config/Theme";
import { IComponentsDefaults } from "../../../lib/Types";
import Icons from "../../svg";
import { TIcon } from "../../svg/icons/TypeIcons";

interface IColumn {
  icon?: TIcon | JSX.Element;
  title?: string | JSX.Element | number;
  subTitle?: string | JSX.Element | number;
}

interface ITriCard extends IComponentsDefaults {
  col1?: IColumn;
  col2?: IColumn;
  col3?: IColumn;
  onPress?: () => void;
  btnText?: string;
}

const TriCard = (props: ITriCard) => {
  const {
    containerStyle,
    col1,
    col2,
    col3,
    onPress,
    btnText = "View all",
  } = props;

  const ContentView = ({ icon, title, subTitle }: IColumn) => (
    <View style={styles.cardContent}>
      {icon && title && subTitle && (
        <>
          {typeof icon === "string" ? (
            <Icons icon={icon} fill={theme.colors.primary} size={30} />
          ) : (
            icon
          )}

          <View style={styles.cardBody}>
            <ScrollView
              contentContainerStyle={styles.cardBodyContent}
              horizontal
              showsHorizontalScrollIndicator={false}
            >
              {typeof title === "string" ? (
                <Text variant="heading2">{title}</Text>
              ) : (
                title
              )}
            </ScrollView>

            {typeof subTitle === "string" ? (
              <Text variant="bodySmallBold" numberOfLines={1}>
                {subTitle}
              </Text>
            ) : (
              subTitle
            )}
          </View>
        </>
      )}
    </View>
  );

  const paddingBot = onPress ? {} : { paddingBottom: 15 };
  return (
    <View style={[styles.card, paddingBot, containerStyle]}>
      <View style={styles.colsContainer}>
        <ContentView
          icon={col1?.icon}
          title={col1?.title}
          subTitle={col1?.subTitle}
        />
        <View style={[styles.line]} />
        <ContentView
          icon={col2?.icon}
          title={col2?.title}
          subTitle={col2?.subTitle}
        />
        <View style={[styles.line]} />
        <ContentView
          icon={col3?.icon}
          title={col3?.title}
          subTitle={col3?.subTitle}
        />
      </View>

      {onPress && (
        <TouchableOpacity style={styles.bottomButton} onPress={onPress}>
          <Text style={{ textAlign: "center" }} variant="bodyHighlightBold">
            {btnText}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default TriCard;

const styles = StyleSheet.create({
  line: {
    borderLeftWidth: 1,
    height: 60,
    alignSelf: "flex-end",
    marginBottom: 10,
    borderColor: theme.colors.primaryLighter,
  },
  card: {
    marginVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    paddingTop: 15,
    borderColor: theme.colors.primary,
    justifyContent: "space-between",
  },
  colsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  cardContent: {
    justifyContent: "center",
    flex: 1,
    alignItems: "center",
    borderWidth: 10,
    borderColor: "white",
  },
  cardBody: {
    width: "100%",
    alignItems: "center",
  },
  cardBodyContent: {
    flexDirection: "row",
    marginTop: "10%",
    justifyContent: "center",
  },
  cardType: {
    alignSelf: "flex-end",
    opacity: 0.25,
  },

  bottomButton: {
    borderColor: theme.colors.primary,
    justifyContent: "center",
    borderTopWidth: 1,
    alignItems: "center",
    flex: 1,
    padding: 10,
    marginTop: 10,
  },
});
