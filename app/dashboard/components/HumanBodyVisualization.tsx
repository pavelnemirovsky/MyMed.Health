'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useTranslations } from 'next-intl';
import { MedicalRecord } from '../data/mockData';
import { 
  mapRecordsToBodyParts, 
  BodyPart, 
  getBodyPartLabel 
} from '../utils/bodyPartMapper';
// @ts-ignore - reactjs-human-body doesn't have TypeScript definitions
import { BodyComponent } from 'reactjs-human-body';

interface HumanBodyVisualizationProps {
  records: MedicalRecord[];
  selectedPatient?: string;
  gender?: 'Male' | 'Female' | 'Other';
  compact?: boolean;
}

// Map our body parts to reactjs-human-body part IDs
// The library uses: head, neck, leftShoulder, rightShoulder, leftArm, rightArm, 
// chest, stomach, leftLeg, rightLeg, leftHand, rightHand, leftFoot, rightFoot
const bodyPartToLibraryId: Record<BodyPart, string> = {
  head: 'head',
  neck: 'neck',
  chest: 'chest',
  abdomen: 'stomach', // Library uses 'stomach' instead of 'abdomen'
  pelvis: 'stomach', // Map pelvis to stomach as well
  leftArm: 'leftArm',
  rightArm: 'rightArm',
  leftForearm: 'leftArm', // Map forearm to arm
  rightForearm: 'rightArm',
  leftHand: 'leftHand',
  rightHand: 'rightHand',
  leftLeg: 'leftLeg',
  rightLeg: 'rightLeg',
  leftKnee: 'leftLeg', // Map knee to leg
  rightKnee: 'rightLeg',
  leftFoot: 'leftFoot',
  rightFoot: 'rightFoot',
  spine: 'chest', // Map spine to chest
  shoulder: 'leftShoulder', // Default to left shoulder, will handle both
  hip: 'leftLeg', // Map hip to leg
  elbow: 'leftArm', // Map elbow to arm
  wrist: 'leftHand', // Map wrist to hand
  ankle: 'leftFoot', // Map ankle to foot
};

// Helper to get body parts that map to a library ID
function getBodyPartsForLibraryId(libraryId: string): BodyPart[] {
  return Object.entries(bodyPartToLibraryId)
    .filter(([_, libId]) => libId === libraryId)
    .map(([bodyPart, _]) => bodyPart as BodyPart);
}

