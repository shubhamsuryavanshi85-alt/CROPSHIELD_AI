import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import * as Speech from 'expo-speech';
import { Volume2, VolumeX, AlertTriangle, ShieldCheck, ArrowLeft } from 'lucide-react-native';

export default function ResultScreen() {
  const { data } = useLocalSearchParams();
  const result = data ? JSON.parse(data) : null;
  const [isSpeaking, setIsSpeaking] = useState(false);

  if (!result) return <View className="flex-1 justify-center items-center"><Text>No Data</Text></View>;

  const getSpeechLang = (code) => {
    switch (code) {
      case 'hi': return 'hi-IN';
      case 'mr': return 'mr-IN';
      case 'te': return 'te-IN';
      case 'ta': return 'ta-IN';
      default: return 'en-IN';
    }
  };

  const toggleSpeech = () => {
    if (isSpeaking) {
      Speech.stop();
      setIsSpeaking(false);
    } else {
      const speechText = `${result.diagnosis}. ${result.description}. ${result.immediate_actions[0] || ''}`;
      Speech.speak(speechText, {
        language: getSpeechLang(result.advisory_language_key),
        rate: 0.95,
        onDone: () => setIsSpeaking(false),
        onError: () => setIsSpeaking(false),
      });
      setIsSpeaking(true);
    }
  };

  return (
    <ScrollView className="flex-1 bg-parchment-light">
      <View className="p-4 bg-soil-dark flex-row items-center pt-12">
        <TouchableOpacity onPress={() => router.back()} className="mr-4">
          <ArrowLeft color="#FFF" size={24} />
        </TouchableOpacity>
        <Text className="text-white font-bold text-lg">Diagnostic Report</Text>
      </View>

      <View className="p-4 space-y-4">
        <View className="bg-white rounded-xl shadow-sm border-l-4 border-l-danger-red p-4 flex-row justify-between items-start">
          <View className="flex-1">
            <Text className="text-2xl font-bold text-soil-dark mb-1">{result.diagnosis}</Text>
            {result.scientific_name && (
              <Text className="italic text-soil-dark/70 mb-2">{result.scientific_name}</Text>
            )}
            <View className="flex-row items-center">
              <View className="bg-danger-red/10 px-2 py-1 rounded">
                <Text className="text-danger-red font-bold text-xs">{result.severity?.toUpperCase() || 'UNKNOWN'} SEVERITY</Text>
              </View>
              <Text className="ml-2 font-mono text-soil-dark/60 text-xs">Conf: {result.confidence}%</Text>
            </View>
          </View>
          <TouchableOpacity onPress={toggleSpeech} className="bg-mist p-2 rounded-full">
            {isSpeaking ? <VolumeX color="#B03A2E" size={20} /> : <Volume2 color="#2D5A1B" size={20} />}
          </TouchableOpacity>
        </View>

        <View className="bg-white rounded-xl shadow-sm p-4">
          <Text className="font-bold text-soil-dark mb-2 flex-row items-center">
             What You're Seeing
          </Text>
          <Text className="text-soil-dark/80">{result.description}</Text>
        </View>

        {result.immediate_actions && result.immediate_actions.length > 0 && (
          <View className="bg-white rounded-xl shadow-sm p-4">
            <Text className="font-bold text-soil-dark mb-3">Immediate Actions</Text>
            {result.immediate_actions.map((act, i) => (
              <View key={i} className="flex-row mb-2 bg-mist/50 p-2 rounded items-start">
                <Text className="font-bold text-field-green mr-2">{i + 1}.</Text>
                <Text className="text-soil-dark flex-1">{act}</Text>
              </View>
            ))}
          </View>
        )}

        {result.chemical_options && result.chemical_options.length > 0 && (
          <View className="bg-white rounded-xl shadow-sm p-4">
            <View className="flex-row items-center mb-3">
              <ShieldCheck color="#2D5A1B" size={18} />
              <Text className="font-bold text-soil-dark ml-2">Chemical Use</Text>
            </View>
            {result.chemical_options.map((chem, i) => (
              <View key={i} className="mb-2 border-b border-soil-dark/10 pb-2">
                <View className="flex-row justify-between mb-1">
                  <Text className="font-bold text-soil-dark flex-1">{chem.name}</Text>
                  <Text className="bg-field-green/10 text-field-green px-1 py-0.5 rounded text-xs font-mono">{chem.dosage}</Text>
                </View>
                <Text className="text-danger-red text-xs">PHI: {chem.phi_days} days</Text>
              </View>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
}
