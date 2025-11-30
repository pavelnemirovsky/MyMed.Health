'use client';

import Image from 'next/image';

interface MedicalScanPreviewProps {
  type: string;
  title?: string;
  width?: number;
  height?: number;
}

export default function MedicalScanPreview({ type, title, width = 240, height = 140 }: MedicalScanPreviewProps) {
  // Get emoji for document types
  const getEmoji = (): string | null => {
    const typeLower = type.toLowerCase();
    
    if (typeLower === 'blood test') {
      return '🩸';
    }
    if (typeLower === 'lab test') {
      return '🧪';
    }
    if (typeLower === 'biopsy') {
      return '🔬';
    }
    if (typeLower === 'doctor letter') {
      return '📋';
    }
    if (typeLower === 'prescription') {
      return '💊';
    }
    if (typeLower === 'hospital discharge') {
      return '🏥';
    }
    if (typeLower === 'surgery report') {
      return '⚕️';
    }
    
    return null;
  };

  // Determine the image path based on type and title
  const getImagePath = (): string | null => {
    const typeLower = type.toLowerCase();
    const titleLower = title?.toLowerCase() || '';
    
    // MRI Scans
    if (typeLower === 'mri') {
      if (titleLower.includes('knee')) {
        return '/img/scans/mri-knee.jpg';
      }
      if (titleLower.includes('lesion') || titleLower.includes('abnormal')) {
        return '/img/scans/mri-brain-lesion.jpg';
      }
      // Default to brain MRI
      return '/img/scans/mri-brain.jpg';
    }
    
    // CT Scans
    if (typeLower === 'ct scan' || typeLower === 'ct') {
      if (titleLower.includes('brain') || titleLower.includes('head')) {
        return '/img/scans/ct-brain.jpg';
      }
      if (titleLower.includes('chest') || titleLower.includes('thorax') || titleLower.includes('lung')) {
        return '/img/scans/ct-chest.jpg';
      }
      if (titleLower.includes('abdomen') || titleLower.includes('abdominal') || titleLower.includes('belly')) {
        return '/img/scans/ct-abdomen.jpg';
      }
      // Default to chest CT
      return '/img/scans/ct-chest.jpg';
    }
    
    // PET-CT Scans
    if (typeLower === 'pet scan' || typeLower === 'pet-ct' || typeLower === 'pet ct') {
      if (titleLower.includes('brain') || titleLower.includes('head')) {
        return '/img/scans/pet-ct-brain.jpg';
      }
      if (titleLower.includes('abdomen') || titleLower.includes('abdominal') || titleLower.includes('body')) {
        return '/img/scans/pet-ct-abdomen.jpg';
      }
      // Default to brain PET-CT
      return '/img/scans/pet-ct-brain.jpg';
    }
    
    // X-Ray Scans
    if (typeLower === 'x-ray' || typeLower === 'xray') {
      if (titleLower.includes('hand') || titleLower.includes('wrist') || titleLower.includes('finger')) {
        return '/img/scans/xray-hand.jpg';
      }
      if (titleLower.includes('chest') || titleLower.includes('thorax') || titleLower.includes('lung')) {
        return '/img/scans/xray-chest.jpg';
      }
      // Default to hand X-Ray
      return '/img/scans/xray-hand.jpg';
    }
    
    return null;
  };

  const emoji = getEmoji();
  const imagePath = getImagePath();

  // Render emoji for document types
  if (emoji) {
    return (
      <div style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px solid #e0e7ff',
      }}>
        <div style={{
          fontSize: '4rem',
          lineHeight: 1,
          filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))',
        }}>
          {emoji}
        </div>
      </div>
    );
  }

  // Render image for scan types
  if (imagePath) {
    return (
      <div style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        background: '#000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <Image
          src={imagePath}
          alt={`${type} - ${title || 'Medical scan'}`}
          width={width}
          height={height}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
          }}
          unoptimized
        />
      </div>
    );
  }

  // Default fallback
  return (
    <div style={{
      width: '100%',
      height: '100%',
      position: 'relative',
      overflow: 'hidden',
      background: 'linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: '1px solid #e5e7eb',
    }}>
      <div style={{
        fontSize: '3rem',
        lineHeight: 1,
        opacity: 0.5,
      }}>
        📄
      </div>
    </div>
  );
}
