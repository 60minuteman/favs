import React, { useState, useCallback, memo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  AccessibilityRole,
  Platform,
  ViewStyle,
} from 'react-native';
import { fonts } from '../utils/fonts';

export interface TabItem {
  key: string;
  title: string;
  accessibilityLabel?: string;
  testID?: string;
}

export interface TabBarProps {
  tabs: TabItem[];
  onTabChange: (tabKey: string) => void;
  initialTab?: string;
  style?: any;
  activeTabColor?: string;
  inactiveTabColor?: string;
  backgroundColor?: string;
}

const TabBarComponent: React.FC<TabBarProps> = ({
  tabs,
  onTabChange,
  initialTab,
  style,
  activeTabColor = '#FFFFFF',
  inactiveTabColor = 'rgba(0, 0, 0, 0.1)',
  backgroundColor = 'rgba(0, 0, 0, 0.1)',
}) => {
  const [activeTab, setActiveTab] = useState(initialTab ?? tabs[0].key);
  const { width } = useWindowDimensions();
  const tabWidth = (width - 40) / tabs.length;

  const handleTabPress = useCallback((tab: TabItem) => {
    setActiveTab(tab.key);
    onTabChange(tab.key);
  }, [onTabChange]);

  return (
    <View style={[styles.container, style]} accessibilityRole="tablist">
      <View style={[styles.tabsContainer, { backgroundColor }]}>
        {tabs.map((tab, index) => {
          const isActive = activeTab === tab.key;
          const isFirstTab = index === 0;
          const isLastTab = index === tabs.length - 1;

          return (
            <TouchableOpacity
              key={tab.key}
              style={[
                styles.tab,
                { width: tabWidth },
                isActive && [styles.activeTab, { backgroundColor: activeTabColor }],
                isFirstTab && styles.leftTab,
                isLastTab && styles.rightTab,
              ]}
              onPress={() => handleTabPress(tab)}
              activeOpacity={0.7}
              accessibilityRole="tab"
              accessibilityLabel={tab.accessibilityLabel || `${tab.title} tab`}
              accessibilityState={{ selected: isActive }}
              testID={tab.testID || `tab-${tab.key}`}
            >
              <Text
                style={[
                  styles.tabText,
                  isActive && styles.activeTabText,
                  !isActive && { opacity: 0.5 },
                ]}
                numberOfLines={1}
              >
                {tab.title.toUpperCase()}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  tabsContainer: {
    flexDirection: 'row',
    height: 40,
    borderRadius: 12,
    padding: 4,
  },
  tab: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeTab: {
    borderRadius: 10,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  leftTab: {
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  rightTab: {
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  tabText: {
    fontSize: 14,
    fontFamily: fonts.medium,
    color: '#000',
    letterSpacing: 0.5,
  },
  activeTabText: {
    opacity: 1,
    fontFamily: fonts.semiBold,
  },
});

export const TabBar = memo(TabBarComponent);