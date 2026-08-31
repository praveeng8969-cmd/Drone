import { Parcel, BuildingFootprint, RoadSegment, SurveyProject, PipelineStep, ValidationItem } from '../types';

export const IMAGES = {
  // Login GIS hero background
  loginGisBg: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAGXIdqyCySfzqmBo4UczAYKFtjdbhOZTv4eSMIuFptvjFOX-TBQk0BlXgS15s9v1RhPkV6SsBd8l23fdquHzUSKF6zOlesDUIyr0I4Ib1vRrmiRT2Obnp760BDfhmda6tHnOry6pyLB-C7nhsgC_yWIzKSkZ6mzSsVNefujoR9W5xScqYYz5nrBlmot4xfUto2XSlg2ccreRogzXuIfbtH_IAv1q6FVNl3cHHW5jXFcvEJ2KvOFpHblQ',
  // Designer space background (from alternate screen)
  spaceBg: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBK4Og2VAGbfmrAW5ARWbsuT0DKydFPxiZEZNGybiMANc1egEeRkVOLJKttjopS6OYbjYaC9pLAm78xHZbcjZCOG2JFvW-UJb2qZ2jrYoIhn5jnmQXEsgBlcX6ZTH8WddRbuW-d0zvAj_WisW5NbNsRKU_LZttwe4_jaa0jKOU5pBhSq224O6qIduNIXSAu5bQeRkhIen8JJupV2e0jB2LHpyxo0nImk3xIu8qsZo1-ydaPSpRBZk5C3Q',
  // Chennai Drone Satellite
  chennaiSatellite: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAR-OUVrMissri316aouwq8i173RV4tC8GkrYy67IXPOYoGHxaWkEKpxRtU1x5_HhAvNXuEGlJL3yqHSttRKFEBoHSJjklIh3NQszQdhYTWanqYu4rpQC13lQzs8DDqYYdYmGkfuUmgyN0oiKpPVmKKReKOQTey7GaymkwhavNVVOKAAAe-nWidapk4lGgpJX1zbUzFZIqWHIDLu4bxZ1r01Eos4wZKQ7yjuPyibf1jAWIHP8vftGyFVg',
  // AI Split Screen Left: Original Drone Orthomosaic
  originalDrone: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD6OFjkYZShhct7tdzHcakgHeuIpuKVSFf7kl2TN47cT6HtmqqN4x3SgD3_QjeTf8OUnvohBIfWOVAsqTb-lXaDCSUsPUi7vQP15hvxfMJqWNqMT8rL9Iu_w7TXYqYa_2KK9K4mFlCyDxyQ__79Fd9pAlKgD1ZhVZl7-Uug_6fOrMFhB0EVRLBDtXaYN9oAGL7NqubDyZp_XG_AFQkNSSG38yMoU7W3eHBiW-MxSa0FZ4yEcArYwQzaoA',
  // AI Split Screen Right: AI Cadastral Extraction Overlay
  aiExtraction: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCjSpFuf2vKsVVyD5TfpBmDBR7dWP_IlVg7VzL2-UqoPg2V7Ki6_DMnU54VLo6QA-Oc0H9rgJV3iscTBfgxnMqaPbI7e518-D_CxIebLs-tSvzbGVVCagtW0Xf9bQgPs9M-vlA3DfktCi3v2hTTN6q5Ys1_6-CI9DDu9g2irb3XcCmqn_Bed8El5qGcaA-W_QcoTVJSXEFu4vea7RegWTvlhkrdNj5g7KTPLXSGMvSKwV-_47_q_D1Gdw',
  // Project Thumbnails
  chennaiThumb: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCSwfE7PCPav0S4rEaH_YTMc9f1TiWVrhDWdNTi720XwXKM6z5hJ2J9oyDcd29EGgV-t3g0NJUG_a3nMpvh_ZBbyZUCeJDAKn8NNAbRCSbwJ-jnH8i8usiNVAeb67AL43WWPtAPVj69xlH-7094nPFopbvp7zEENU77-Wvb8u24PDx_mH2fb7758McqrLK4d7pEfhrvTvv9qchn9_drJ0DuPiu4l346uZVoPZtImwRAe7O02Z_2axOShQ',
  coimbatoreThumb: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCWKIneTZrPzpE0UgFYu0xWn5CA2oSgTo2eHRugNRXLWzrA8onO5w3p6pTJdAWIqTbtza7l-5-8fSLpL3roRSVM8I1oeAOCu7zBrOw-V1UkmSczsZbF6_PX6WEy25FwZGM0JnNFeIw4XN7oag8DNrIPghi_bhCbrapDKRN-zGsHEFjz2FPYVAUygWkW1reNlSnY8rChMK50upKG5Euzx_2S3VyGEEeRarx3pAD8HH9omMwx3fuDbx4L2A',
  maduraiThumb: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDiNXMSUSISNsNgesiyVpb1psS2NZP9xKj8QgQVtLJLJxc4QAjb-9_Dg28qs_qnGosvIvj7B6EaSbwgP-8MBn4c0Yqfl2QiXmOd4u91cUgVi2oYXZYMNGvji7DWqXsiKaOi1yzsYIbwwdkba98-Z6UhcRejnLXUwnJxvtp8LLWvEs78G3-fpQK83YGm1P9dntwiVfhu3JXBY1EkOhdi0BMSQ8Td8iGO7wZFRonBh-MnCIajpPDwMS0dIw',
  // Survey Officer Avatars
  avatar1: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBLuouCKDE507kDsaPibCQr4hkhYyIMmBO4mp9f4gwNeFjbuhy2Fh_o-71ATLhWEDy8giZFf0ZX69cLDNDZLVfeGpQZRo3_AhZ3oD69i613qNzWt2attc047czBEaml3is1X9QZ6SoKUahb7sA7bm4_sK1998RP5-QQnGGaCDYaqkLAyxZrC1RnwIUJenCa5jCis1pU_G_dpU1dpeYj1_s9QQ7b6aPZ23KchzB12LLZsqpiBHKExXB1tg',
  avatar2: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCPwgblAfBysm4hI20wBGY5w4Zu8OObj39I658yzEh0sfgt2Ads8X6mXyWDWR_8E3baBx1WV8Le7iCovJh0Z9omkuLDFUpcPG3eIFdF8dv04HudZ1glsCOy7sDxrCM9BvypFimoHM8uLWNy1vrTtp9Pm-yWxJVt_znJQhfuX4zZavEIb-GZphA9jgR1kfgW3tp29ruBdepi39iwhHRHSKlpq36Ttc-psIHnmg_wmS7q9z8DFZqSTic8Kw',
  designerAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBs7lWQ9zdZOydRqcQYpiNvMFP8PebY07RRFbT3S7b4VV_Oks3ojjQGxSkHuWCiwKXWMHCNX-Nd8fiw9kz11AIXdJSYMGIz_InQgS4EOEXS3Z9342RUGmTeUD2QGj1uf3HE7Iq14RKMSGVwZtJIXpZLkr-JhMQXbKjUUmgA1wdM_0qsoHMHSa9p9IOaRQHIlehEHwedfDhUU2NwzkWV1L2hlk72Gqf9odSiQe7_xh8ZJQmDqWoIXUeBNg'
};

