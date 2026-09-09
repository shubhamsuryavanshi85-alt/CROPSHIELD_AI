import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useFarmStore } from '../src/store/farmStore';
import { CheckCircle2, XCircle, Clock } from 'lucide-react-native';
import { router } from 'expo-router';

export default function ExpertValidationCenter() {
  const { diagnoses, validateDiagnosis } = useFarmStore();
  const pending = diagnoses.filter(d => d.status === 'pending_validation');

  const [activeTab, setActiveTab] = useState('pending');

  const handleValidate = (id, decision) => {
    validateDiagnosis(id, decision, '');
  };

  return (
    <ScrollView className="flex-1 bg-parchment-light px-4 py-6">
      <View className="mb-6">
        <Text className="text-2xl font-bold text-soil-dark mb-1">Expert Validation Center</Text>
        <Text className="text-soil-dark/70">Review and validate AI pathology detections.</Text>
      </View>

      <View className="flex-row gap-2 mb-6 bg-mist p-1 rounded-lg">
        <TouchableOpacity 
          className={`flex-1 py-2 rounded-md items-center ${activeTab === 'pending' ? 'bg-white shadow-sm' : ''}`}
          onPress={() => setActiveTab('pending')}
        >
          <Text className={`font-bold ${activeTab === 'pending' ? 'text-soil-dark' : 'text-soil-dark/50'}`}>Pending ({pending.length})</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          className={`flex-1 py-2 rounded-md items-center ${activeTab === 'history' ? 'bg-white shadow-sm' : ''}`}
          onPress={() => setActiveTab('history')}
        >
          <Text className={`font-bold ${activeTab === 'history' ? 'text-soil-dark' : 'text-soil-dark/50'}`}>History</Text>
        </TouchableOpacity>
      </View>

      {activeTab === 'pending' && pending.map((d) => (
        <View key={d.id} className="bg-white p-4 rounded-xl shadow-sm border border-soil-dark/10 mb-4">
          <View className="flex-row justify-between mb-2">
            <Text className="font-bold text-soil-dark text-lg">{d.diagnosis}</Text>
            <View className="bg-warning-amber/10 px-2 py-1 rounded">
              <Text className="text-warning-amber font-bold text-xs">{d.confidence}% AI</Text>
            </View>
          </View>
          <Text className="text-soil-dark/70 mb-1">{d.cropType} • {d.location}</Text>
          <Text className="text-soil-dark/50 text-xs mb-4">Reported: {new Date(d.timestamp).toLocaleString()}</Text>
          
          <View className="flex-row gap-2">
            <TouchableOpacity 
              className="flex-1 bg-field-green py-2 rounded-lg flex-row justify-center items-center"
              onPress={() => handleValidate(d.id, 'validated')}
            >
              <CheckCircle2 color="#FFF" size={16} />
              <Text className="text-white font-bold ml-2">Confirm</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              className="flex-1 bg-danger-red py-2 rounded-lg flex-row justify-center items-center"
              onPress={() => handleValidate(d.id, 'rejected')}
            >
              <XCircle color="#FFF" size={16} />
              <Text className="text-white font-bold ml-2">Reject</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}

      {activeTab === 'pending' && pending.length === 0 && (
        <View className="items-center py-10">
          <CheckCircle2 color="#5C9E31" size={48} />
          <Text className="text-soil-dark mt-4 font-bold">No pending validations!</Text>
        </View>
      )}
    </ScrollView>
  );
}
