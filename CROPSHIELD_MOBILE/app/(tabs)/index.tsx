import { View, Text, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useFarmStore } from '../../src/store/farmStore';
import { Leaf, AlertTriangle } from 'lucide-react-native';
import { router } from 'expo-router';

export default function DashboardScreen() {
  const { t } = useTranslation();
  const { activeFarm, alerts } = useFarmStore();

  return (
    <ScrollView className="flex-1 bg-parchment-light px-4 py-6">
      <View className="mb-6">
        <Text className="text-sm font-bold text-soil-dark/60 uppercase">Active Farm</Text>
        <Text className="text-3xl font-bold text-soil-dark">{activeFarm?.name || 'Loading...'}</Text>
        <Text className="text-soil-dark/80">{activeFarm?.district || ''} District</Text>
      </View>

      <View className="flex-row gap-4 mb-6">
        <View className="flex-1 bg-white p-4 rounded-xl shadow-sm border border-soil-dark/10">
          <Leaf color="#2D5A1B" size={24} />
          <Text className="text-2xl font-bold text-soil-dark mt-2">{activeFarm?.totalArea || 0}</Text>
          <Text className="text-xs text-soil-dark/60">Total Acres</Text>
        </View>
        <View className="flex-1 bg-white p-4 rounded-xl shadow-sm border border-soil-dark/10">
          <AlertTriangle color="#B03A2E" size={24} />
          <Text className="text-2xl font-bold text-soil-dark mt-2">{alerts.filter(a => a.status === 'ai_flagged').length}</Text>
          <Text className="text-xs text-soil-dark/60">Active Alerts</Text>
        </View>
      </View>

      <View className="flex-row items-center justify-between mb-3">
        <Text className="text-lg font-bold text-soil-dark">Recent Alerts</Text>
        <Text onPress={() => router.push('/expert')} className="text-sky-blue font-bold text-sm">Expert Portal</Text>
      </View>
      {alerts.slice(0, 3).map((alert, i) => (
        <View key={i} className={`p-4 mb-3 bg-white rounded-xl shadow-sm border-l-4 ${alert.severity === 'critical' ? 'border-l-danger-red' : 'border-l-warning-amber'}`}>
          <Text className="font-bold text-soil-dark">{alert.disease}</Text>
          <Text className="text-xs text-soil-dark/70 mt-1">{alert.locationName}</Text>
        </View>
      ))}
    </ScrollView>
  );
}