export const MOCK_PROJECTS: SurveyProject[] = [
  {
    id: 'proj-chn-01',
    name: 'Chennai Urban Survey',
    zone: 'Zone 04 (Mylapore / Egmore)',
    status: 'PROCESSING',
    areaKm2: 12.4,
    parcelsCount: 5230,
    buildingsCount: 8420,
    accuracy: 94.7,
    thumbnailUrl: IMAGES.chennaiThumb,
    originalDroneUrl: IMAGES.originalDrone,
    aiExtractionUrl: IMAGES.aiExtraction,
    createdAt: '2026-08-12',
    lastSurveyDate: '2026-08-28',
    gsdResolution: '2.4 cm/px',
    droneModel: 'DJI Matrice 350 RTK + Zenmuse P1',
    operator: 'K. Rajagopal (Sr. GIS Surveyor)'
  },
  {
    id: 'proj-cbe-02',
    name: 'Coimbatore Municipal Survey',
    zone: 'Zone 02 (Gandhipuram Industrial)',
    status: 'COMPLETED',
    areaKm2: 18.1,
    parcelsCount: 8912,
    buildingsCount: 11500,
    accuracy: 96.2,
    thumbnailUrl: IMAGES.coimbatoreThumb,
    originalDroneUrl: IMAGES.originalDrone,
    aiExtractionUrl: IMAGES.aiExtraction,
    createdAt: '2026-07-15',
    lastSurveyDate: '2026-08-10',
    gsdResolution: '2.1 cm/px',
    droneModel: 'WingtraOne GEN II VTOL',
    operator: 'M. Sridhar (Chief Cadastral Officer)'
  },
  {
    id: 'proj-mdu-03',
    name: 'Madurai Urban Mapping',
    zone: 'Zone 01 (Temple Precinct & Old Ward)',
    status: 'VALIDATION',
    areaKm2: 12.3,
    parcelsCount: 4500,
    buildingsCount: 7395,
    accuracy: 92.8,
    thumbnailUrl: IMAGES.maduraiThumb,
    originalDroneUrl: IMAGES.originalDrone,
    aiExtractionUrl: IMAGES.aiExtraction,
    createdAt: '2026-08-01',
    lastSurveyDate: '2026-08-24',
    gsdResolution: '2.5 cm/px',
    droneModel: 'senseFly eBee X',
    operator: 'A. Meenakshi (Spatial Systems Lead)'
  },
  {
    id: 'proj-blr-04',
    name: 'Bengaluru Tech Corridor Survey',
    zone: 'Outer Ring Road & Bellandur North',
    status: 'PROCESSING',
    areaKm2: 24.8,
    parcelsCount: 11420,
    buildingsCount: 16800,
    accuracy: 95.1,
    thumbnailUrl: IMAGES.chennaiThumb,
    originalDroneUrl: IMAGES.originalDrone,
    aiExtractionUrl: IMAGES.aiExtraction,
    createdAt: '2026-08-18',
    lastSurveyDate: '2026-08-29',
    gsdResolution: '1.8 cm/px',
    droneModel: 'DJI Inspire 3 RTK',
    operator: 'P. Varma (Lead Drone Pilot)'
  }
];

