import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, ActivityIndicator, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { Camera, MapPin, Search } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { diagnoseCrop } from '../../src/services/claudeAPI';
import { useFarmStore } from '../../src/store/farmStore';
import { router } from 'expo-router';

export default function DiagnoseScreen() {
  const { t, i18n } = useTranslation();
  const [imageUri, setImageUri] = useState(null);
  const [imageBase64, setImageBase64] = useState(null);
  const [locationName, setLocationName] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { addDiagnosisRecord } = useFarmStore();

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Camera permission is required to take photos.');
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
      base64: true,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
      setImageBase64(`data:image/jpeg;base64,${result.assets[0].base64}`);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
      base64: true,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
      setImageBase64(`data:image/jpeg;base64,${result.assets[0].base64}`);
    }
  };

  const fetchLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Location permission is required.');
      return;
    }
    
    setLocationName('Locating...');
    try {
      const loc = await Location.getCurrentPositionAsync({});
      // Reverse geocoding
      const address = await Location.reverseGeocodeAsync({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude
      });
      if (address && address.length > 0) {
        const { city, region, country } = address[0];
        setLocationName(`${city || region}, ${country}`);
      } else {
        setLocationName('Location acquired');
      }
    } catch (e) {
      setLocationName('Location failed');
    }
  };

  const startAnalysis = async () => {
    if (!imageBase64) {
      Alert.alert('Missing Image', 'Please capture or select an image of the crop first.');
      return;
    }

    setIsAnalyzing(true);
    try {
      const result = await diagnoseCrop({
        imageBase64: imageBase64,
        cropType: 'Unknown',
        growthStage: 'Unknown',
        symptoms: '',
        location: locationName || 'Unknown Location',
        recentRain: false,
        language: i18n.language,
      });

      // Save to store
      addDiagnosisRecord({
        cropType: 'Unknown',
        diagnosis: result.diagnosis,
        confidence: result.confidence,
        severity: result.severity,
        location: locationName,
        details: result
      });

      // Navigate to results page
      // We pass the result via a simple store or params. For simplicity, we just navigate to a result modal.
      router.push({ pathname: "/result", params: { data: JSON.stringify(result) } });

    } catch (error) {
      Alert.alert('Analysis Failed', error.message);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <ScrollView className="flex-1 bg-parchment-light px-4 py-6">
      <Text className="text-2xl font-bold text-soil-dark mb-2">Crop Diagnosis</Text>
      <Text className="text-soil-dark/70 mb-6">Take a photo of the affected plant to run an AI analysis.</Text>

      <View className="bg-white rounded-xl shadow-sm border border-soil-dark/10 p-4 mb-6">
        {imageUri ? (
          <Image source={{ uri: imageUri }} className="w-full h-64 rounded-lg mb-4" resizeMode="cover" />
        ) : (
          <View className="w-full h-64 bg-mist rounded-lg mb-4 items-center justify-center border-2 border-dashed border-soil-dark/20">
            <Camera color="#A67C0E" size={48} />
            <Text className="text-soil-dark/50 mt-2">No Image Selected</Text>
          </View>
        )}

        <View className="flex-row justify-between gap-2">
          <TouchableOpacity 
            className="flex-1 bg-soil-dark py-3 rounded-lg items-center flex-row justify-center"
            onPress={takePhoto}
          >
            <Camera color="#F5F0E8" size={18} />
            <Text className="text-parchment font-bold ml-2">Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            className="flex-1 bg-mist-dark py-3 rounded-lg items-center"
            onPress={pickImage}
          >
            <Text className="text-soil-dark font-bold">Gallery</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View className="bg-white rounded-xl shadow-sm border border-soil-dark/10 p-4 mb-6 flex-row items-center justify-between">
        <View className="flex-1 flex-row items-center pr-2">
          <MapPin color="#2A5D91" size={20} />
          <Text className="text-soil-dark font-medium ml-2">{locationName || 'Location not set'}</Text>
        </View>
        <TouchableOpacity onPress={fetchLocation} className="bg-sky-blue/10 px-3 py-2 rounded-lg">
          <Text className="text-sky-blue font-bold text-xs">Locate</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity 
        className={`w-full py-4 rounded-xl items-center flex-row justify-center shadow-md ${isAnalyzing || !imageBase64 ? 'bg-field-green/50' : 'bg-field-green'}`}
        onPress={startAnalysis}
        disabled={isAnalyzing || !imageBase64}
      >
        {isAnalyzing ? (
          <ActivityIndicator color="#FFF" />
        ) : (
          <>
            <Search color="#FFF" size={20} />
            <Text className="text-white font-bold text-lg ml-2">Analyze Image</Text>
          </>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}
