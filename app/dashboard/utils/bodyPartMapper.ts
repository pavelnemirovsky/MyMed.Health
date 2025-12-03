import { MedicalRecord } from '../data/mockData';

export type BodyPart = 
  | 'head' | 'neck' | 'chest' | 'abdomen' | 'pelvis'
  | 'leftArm' | 'rightArm' | 'leftForearm' | 'rightForearm'
  | 'leftHand' | 'rightHand' | 'leftLeg' | 'rightLeg'
  | 'leftKnee' | 'rightKnee' | 'leftFoot' | 'rightFoot'
  | 'spine' | 'shoulder' | 'hip' | 'elbow' | 'wrist' | 'ankle';

export interface BodyPartMapping {
  bodyPart: BodyPart;
  side?: 'left' | 'right';
  records: MedicalRecord[];
}

/**
 * Maps medical records to body parts based on title and description parsing
 * Only includes scan types (CT Scan, MRI, PET Scan, X-Ray, Ultrasound) in body visualization
 */
export function mapRecordsToBodyParts(records: MedicalRecord[]): Map<BodyPart, BodyPartMapping> {
  const bodyPartMap = new Map<BodyPart, BodyPartMapping>();

  // Filter to only include scan types
  const scanTypes = ['CT Scan', 'MRI', 'PET Scan', 'X-Ray', 'Ultrasound'];
  const scanRecords = records.filter(record => {
    return scanTypes.includes(record.type);
  });

  scanRecords.forEach(record => {
    const mapping = parseRecordToBodyPart(record);
    if (mapping) {
      const existing = bodyPartMap.get(mapping.bodyPart);
      if (existing) {
        existing.records.push(record);
        // Update side if more specific
        if (mapping.side && !existing.side) {
          existing.side = mapping.side;
        }
      } else {
        bodyPartMap.set(mapping.bodyPart, {
          bodyPart: mapping.bodyPart,
          side: mapping.side,
          records: [record],
        });
      }
    }
  });

  return bodyPartMap;
}

/**
 * Parses a medical record title/description to identify body part
 */
