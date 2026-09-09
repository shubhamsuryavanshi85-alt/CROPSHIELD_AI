import { View, Text, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';

export default function AdvisoryScreen() {
  const { t } = useTranslation();

  return (
    <ScrollView className="flex-1 bg-parchment-light px-4 py-6">
      <Text className="text-2xl font-bold text-soil-dark mb-4">{t('nav.advisory') || 'Advisory Center'}</Text>
      <View className="bg-white rounded-xl shadow-sm border border-soil-dark/10 p-4">
        <Text className="text-soil-dark/80 text-center">
          Future: IPM Forecasting & Local Weather Data goes here.
        </Text>
      </View>
    </ScrollView>
  );
}