export const MOCK_PARCELS: Parcel[] = [
  {
    id: 'p-001',
    code: 'URB-CHN-00452',
    surveyNumber: 'TS-452/B-1',
    zone: 'Zone 04 - Mylapore Sector',
    areaSqMeters: 1248.6,
    perimeterMeters: 154.8,
    confidenceScore: 96.8,
    status: 'AI_DETECTED',
    zoningType: 'Commercial',
    ownerName: 'Apex Commercial Ventures LLP',
    landUseCode: 'C-2 (High Density Commercial)',
    centroid: [620, 310],
    polygon: [
      [550, 250],
      [700, 220],
      [730, 380],
      [580, 410]
    ],
    notes: 'Detected with multi-temporal spectral clustering. Clear compound wall identified.',
    updatedAt: '2026-08-30 18:24'
  },
  {
    id: 'p-002',
    code: 'URB-CHN-00453',
    surveyNumber: 'TS-453/A-2',
    zone: 'Zone 04 - Anna Nagar East',
    areaSqMeters: 840.2,
    perimeterMeters: 118.4,
    confidenceScore: 98.2,
    status: 'VERIFIED',
    zoningType: 'Residential',
    ownerName: 'V. Sundaram & Family',
    landUseCode: 'R-1 (Primary Residential)',
    centroid: [140, 130],
    polygon: [
      [80, 80],
      [180, 60],
      [200, 180],
      [90, 200]
    ],
    notes: 'Ground-truthed by field survey officer with DGPS rover.',
    updatedAt: '2026-08-29 14:10'
  },
  {
    id: 'p-003',
    code: 'URB-CHN-00454',
    surveyNumber: 'TS-454/C-4',
    zone: 'Zone 04 - Ambattur Industrial Road',
    areaSqMeters: 2450.0,
    perimeterMeters: 210.0,
    confidenceScore: 91.4,
    status: 'AI_DETECTED',
    zoningType: 'Industrial',
    ownerName: 'Coromandel Precision Tooling Ltd',
    landUseCode: 'I-1 (Light Engineering)',
    centroid: [260, 160],
    polygon: [
      [190, 100],
      [320, 80],
      [340, 220],
      [210, 240]
    ],
    notes: 'Automated road setback detected within 4.5m buffer.',
    updatedAt: '2026-08-30 09:15'
  },
  {
    id: 'p-004',
    code: 'URB-CHN-00455',
    surveyNumber: 'TS-455/D-1',
    zone: 'Zone 04 - Egmore West',
    areaSqMeters: 3120.5,
    perimeterMeters: 248.6,
    confidenceScore: 78.4,
    status: 'CONFLICT',
    zoningType: 'Mixed Use',
    ownerName: 'Heritage Ward Trust (Disputed)',
    landUseCode: 'MU-1 (Mixed Commercial/Civic)',
    centroid: [810, 420],
    polygon: [
      [720, 350],
      [880, 300],
      [920, 500],
      [750, 550]
    ],
    notes: 'Boundary variance of 3.8m detected against 2012 revenue patta map.',
    updatedAt: '2026-08-30 11:45'
  },
  {
    id: 'p-005',
    code: 'URB-CHN-00456',
    surveyNumber: 'TS-456/E-3',
    zone: 'Zone 04 - T. Nagar Central',
    areaSqMeters: 1680.0,
    perimeterMeters: 172.0,
    confidenceScore: 95.5,
    status: 'VERIFIED',
    zoningType: 'Commercial',
    ownerName: 'South Zone Retail Arcade',
    landUseCode: 'C-3 (Retail Central)',
    centroid: [420, 520],
    polygon: [
      [360, 460],
      [490, 440],
      [510, 580],
      [380, 600]
    ],
    notes: 'Complete match with LiDAR footprint and municipal building permit.',
    updatedAt: '2026-08-28 16:30'
  }
];