function parseRecordToBodyPart(record: MedicalRecord): { bodyPart: BodyPart; side?: 'left' | 'right' } | null {
  const text = `${record.title} ${record.description || ''}`.toLowerCase();
  
  // Detect side (left/right)
  const isLeft = /\b(left|l\.?)\b/.test(text);
  const isRight = /\b(right|r\.?)\b/.test(text);
  const side: 'left' | 'right' | undefined = isLeft ? 'left' : isRight ? 'right' : undefined;

  // Head and brain
  if (/\b(brain|head|skull|cranial|neurological|mri brain|ct brain|pet brain)\b/.test(text)) {
    return { bodyPart: 'head' };
  }

  // Neck - map to head since library doesn't have neck
  if (/\b(neck|cervical|throat|thyroid)\b/.test(text)) {
    return { bodyPart: 'head' };
  }

  // Chest
  if (/\b(chest|lung|pulmonary|thoracic|heart|cardiac|mammogram|breast)\b/.test(text)) {
    return { bodyPart: 'chest' };
  }

  // Abdomen
  if (/\b(abdomen|abdominal|stomach|liver|kidney|renal|spleen|pancreas|gallbladder|ct abdomen|pet abdomen)\b/.test(text)) {
    return { bodyPart: 'abdomen' };
  }

  // Pelvis
  if (/\b(pelvis|pelvic|bladder|prostate|uterus|ovary|gynecological)\b/.test(text)) {
    return { bodyPart: 'pelvis' };
  }

  // Spine
  if (/\b(spine|spinal|vertebra|back|disc)\b/.test(text)) {
    return { bodyPart: 'spine' };
  }

  // Shoulder
  if (/\b(shoulder)\b/.test(text)) {
    return { 
      bodyPart: side === 'left' ? 'leftArm' : side === 'right' ? 'rightArm' : 'shoulder',
      side 
    };
  }

  // Elbow
  if (/\b(elbow)\b/.test(text)) {
    return { 
      bodyPart: side === 'left' ? 'leftForearm' : side === 'right' ? 'rightForearm' : 'elbow',
      side 
    };
  }

  // Wrist
  if (/\b(wrist)\b/.test(text)) {
    return { 
      bodyPart: side === 'left' ? 'leftHand' : side === 'right' ? 'rightHand' : 'wrist',
      side 
    };
  }

  // Hand
  if (/\b(hand|finger)\b/.test(text)) {
    return { 
      bodyPart: side === 'left' ? 'leftHand' : side === 'right' ? 'rightHand' : 'leftHand', // Default to left if no side
      side 
    };
  }

  // Arm (upper arm)
  if (/\b(arm|humerus)\b/.test(text) && !/\b(forearm|hand|wrist|elbow)\b/.test(text)) {
    return { 
      bodyPart: side === 'left' ? 'leftArm' : side === 'right' ? 'rightArm' : 'leftArm',
      side 
    };
  }

  // Forearm
  if (/\b(forearm|radius|ulna)\b/.test(text)) {
    return { 
      bodyPart: side === 'left' ? 'leftForearm' : side === 'right' ? 'rightForearm' : 'leftForearm',
      side 
    };
  }

  // Hip
  if (/\b(hip|pelvic bone)\b/.test(text)) {
    return { 
      bodyPart: side === 'left' ? 'leftLeg' : side === 'right' ? 'rightLeg' : 'hip',
      side 
    };
  }

  // Knee
  if (/\b(knee|patella|meniscal|mri knee)\b/.test(text)) {
    return { 
      bodyPart: side === 'left' ? 'leftKnee' : side === 'right' ? 'rightKnee' : 'leftKnee',
      side 
    };
  }

  // Ankle
  if (/\b(ankle)\b/.test(text)) {
    return { 
      bodyPart: side === 'left' ? 'leftFoot' : side === 'right' ? 'rightFoot' : 'ankle',
      side 
    };
  }

  // Foot
  if (/\b(foot|toe)\b/.test(text)) {
    return { 
      bodyPart: side === 'left' ? 'leftFoot' : side === 'right' ? 'rightFoot' : 'leftFoot',
      side 
    };
  }

  // Leg (general)
  if (/\b(leg|thigh|femur|tibia|fibula)\b/.test(text) && !/\b(knee|foot|ankle)\b/.test(text)) {
    return { 
      bodyPart: side === 'left' ? 'leftLeg' : side === 'right' ? 'rightLeg' : 'leftLeg',
      side 
    };
  }

  // If no match found, return null
  return null;
}

/**
 * Gets a human-readable label for a body part
 */
export function getBodyPartLabel(bodyPart: BodyPart, side?: 'left' | 'right'): string {
  const labels: Record<BodyPart, string> = {
    head: 'Head',
    neck: 'Neck',
    chest: 'Chest',
    abdomen: 'Abdomen',
    pelvis: 'Pelvis',
    leftArm: 'Left Arm',
    rightArm: 'Right Arm',
    leftForearm: 'Left Forearm',
    rightForearm: 'Right Forearm',
    leftHand: 'Left Hand',
    rightHand: 'Right Hand',
    leftLeg: 'Left Leg',
    rightLeg: 'Right Leg',
    leftKnee: 'Left Knee',
    rightKnee: 'Right Knee',
    leftFoot: 'Left Foot',
    rightFoot: 'Right Foot',
    spine: 'Spine',
    shoulder: 'Shoulder',
    hip: 'Hip',
    elbow: 'Elbow',
    wrist: 'Wrist',
    ankle: 'Ankle',
  };

  return labels[bodyPart] || bodyPart;
}

/**
 * Gets the color intensity based on record count
 */
export function getBodyPartColor(recordCount: number): string {
  if (recordCount === 0) {
    return '#e5e7eb'; // Gray for no records
  }
  if (recordCount === 1) {
    return '#dbeafe'; // Light blue
  }
  if (recordCount === 2) {
    return '#93c5fd'; // Medium blue
  }
  if (recordCount >= 3 && recordCount < 5) {
    return '#60a5fa'; // Blue
  }
  return '#3b82f6'; // Dark blue for 5+ records
}

