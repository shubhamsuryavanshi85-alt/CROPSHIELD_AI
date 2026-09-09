import { useState, useEffect } from 'react';
import { INITIAL_FARMS, INITIAL_ALERTS, EXTENSION_WORKERS, DISTRICT_PRESETS } from '../services/geoService';

const STORAGE_KEY_FARMS = 'cropshield_farms_v1';
const STORAGE_KEY_ALERTS = 'cropshield_alerts_v1';
const STORAGE_KEY_REMINDERS = 'cropshield_reminders_v1';
const STORAGE_KEY_ACTIVE_FARM = 'cropshield_active_farm_id';
const STORAGE_KEY_DIAGNOSES = 'cropshield_diagnoses_history';

function sanitizeText(val, fallback = '') {
  if (val === null || val === undefined) return fallback;
  if (typeof val === 'string') return val;
  if (typeof val === 'number') return String(val);
  if (typeof val === 'object') {
    return val.label || val.name || val.diagnosis || val.title || val.disease || fallback;
  }
  return fallback;
}

// Custom lightweight reactive store pattern with localStorage persistence
class FarmStoreManager {
  constructor() {
    this.listeners = new Set();
    this.farms = this.load(STORAGE_KEY_FARMS, INITIAL_FARMS);
    this.alerts = this.load(STORAGE_KEY_ALERTS, INITIAL_ALERTS);
    this.reminders = this.load(STORAGE_KEY_REMINDERS, [
      {
        id: 'rem_01',
        farmName: 'Godavari Green Acres',
        crop: 'Tomato',
        disease: 'Late Blight',
        dueDate: new Date(Date.now() + 3 * 86400000).toISOString().split('T')[0],
        action: 'Re-inspect lower canopy for sporulation and check Ridomil MZ efficacy.',
        completed: false,
      }
    ]);
    this.diagnoses = this.load(STORAGE_KEY_DIAGNOSES, [
      {
        id: `OBS-MH-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`,
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        cropType: 'Tomato',
        diagnosis: 'Late Blight',
        confidence: 81,
        severity: 'high',
        location: 'Nashik',
        status: 'pending_validation'
      },
      {
        id: `OBS-MH-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`,
        timestamp: new Date(Date.now() - 7200000).toISOString(),
        cropType: 'Onion',
        diagnosis: 'Purple Blotch',
        confidence: 62,
        severity: 'moderate',
        location: 'Pune',
        status: 'pending_validation'
      }
    ]);
    if (!Array.isArray(this.farms)) this.farms = INITIAL_FARMS;
    if (!Array.isArray(this.alerts)) this.alerts = INITIAL_ALERTS;
    if (!Array.isArray(this.reminders)) this.reminders = [];
    if (!Array.isArray(this.diagnoses)) this.diagnoses = [];

    // Sanitize any loaded object values to safe strings
    this.diagnoses = this.diagnoses.map((d) => ({
      ...d,
      diagnosis: sanitizeText(d.diagnosis, 'Crop Disease'),
      cropType: sanitizeText(d.cropType, 'Crop'),
      location: sanitizeText(d.location, 'Nashik'),
    }));

    this.alerts = this.alerts.map((a) => ({
      ...a,
      disease: sanitizeText(a.disease, 'Outbreak Alert'),
      crop: sanitizeText(a.crop, 'Crop'),
      district: sanitizeText(a.district, 'District'),
      locationName: sanitizeText(a.locationName, 'Field Location'),
      description: sanitizeText(a.description, 'Field alert details.'),
    }));

    this.farms = this.farms.map((f) => ({
      ...f,
      activeIssue: sanitizeText(f.activeIssue, 'Normal'),
      crop: sanitizeText(f.crop, 'Crop'),
      district: sanitizeText(f.district, 'District'),
    }));

    this.activeFarmId = localStorage.getItem(STORAGE_KEY_ACTIVE_FARM) || 'f001';
    this.workers = Array.isArray(EXTENSION_WORKERS) ? EXTENSION_WORKERS : [];
  }

  load(key, fallback) {
    try {
      const saved = localStorage.getItem(key);
      if (!saved) return fallback;
      const parsed = JSON.parse(saved);
      if (Array.isArray(fallback)) {
        return Array.isArray(parsed) && parsed.length > 0 ? parsed : fallback;
      }
      return parsed ?? fallback;
    } catch {
      return fallback;
    }
  }