export default function HumanBodyVisualization({ records, selectedPatient, gender, compact = false }: HumanBodyVisualizationProps) {
  const t = useTranslations('dashboard.bodyVisualizationDetails');
  const [hoveredPart, setHoveredPart] = useState<BodyPart | null>(null);
  const [selectedPart, setSelectedPart] = useState<BodyPart | null>(null);
  const [clickPosition, setClickPosition] = useState<{ x: number; y: number } | null>(null);
  // Initialize partsInput with all parts shown (only parts supported by the library)
  const [partsInput, setPartsInput] = useState<Record<string, { selected?: boolean; show?: boolean }>>(() => {
    return {
      head: { show: true, selected: false },
      leftShoulder: { show: true, selected: false },
      rightShoulder: { show: true, selected: false },
      leftArm: { show: true, selected: false },
      rightArm: { show: true, selected: false },
      chest: { show: true, selected: false },
      stomach: { show: true, selected: false },
      leftLeg: { show: true, selected: false },
      rightLeg: { show: true, selected: false },
      leftHand: { show: true, selected: false },
      rightHand: { show: true, selected: false },
      leftFoot: { show: true, selected: false },
      rightFoot: { show: true, selected: false },
    };
  });
  const containerRef = useRef<HTMLDivElement>(null);
  const partsInputRef = useRef(partsInput);
  
  // Keep ref in sync with partsInput
  useEffect(() => {
    partsInputRef.current = partsInput;
  }, [partsInput]);

  // Map records to body parts
  const bodyPartMap = useMemo(() => {
    const mapped = mapRecordsToBodyParts(records);
    // Debug: verify mapping
    if (mapped.size > 0) {
      console.log('Body parts with scans:', Array.from(mapped.entries()).map(([part, mapping]) => ({
        part,
        recordCount: mapping.records.length,
        libraryId: bodyPartToLibraryId[part]
      })));
    }
    return mapped;
  }, [records]);

  // Get records for selected body part, sorted from latest to oldest
  const selectedPartRecords = useMemo(() => {
    if (!selectedPart) return [];
    const mapping = bodyPartMap.get(selectedPart);
    const records = mapping?.records || [];
    // Sort by date, latest first
    return [...records].sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateB - dateA; // Descending order (latest first)
    });
  }, [selectedPart, bodyPartMap]);

  // Update partsInput based on body parts with records
  useEffect(() => {
    // Initialize all required parts as shown but not selected (only parts supported by the library)
    const newPartsInput: Record<string, { selected?: boolean; show?: boolean }> = {
      head: { show: true, selected: false },
      leftShoulder: { show: true, selected: false },
      rightShoulder: { show: true, selected: false },
      leftArm: { show: true, selected: false },
      rightArm: { show: true, selected: false },
      chest: { show: true, selected: false },
      stomach: { show: true, selected: false },
      leftLeg: { show: true, selected: false },
      rightLeg: { show: true, selected: false },
      leftHand: { show: true, selected: false },
      rightHand: { show: true, selected: false },
      leftFoot: { show: true, selected: false },
      rightFoot: { show: true, selected: false },
    };
    
    // Mark parts with scans/records as selected (highlighted) - this pre-highlights on load
    bodyPartMap.forEach((mapping, bodyPart) => {
      const libraryId = bodyPartToLibraryId[bodyPart];
      console.log(`Processing bodyPart: ${bodyPart}, libraryId: ${libraryId}, records: ${mapping.records.length}`);
      if (libraryId && newPartsInput[libraryId]) {
        // If multiple body parts map to same library part, mark as selected if any has records
        if (mapping.records.length > 0) {
          console.log(`Marking ${libraryId} as selected (has ${mapping.records.length} records)`);
          newPartsInput[libraryId] = {
            ...newPartsInput[libraryId],
            selected: true,
            show: true,
          };
        } else {
          console.log(`Skipping ${libraryId} - no records`);
        }
      } else {
        console.log(`Warning: libraryId ${libraryId} not found in newPartsInput or bodyPart ${bodyPart} not mapped`);
      }
    });

    // Also ensure the currently clicked part is highlighted (if one is selected)
    if (selectedPart) {
      const libraryId = bodyPartToLibraryId[selectedPart];
      if (libraryId && newPartsInput[libraryId]) {
        newPartsInput[libraryId] = {
          ...newPartsInput[libraryId],
          selected: true,
          show: true,
        };
      }
    }

    // Debug: verify partsInput
    const highlightedParts = Object.entries(newPartsInput).filter(([_, config]) => config.selected).map(([id, _]) => id);
    console.log('PartsInput state:', newPartsInput);
    console.log('Highlighted parts:', highlightedParts);
    console.log('BodyPartMap size:', bodyPartMap.size);
    console.log('BodyPartMap entries:', Array.from(bodyPartMap.entries()).map(([part, mapping]) => ({
      part,
      libraryId: bodyPartToLibraryId[part],
      recordCount: mapping.records.length
    })));
    setPartsInput(newPartsInput);
  }, [bodyPartMap, selectedPart]);

  const handlePartClick = (id: string) => {
    // Find all our body parts that map to this library part ID
    const matchingBodyParts = getBodyPartsForLibraryId(id);
    
    if (matchingBodyParts.length > 0) {
      // Use the first matching body part that has records, or just the first one
      const partWithRecords = matchingBodyParts.find(part => {
        const mapping = bodyPartMap.get(part);
        return mapping && mapping.records.length > 0;
      });
      
      const selectedBodyPart = partWithRecords || matchingBodyParts[0];
      
      // Toggle selection - if clicking the same part, deselect it
      if (selectedPart === selectedBodyPart) {
        setSelectedPart(null);
        setClickPosition(null);
      } else {
        setSelectedPart(selectedBodyPart);
        // Set click position to center-right of the body visualization
        // Since the library doesn't provide exact click coordinates, we position it near the body
        if (containerRef.current) {
          const rect = containerRef.current.getBoundingClientRect();
          setClickPosition({
            x: rect.width * 0.6,
            y: rect.height * 0.4,
          });
        } else {
          setClickPosition({ x: 150, y: 150 });
        }
      }
    }
  };

  const handlePartChange = (parts: Record<string, any>) => {
    // Handle part changes if needed
    console.log('Parts changed:', parts);
  };

  // Get the most recent record for a body part
  const getMostRecentRecord = (bodyPart: BodyPart): MedicalRecord | null => {
    const mapping = bodyPartMap.get(bodyPart);
    if (!mapping || mapping.records.length === 0) return null;
    return mapping.records.sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    )[0];
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        month: 'numeric',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return dateString;
    }
  };

  // Directly manipulate SVG elements to apply yellow color for selected parts
  useEffect(() => {
    if (!containerRef.current) return;

    const applyStyles = () => {
      const container = containerRef.current;
      if (!container) return;
      
      // Use ref to get latest partsInput value
      const currentPartsInput = partsInputRef.current;
      
      console.log('Applying styles, partsInput:', currentPartsInput);

      // Find all SVG elements within the container
      const svgElements = container.querySelectorAll('svg');
      console.log(`Found ${svgElements.length} SVG elements`);
      
      svgElements.forEach((svg) => {
        const paths = svg.querySelectorAll('path');
        // Handle className - it might be a string or SVGAnimatedString object
        const classNameStr = typeof svg.className === 'string' 
          ? svg.className 
          : (svg.className?.baseVal || svg.getAttribute('class') || '');
        const isSelected = svg.classList?.contains('selected') || classNameStr.includes('selected');
        
        // Get the library part ID from the SVG id or className
        const partId = svg.id || classNameStr.split(' ').find(cls => 
          ['head', 'chest', 'stomach', 'leftArm', 'rightArm', 'leftLeg', 'rightLeg', 
           'leftHand', 'rightHand', 'leftFoot', 'rightFoot', 'leftShoulder', 'rightShoulder'].includes(cls)
        );
        
        // Check if this part should be selected based on partsInput
        const shouldBeSelected = partId && currentPartsInput[partId]?.selected === true;
        
        if (partId) {
          console.log(`Part ${partId}: shouldBeSelected=${shouldBeSelected}, isSelected=${isSelected}, paths=${paths.length}`);
        }
        
        paths.forEach((path) => {
          const pathEl = path as SVGPathElement;
          if (shouldBeSelected || isSelected) {
            // Yellow for parts with scans - use multiple methods to ensure it sticks
            pathEl.setAttribute('fill', '#fbbf24');
            pathEl.style.setProperty('fill', '#fbbf24', 'important');
            pathEl.style.fill = '#fbbf24';
            // Remove any conflicting styles
            pathEl.removeAttribute('style');
            pathEl.style.setProperty('fill', '#fbbf24', 'important');
            // Force reflow to ensure style is applied
            void pathEl.offsetHeight;
          } else {
            // Gray for parts without scans
            pathEl.setAttribute('fill', '#a3b2b3');
            pathEl.style.setProperty('fill', '#a3b2b3', 'important');
            pathEl.style.fill = '#a3b2b3';
            // Remove any conflicting styles
            pathEl.removeAttribute('style');
            pathEl.style.setProperty('fill', '#a3b2b3', 'important');
            // Force reflow to ensure style is applied
            void pathEl.offsetHeight;
          }
        });
      });
    };

    // Apply styles with multiple attempts to catch library rendering
    const tryApplyStyles = () => {
      applyStyles();
      // Try again after a short delay to catch late renders
      setTimeout(applyStyles, 100);
      setTimeout(applyStyles, 500);
      setTimeout(applyStyles, 1000);
    };

    // Use requestAnimationFrame to ensure DOM is ready
    requestAnimationFrame(() => {
      tryApplyStyles();
    });

    // Continuously reapply styles to override library's styled-components
    const intervalId = setInterval(() => {
      applyStyles();
    }, 200); // Reapply every 200ms to keep styles applied

    // Use MutationObserver to watch for DOM changes (when library renders)
    const observer = new MutationObserver(() => {
      console.log('DOM mutation detected, reapplying styles');
      applyStyles();
    });

    observer.observe(containerRef.current, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class'],
    });

    // Also apply on hover
    const handleMouseEnter = (e: Event) => {
      const target = e.target as SVGElement;
      if (target.tagName === 'svg' || target.closest('svg')) {
        const svg = target.tagName === 'svg' ? target : target.closest('svg');
        if (svg) {
          const paths = svg.querySelectorAll('path');
          paths.forEach((path) => {
            (path as SVGPathElement).setAttribute('fill', '#fbbf24');
            (path as SVGPathElement).style.fill = '#fbbf24';
          });
        }
      }
    };

    const handleMouseLeave = (e: Event) => {
      const target = e.target as SVGElement;
      if (target.tagName === 'svg' || target.closest('svg')) {
        const svg = target.tagName === 'svg' ? target : target.closest('svg');
        if (svg) {
          // Handle className - it might be a string or SVGAnimatedString object
          const classNameStr = typeof svg.className === 'string' 
            ? svg.className 
            : (svg.className?.baseVal || svg.getAttribute('class') || '');
          const partId = svg.id || classNameStr.split(' ').find(cls => 
            ['head', 'chest', 'stomach', 'leftArm', 'rightArm', 'leftLeg', 'rightLeg', 
             'leftHand', 'rightHand', 'leftFoot', 'rightFoot', 'leftShoulder', 'rightShoulder'].includes(cls)
          );
          const currentPartsInput = partsInputRef.current;
          const shouldBeSelected = partId && currentPartsInput[partId]?.selected === true;
          
          const paths = svg.querySelectorAll('path');
          paths.forEach((path) => {
            const fill = shouldBeSelected ? '#fbbf24' : '#a3b2b3';
            (path as SVGPathElement).setAttribute('fill', fill);
            (path as SVGPathElement).style.fill = fill;
          });
        }
      }
    };

    containerRef.current.addEventListener('mouseenter', handleMouseEnter, true);
    containerRef.current.addEventListener('mouseleave', handleMouseLeave, true);

    return () => {
      observer.disconnect();
      clearInterval(intervalId);
      if (containerRef.current) {
        containerRef.current.removeEventListener('mouseenter', handleMouseEnter, true);
        containerRef.current.removeEventListener('mouseleave', handleMouseLeave, true);
      }
    };
  }, []); // Empty dependency array - use refs to access latest values

  return (
    <div className="human-body-visualization" style={{ position: 'relative', width: '100%' }}>
      <div 
        ref={containerRef}
        className="human-body-container" 
        style={{
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: compact ? '200px' : '300px',
          padding: compact ? '0.5rem' : '1rem',
          background: 'transparent',
        }}
      >
        <div style={{ 
          width: '100%', 
          maxWidth: compact ? '250px' : '500px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: '0 auto',
        }}>
          <div style={{ 
            width: '100%', 
            height: 'auto',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <BodyComponent
              partsInput={partsInput as any}
              onChange={handlePartChange}
              onClick={(id: string) => handlePartClick(id)}
              bodyModel={gender === 'Female' ? 'female' : 'male'}
            />
          </div>
        </div>
      </div>

      {/* Legend - Only show in non-compact mode */}
      {!compact && (
        <div className="body-visualization-legend" style={{
          marginTop: '1rem',
          padding: '1rem',
          background: 'white',
          borderRadius: '8px',
          border: '1px solid #e5e7eb',
          fontSize: '0.8125rem',
        }}>
          <div style={{ fontWeight: 600, marginBottom: '0.75rem', color: '#374151' }}>
            {t('legend')}:
          </div>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1.5rem',
            alignItems: 'center',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{
                width: '24px',
                height: '24px',
                borderRadius: '4px',
                background: '#fbbf24',
                border: 'none',
              }} />
              <span style={{ color: '#6b7280' }}>{t('hasRecords')}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{
                width: '24px',
                height: '24px',
                borderRadius: '4px',
                background: '#a3b2b3',
                border: 'none',
              }} />
              <span style={{ color: '#6b7280' }}>{t('noRecords')}</span>
            </div>
          </div>
        </div>
      )}

      {/* Scans Popover - Render via Portal to ensure it's above all elements including SVG */}
      {selectedPart && clickPosition && selectedPartRecords.length > 0 && typeof window !== 'undefined' && createPortal(
        <>
          {/* Backdrop */}
          <div
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9999,
              background: 'rgba(0, 0, 0, 0.1)',
            }}
            onClick={() => {
              setSelectedPart(null);
              setClickPosition(null);
            }}
          />
          {/* Popover */}
          <div
            style={{
              position: 'fixed',
              left: containerRef.current 
                ? `${Math.min(containerRef.current.getBoundingClientRect().left + clickPosition.x + 20, window.innerWidth - 320)}px`
                : '50%',
              top: containerRef.current
                ? `${Math.min(containerRef.current.getBoundingClientRect().top + clickPosition.y + 20, window.innerHeight - 200)}px`
                : '50%',
              transform: containerRef.current ? 'none' : 'translate(-50%, -50%)',
              zIndex: 10000,
              background: 'white',
              borderRadius: '12px',
              border: '1px solid #e5e7eb',
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
              padding: '1rem',
              maxWidth: '300px',
              maxHeight: '400px',
              overflowY: 'auto',
            }}
            onClick={(e) => e.stopPropagation()}
          >
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '0.75rem',
            paddingBottom: '0.75rem',
            borderBottom: '1px solid #e5e7eb',
          }}>
            <h4 style={{
              fontSize: '0.875rem',
              fontWeight: 600,
              color: '#1f2937',
              margin: 0,
            }}>
              {getBodyPartLabel(selectedPart, bodyPartMap.get(selectedPart)?.side)}
            </h4>
            <button
              onClick={() => {
                setSelectedPart(null);
                setClickPosition(null);
              }}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '1.125rem',
                cursor: 'pointer',
                color: '#6b7280',
                padding: '0.125rem',
                lineHeight: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '24px',
                height: '24px',
                borderRadius: '4px',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#f3f4f6';
                e.currentTarget.style.color = '#1f2937';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'none';
                e.currentTarget.style.color = '#6b7280';
              }}
            >
              ×
            </button>
          </div>
          
          {selectedPartRecords.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '1.5rem 1rem',
              color: '#9ca3af',
            }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>📋</div>
              <div style={{ fontSize: '0.8125rem' }}>
                No scans found
              </div>
            </div>
          ) : (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
            }}>
              {selectedPartRecords.map((record) => {
              const getScanIcon = (type: string) => {
                switch (type) {
                  case 'MRI': return '🧠';
                  case 'CT Scan': return '🔬';
                  case 'PET Scan': return '⚛️';
                  case 'X-Ray': return '📷';
                  case 'Ultrasound': return '🔊';
                  default: return '📄';
                }
              };

              const getScanColor = (type: string) => {
                switch (type) {
                  case 'MRI': return '#2563eb';
                  case 'CT Scan': return '#7c3aed';
                  case 'PET Scan': return '#dc2626';
                  case 'X-Ray': return '#059669';
                  case 'Ultrasound': return '#0891b2';
                  default: return '#6b7280';
                }
              };

              const formatDate = (dateString: string) => {
                try {
                  return new Date(dateString).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  });
                } catch {
                  return dateString;
                }
              };

              const scanColor = getScanColor(record.type);
              
              return (
                <div
                  key={record.id}
                  style={{
                    padding: '0.75rem',
                    background: '#f9fafb',
                    borderRadius: '6px',
                    border: `1px solid ${scanColor}40`,
                    transition: 'all 0.2s ease',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = scanColor;
                    e.currentTarget.style.background = `${scanColor}10`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = `${scanColor}40`;
                    e.currentTarget.style.background = '#f9fafb';
                  }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    marginBottom: '0.5rem',
                  }}>
                    <div style={{ fontSize: '1.25rem' }}>
                      {getScanIcon(record.type)}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{
                        fontSize: '0.8125rem',
                        fontWeight: 600,
                        color: '#1f2937',
                        marginBottom: '0.125rem',
                      }}>
                        {record.title}
                      </div>
                      <div style={{
                        fontSize: '0.75rem',
                        color: scanColor,
                        fontWeight: 500,
                      }}>
                        {record.type}
                      </div>
                    </div>
                  </div>
                  <div style={{
                    fontSize: '0.75rem',
                    color: '#6b7280',
                  }}>
                    {formatDate(record.date)}
                  </div>
                </div>
              );
              })}
            </div>
          )}
          </div>
        </>,
        document.body
      )}
    </div>
  );
}