export const MOCK_BUILDINGS: BuildingFootprint[] = [
  {
    id: 'bldg-101',
    parcelId: 'p-002',
    areaSqMeters: 380,
    heightEstMeters: 12.5,
    floorsEst: 4,
    confidence: 0.97,
    polygon: [
      [100, 100],
      [150, 90],
      [160, 140],
      [110, 150]
    ]
  },
  {
    id: 'bldg-102',
    parcelId: 'p-003',
    areaSqMeters: 920,
    heightEstMeters: 18.0,
    floorsEst: 5,
    confidence: 0.95,
    polygon: [
      [200, 120],
      [280, 110],
      [290, 180],
      [210, 190]
    ]
  },
  {
    id: 'bldg-103',
    parcelId: 'p-001',
    areaSqMeters: 620,
    heightEstMeters: 24.0,
    floorsEst: 7,
    confidence: 0.98,
    polygon: [
      [600, 300],
      [650, 290],
      [660, 350],
      [610, 360]
    ]
  },
  {
    id: 'bldg-104',
    parcelId: 'p-004',
    areaSqMeters: 1140,
    heightEstMeters: 15.0,
    floorsEst: 4,
    confidence: 0.89,
    polygon: [
      [750, 400],
      [820, 380],
      [840, 460],
      [770, 480]
    ]
  }
];