  save(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.warn('Storage save error:', e);
    }
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    this.listeners.forEach((listener) => listener());
  }

  getActiveFarm() {
    return this.farms.find((f) => f.id === this.activeFarmId) || this.farms[0];
  }

  setActiveFarm(farmId) {
    this.activeFarmId = farmId;
    localStorage.setItem(STORAGE_KEY_ACTIVE_FARM, farmId);
    this.notify();
  }

  updateFarmContext(farmId, updates) {
    this.farms = this.farms.map((f) => (f.id === farmId ? { ...f, ...updates } : f));
    this.save(STORAGE_KEY_FARMS, this.farms);
    this.notify();
  }

  dispatchExtensionWorker(alertId, workerId, notes = '') {
    const worker = this.workers.find((w) => w.id === workerId);
    this.alerts = this.alerts.map((alert) => {
      if (alert.id === alertId) {
        return {
          ...alert,
          status: 'dispatched',
          assignedWorker: worker ? `${worker.name} (${worker.organization})` : 'Assigned Specialist',
          dispatchNotes: notes,
          dispatchedAt: new Date().toISOString(),
        };
      }
      return alert;
    });
    this.save(STORAGE_KEY_ALERTS, this.alerts);
    this.notify();
  }

  updateAlertStatus(alertId, newStatus) {
    this.alerts = this.alerts.map((a) => (a.id === alertId ? { ...a, status: newStatus } : a));
    this.save(STORAGE_KEY_ALERTS, this.alerts);
    this.notify();
  }

  addReminder(reminder) {
    const newReminder = {
      id: 'rem_' + Date.now(),
      completed: false,
      createdAt: new Date().toISOString(),
      ...reminder,
    };
    this.reminders = [newReminder, ...this.reminders];
    this.save(STORAGE_KEY_REMINDERS, this.reminders);
    this.notify();
    return newReminder;
  }

  toggleReminder(reminderId) {
    this.reminders = this.reminders.map((r) =>
      r.id === reminderId ? { ...r, completed: !r.completed } : r
    );
    this.save(STORAGE_KEY_REMINDERS, this.reminders);
    this.notify();
  }

  addDiagnosisRecord(record) {
    const obsId = `OBS-MH-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
    const sanitizedDiagnosis = sanitizeText(record.diagnosis, 'Crop Pathology Issue');
    const sanitizedCropType = sanitizeText(record.cropType, 'Tomato');
    const sanitizedLocation = sanitizeText(record.location, 'Nashik');

    const newRecord = {
      id: obsId,
      timestamp: new Date().toISOString(),
      status: 'pending_validation',
      ...record,
      diagnosis: sanitizedDiagnosis,
      cropType: sanitizedCropType,
      location: sanitizedLocation,
    };
    this.diagnoses = [newRecord, ...this.diagnoses];
    this.save(STORAGE_KEY_DIAGNOSES, this.diagnoses);

    // If severe, auto-generate or link alert
    if (record.severity === 'high' || record.severity === 'critical') {
      const newAlert = {
        id: 'a_' + Date.now(),
        farmId: this.activeFarmId,
        district: sanitizedLocation,
        locationName: `${sanitizedLocation} — ${sanitizedCropType} Plot`,
        disease: sanitizedDiagnosis,
        crop: sanitizedCropType,
        confidence: record.confidence || 85,
        severity: record.severity,
        status: 'ai_flagged',
        farmsCount: 1,
        confirmedFarms: 0,
        assignedWorker: null,
        date: new Date().toISOString().split('T')[0],
        description: record.description || 'AI diagnosis flagged high severity infection.',
      };
      this.alerts = [newAlert, ...this.alerts];
      this.save(STORAGE_KEY_ALERTS, this.alerts);
    }

    this.notify();
    return newRecord;
  }

  validateDiagnosis(diagnosisId, decision, notes = '') {
    this.diagnoses = this.diagnoses.map((d) => 
      d.id === diagnosisId ? { 
        ...d, 
        status: decision, 
        expertNotes: notes, 
        validatedAt: new Date().toISOString(),
        validatorId: 'EXP-9921' 
      } : d
    );
    this.save(STORAGE_KEY_DIAGNOSES, this.diagnoses);
    this.notify();
  }
}

export const farmStore = new FarmStoreManager();

export function useFarmStore() {
  const [, setTick] = useState(0);

  useEffect(() => {
    return farmStore.subscribe(() => setTick((t) => t + 1));
  }, []);

  return {
    farms: farmStore.farms,
    alerts: farmStore.alerts,
    reminders: farmStore.reminders,
    diagnoses: farmStore.diagnoses,
    activeFarm: farmStore.getActiveFarm(),
    activeFarmId: farmStore.activeFarmId,
    workers: farmStore.workers,
    setActiveFarm: (id) => farmStore.setActiveFarm(id),
    updateFarmContext: (id, updates) => farmStore.updateFarmContext(id, updates),
    dispatchExtensionWorker: (alertId, workerId, notes) =>
      farmStore.dispatchExtensionWorker(alertId, workerId, notes),
    updateAlertStatus: (alertId, status) => farmStore.updateAlertStatus(alertId, status),
    addReminder: (rem) => farmStore.addReminder(rem),
    toggleReminder: (id) => farmStore.toggleReminder(id),
    addDiagnosisRecord: (rec) => farmStore.addDiagnosisRecord(rec),
    validateDiagnosis: (id, decision, notes) => farmStore.validateDiagnosis(id, decision, notes),
  };
}
