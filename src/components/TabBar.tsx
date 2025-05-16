import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import { fonts } from '../utils/fonts';

type Tab = {
  key: string;
  title: string;
};

type Props = {
  tabs: Tab[];
  onTabChange: (tabKey: string) => void;
};

export const TabBar: React.FC<Props> = ({ tabs, onTabChange }) => {
  const [activeTab, setActiveTab] = useState(tabs[0].key);
  const { width } = useWindowDimensions();
  const tabWidth = (width - 40) / tabs.length;

  const handleTabPress = (tab: Tab) => {
    setActiveTab(tab.key);
    onTabChange(tab.key);
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabsContainer}>
        {tabs.map((tab, index) => (
          <TouchableOpacity
            key={tab.key}
            style={[
              styles.tab,
              { width: tabWidth },
              activeTab === tab.key && styles.activeTab,
              index === 0 && styles.leftTab,
              index === tabs.length - 1 && styles.rightTab,
            ]}
            onPress={() => handleTabPress(tab)}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab.key && styles.activeTabText,
              ]}
            >
              {tab.title.toUpperCase()}
            </Text>
          </TouchableOpacity>
        ))}
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
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 12,
    padding: 4,
  },
  tab: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
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
    opacity: 0.5,
    letterSpacing: 0.5,
  },
  activeTabText: {
    opacity: 1,
  },
});