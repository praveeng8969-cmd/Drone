export type AppView =
  | 'login'
  | 'dashboard'
  | 'projects'
  | 'drone-imagery'
  | 'ai-processing'
  | 'parcel-mapping'
  | 'validation'
  | 'settings'
  | 'support';

export type ParcelStatus = 'AI_DETECTED' | 'VERIFIED' | 'REJECTED' | 'CONFLICT';

export interface Parcel {
  id: string;
  code: string;
  surveyNumber: string;
  zone: string;
  areaSqMeters: number;
  perimeterMeters: number;
  confidenceScore: number;
  status: ParcelStatus;
  zoningType: 'Residential' | 'Commercial' | 'Mixed Use' | 'Industrial' | 'Public Infrastructure' | 'Agricultural';
  ownerName?: string;
  landUseCode: string;
  centroid: [number, number]; // [x, y] in percentage or coordinates
  polygon: [number, number][]; // vertices in percentage
  notes?: string;
  updatedAt: string;
}

export interface BuildingFootprint {
  id: string;
  parcelId?: string;
  areaSqMeters: number;
  heightEstMeters: number;
  floorsEst: number;
  confidence: number;
  polygon: [number, number][];
}

export interface RoadSegment {
  id: string;
  name: string;
  type: 'Arterial' | 'Secondary' | 'Local Lane' | 'Highway';
  path: string; // SVG path or coordinates
}

export interface SurveyProject {
  id: string;
  name: string;
  zone: string;
  status: 'PROCESSING' | 'COMPLETED' | 'VALIDATION' | 'QUEUED';
  areaKm2: number;
  parcelsCount: number;
  buildingsCount: number;
  accuracy: number;
  thumbnailUrl: string;
  originalDroneUrl: string;
  aiExtractionUrl: string;
  createdAt: string;
  lastSurveyDate: string;
  gsdResolution: string; // e.g. "2.5 cm/px"
  droneModel: string;
  operator: string;
}

export interface PipelineStep {
  id: number;
  name: string;
  shortName: string;
  status: 'completed' | 'active' | 'pending';
  progress?: number;
  description: string;
  processingTime?: string;
}

export interface MapLayerConfig {
  parcelBoundaries: boolean;
  buildings: boolean;
  roads: boolean;
  waterBodies: boolean;
  vegetation: boolean;
  aiConfidenceHeatmap: boolean;
}

export interface ValidationItem {
  id: string;
  parcelCode: string;
  issueType: string;
  severity: 'high' | 'medium' | 'low';
  confidence: number;
  detectedArea: number;
  registeredArea: number;
  deltaPercent: number;
  status: 'pending' | 'resolved' | 'rejected';
  zone: string;
  coordinates: string;
  description?: string;
  aiSuggestion?: string;
}