export const MOCK_ROADS: RoadSegment[] = [
  {
    id: 'road-01',
    name: 'Poonamallee High Road (NH-48)',
    type: 'Highway',
    path: 'M0,400 L300,350 L500,450 L800,200 L1000,250'
  },
  {
    id: 'road-02',
    name: 'Anna Salai Radial Connector',
    type: 'Arterial',
    path: 'M400,0 L450,300 L300,600 L400,800'
  },
  {
    id: 'road-03',
    name: 'Mylapore Beach Trunk Expressway',
    type: 'Secondary',
    path: 'M700,0 L650,400 L850,800'
  }
];

export const MOCK_PIPELINE_STEPS: PipelineStep[] = [
  {
    id: 1,
    name: 'Preprocessing',
    shortName: 'PREPROCESSING',
    status: 'completed',
    description: 'Radiometric calibration, cloud shadow removal, and orthorectification to UTM Zone 44N.',
    processingTime: '4m 12s'
  },
  {
    id: 2,
    name: 'Segmentation',
    shortName: 'SEGMENTATION',
    status: 'completed',
    description: 'Deep neural semantic feature decomposition (built-up, roads, water, vegetation masks).',
    processingTime: '7m 45s'
  },
  {
    id: 3,
    name: 'Parcel Detection',
    shortName: 'PARCEL DETECTION',
    status: 'active',
    progress: 68,
    description: 'Sub-centimeter polygon vectorization & compound wall boundary delineation.',
    processingTime: 'In progress (68%)'
  },
  {
    id: 4,
    name: 'Bldg Extract',
    shortName: 'BLDG EXTRACT',
    status: 'pending',
    description: '3D roof geometry extraction, eaves height approximation, and footprint regularization.'
  },
  {
    id: 5,
    name: 'Classification',
    shortName: 'CLASSIFICATION',
    status: 'pending',
    description: 'Automated land-use classification (Residential, Commercial, Industrial, Civic).'
  },
  {
    id: 6,
    name: 'Topology Fix',
    shortName: 'TOPOLOGY FIX',
    status: 'pending',
    description: 'Automated elimination of polygon slivers, self-intersections, and gap snap closure.'
  },
  {
    id: 7,
    name: 'Final Output',
    shortName: 'FINAL OUTPUT',
    status: 'pending',
    description: 'GeoJSON / GeoPackage / DXF cadastral package generation with cryptographic hash signature.'
  }
];

export const MOCK_VALIDATION_ITEMS: ValidationItem[] = [
  {
    id: 'val-001',
    parcelCode: 'URB-CHN-00455',
    issueType: 'Boundary Conflict',
    severity: 'high',
    confidence: 78.4,
    detectedArea: 3120.5,
    registeredArea: 2980.0,
    deltaPercent: 4.7,
    status: 'pending',
    zone: 'Zone 04 - Egmore West',
    coordinates: '13.0827° N, 80.2707° E'
  },
  {
    id: 'val-002',
    parcelCode: 'URB-CHN-00462',
    issueType: 'Sliver Polygon',
    severity: 'medium',
    confidence: 84.1,
    detectedArea: 14.2,
    registeredArea: 0,
    deltaPercent: 100,
    status: 'pending',
    zone: 'Zone 04 - Annanur North',
    coordinates: '13.1145° N, 80.1294° E'
  },
  {
    id: 'val-003',
    parcelCode: 'URB-CHN-00478',
    issueType: 'Setback Violation',
    severity: 'high',
    confidence: 93.2,
    detectedArea: 1840.0,
    registeredArea: 1840.0,
    deltaPercent: 0,
    status: 'pending',
    zone: 'Zone 04 - T. Nagar Radial',
    coordinates: '13.0418° N, 80.2341° E'
  },
  {
    id: 'val-004',
    parcelCode: 'URB-CHN-00491',
    issueType: 'Overlapping Footprint',
    severity: 'medium',
    confidence: 86.8,
    detectedArea: 650.0,
    registeredArea: 620.0,
    deltaPercent: 4.8,
    status: 'resolved',
    zone: 'Zone 04 - Mylapore Sector',
    coordinates: '13.0336° N, 80.2678° E'
  }
];
