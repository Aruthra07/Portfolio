import React, { useState, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Line, Html } from '@react-three/drei';
import * as THREE from 'three';
import { MapPin, ExternalLink, Globe as GlobeIcon } from 'lucide-react';

interface EventsGlobeProps {
  playAudio: (type: 'hover' | 'click') => void;
}

interface EventItem {
  id: string;
  name: string;
  type: string;
  desc: string;
  lat: number;
  lon: number;
  icon: string;
  location: string;
}

const EVENTS: EventItem[] = [
  {
    id: 'm365',
    name: 'Microsoft 365 Community Meetup',
    type: 'Community Conference',
    desc: 'Connecting with industry leaders to explore MS Graph integrations, Azure cognitive services, and enterprise workspace automations.',
    lat: 12.97, // Bangalore
    lon: 77.59,
    icon: '🏢',
    location: 'Bangalore, India'
  },
  {
    id: 'db',
    name: 'Databricks Meetup',
    type: 'Data & AI Conference',
    desc: 'Deep-dive sessions detailing Lakehouse integrations, Delta Share models, and large-scale data engineering workflows.',
    lat: 20.0,
    lon: 60.0,
    icon: '🧱',
    location: 'Mumbai, India'
  },
  {
    id: 'n8n',
    name: 'N8N & AI Automation Meetup',
    type: 'Automation Workshop',
    desc: 'Designing and deploying multi-agent workflows, API connectors, and automation triggers for productivity gains.',
    lat: 11.01, // Coimbatore
    lon: 76.95,
    icon: '⚡',
    location: 'Coimbatore, India'
  },
  {
    id: 'prompt',
    name: 'Prompt to Production Event',
    type: 'AI Product Conference',
    desc: 'Exploring developer frameworks like LangChain, semantic routing, and vector index pipelines to take models to production.',
    lat: 19.07,
    lon: 72.87,
    icon: '🚀',
    location: 'Mumbai, India'
  },
  {
    id: 'techx',
    name: 'TechX Conference',
    type: 'Technology Summit',
    desc: 'An immersive summit exploring hardware architectures, IoT standards, edge computing telemetry, and embedded engineering.',
    lat: 5.0,
    lon: 85.0,
    icon: '🔬',
    location: 'Chennai, India'
  },
  {
    id: 'cyber',
    name: 'CDAC Cybersecurity Conference',
    type: 'Security Conference',
    desc: 'Participating in panels covering network telemetry security, data cryptography standards, and vulnerability mitigations.',
    lat: 28.61, // New Delhi
    lon: 77.2,
    icon: '🛡️',
    location: 'New Delhi, India'
  },
  {
    id: 'hackathons',
    name: 'Competitive Coding Hackathons',
    type: 'Development Hackathons',
    desc: 'Collaborative development sprints constructing automated IoT prototypes, smart farming models, and workflow utilities.',
    lat: -15.0,
    lon: 90.0,
    icon: '⚔️',
    location: 'Varanasi, India'
  },
  {
    id: 'design',
    name: 'Design Sprint Workshops',
    type: 'Innovation Workshop',
    desc: 'Iterating on user experience methodologies, glassmorphism UI layouts, wireframe optimization, and rapid software testing sprints.',
    lat: -5.0,
    lon: 50.0,
    icon: '🎨',
    location: 'Coimbatore, India'
  }
];

// Helper to convert Lat/Lon to 3D Spherical Coordinates
function latLonToVector3(lat: number, lon: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);

  const x = -(radius * Math.sin(phi) * Math.sin(theta));
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.cos(theta);

  return new THREE.Vector3(x, y, z);
}

// 3D Globe Component
interface GlobeModelProps {
  onSelectEvent: (event: EventItem) => void;
  selectedEventId?: string;
  playAudio: (type: 'hover' | 'click') => void;
}

const GlobeModel: React.FC<GlobeModelProps> = ({ onSelectEvent, selectedEventId, playAudio }) => {
  const globeRef = useRef<THREE.Group>(null);
  const radius = 2.0;

  // Render dotted lines around the globe for premium tech aesthetic
  const rings = useMemo(() => {
    const arr = [];
    // Latitude rings
    for (let lat = -60; lat <= 60; lat += 20) {
      const thetaVal = (lat * Math.PI) / 180;
      const ringRadius = radius * Math.cos(thetaVal);
      const ringY = radius * Math.sin(thetaVal);
      const points: [number, number, number][] = [];
      for (let i = 0; i <= 36; i++) {
        const a = (i / 36) * Math.PI * 2;
        points.push([Math.cos(a) * ringRadius, ringY, Math.sin(a) * ringRadius]);
      }
      arr.push(points);
    }
    return arr;
  }, []);

  useFrame((_, delta) => {
    if (globeRef.current) {
      // Rotate the globe slowly
      globeRef.current.rotation.y += delta * 0.08;
    }
  });

  return (
    <group ref={globeRef}>
      {/* Semi-transparent Wireframe Core */}
      <mesh>
        <sphereGeometry args={[radius * 0.98, 16, 16]} />
        <meshBasicMaterial
          color="#1e293b"
          opacity={0.3}
          transparent
          wireframe
        />
      </mesh>

      {/* Grid Tech Rings */}
      {rings.map((points, idx) => (
        <Line
          key={idx}
          points={points}
          color="#3b82f6"
          opacity={0.1}
          transparent
          lineWidth={0.5}
        />
      ))}

      {/* Interactive Glowing Event Pins */}
      {EVENTS.map((event) => {
        const position = latLonToVector3(event.lat, event.lon, radius);
        const isSelected = event.id === selectedEventId;

        return (
          <mesh
            key={event.id}
            position={position}
            onClick={(e) => {
              e.stopPropagation();
              onSelectEvent(event);
            }}
            onPointerOver={(e) => {
              e.stopPropagation();
              playAudio('hover');
            }}
          >
            <sphereGeometry args={[isSelected ? 0.12 : 0.08, 8, 8]} />
            <meshBasicMaterial
              color={isSelected ? '#06b6d4' : '#8b5cf6'}
              toneMapped={false}
            />

            {/* Glowing outer halo ring */}
            <mesh>
              <sphereGeometry args={[isSelected ? 0.2 : 0.14, 8, 8]} />
              <meshBasicMaterial
                color={isSelected ? '#06b6d4' : '#8b5cf6'}
                transparent
                opacity={0.25}
                wireframe
              />
            </mesh>

            {/* Floating label */}
            <Html distanceFactor={6} position={[0, 0.25, 0]} center>
              <div
                className={`flex items-center gap-1 px-2 py-0.5 rounded-md text-[8px] whitespace-nowrap font-display font-semibold select-none border transition-all duration-300 ${
                  isSelected
                    ? 'bg-accentCyan border-transparent text-white scale-110 shadow-[0_0_8px_#06b6d4]'
                    : 'bg-[#030612]/85 border-glass-border text-textSecondary hover:text-white'
                }`}
              >
                <span>{event.icon}</span>
                {event.name.split(' ')[0]}...
              </div>
            </Html>
          </mesh>
        );
      })}
    </group>
  );
};

export const EventsGlobe: React.FC<EventsGlobeProps> = ({ playAudio }) => {
  const [selectedEvent, setSelectedEvent] = useState<EventItem>(EVENTS[0]);

  const handleSelect = (event: EventItem) => {
    playAudio('click');
    setSelectedEvent(event);
  };

  return (
    <section id="events" className="py-24 px-6 md:px-12 max-w-7xl mx-auto relative z-10 w-full">
      <div className="flex flex-col gap-2 mb-10 text-center md:text-left">
        <span className="text-xs font-bold uppercase tracking-[0.25em] bg-gradient-main bg-clip-text text-transparent">
          Community Presence
        </span>
        <h2 className="text-3xl md:text-5xl font-black font-display tracking-tight text-white">
          Events & <span className="bg-gradient-main bg-clip-text text-transparent">Conferences</span>
        </h2>
        <p className="text-textSecondary text-sm md:text-base max-w-2xl mt-2 leading-relaxed">
          Actively building ties in global development ecosystems by taking part in database workshops, cloud meetups, and artificial intelligence conferences. Click the glowing nodes on the globe to explore.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mt-10">
        {/* Left Column: 3D Globe Canvas */}
        <div className="lg:col-span-7 h-[360px] md:h-[480px] bg-[#070b1a]/40 border border-glass-border rounded-3xl relative overflow-hidden neumorphic-inset">
          <div className="absolute top-4 left-4 z-10 text-[10px] md:text-xs font-mono text-textMuted select-none pointer-events-none uppercase tracking-widest flex items-center gap-1.5">
            <GlobeIcon className="w-3.5 h-3.5 text-accentCyan animate-spin-slow" />
            3D GLOBE ENGINE ACTIVE // ROTATE & CLICK NODES
          </div>

          <Canvas camera={{ position: [0, 0, 4.2], fov: 60 }} dpr={[1, 1.2]}>
            <ambientLight intensity={0.8} />
            <pointLight position={[10, 10, 10]} intensity={1.5} />
            <GlobeModel
              onSelectEvent={handleSelect}
              selectedEventId={selectedEvent?.id}
              playAudio={playAudio}
            />
          </Canvas>
        </div>

        {/* Right Column: Event Detail Card */}
        <div className="lg:col-span-5">
          <div className="glass-card border border-glass-border p-6 md:p-8 rounded-3xl relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute -top-12 -right-12 w-28 h-28 bg-accentPurple/25 blur-[35px] rounded-full pointer-events-none" />

            <div className="flex justify-between items-start gap-4 mb-6">
              <span className="text-4xl p-3 bg-white/5 rounded-2xl border border-glass-border select-none">
                {selectedEvent.icon}
              </span>
              <span className="px-3 py-1 bg-white/5 border border-glass-border rounded-full text-[10px] font-bold text-textMuted uppercase tracking-wider font-mono">
                {selectedEvent.type}
              </span>
            </div>

            <h3 className="text-xl font-bold font-display text-white leading-tight mb-2">
              {selectedEvent.name}
            </h3>

            <div className="flex items-center gap-1.5 text-xs text-accentCyan font-semibold mb-4">
              <MapPin className="w-4 h-4 text-accentCyan" />
              {selectedEvent.location}
            </div>

            <p className="text-xs md:text-sm text-textSecondary leading-relaxed mb-6">
              {selectedEvent.desc}
            </p>

            <div className="pt-6 border-t border-glass-border flex justify-between items-center text-[10px] md:text-xs text-textMuted font-mono">
              <span>ACTIVE INVOLVEMENT</span>
              <span className="text-accentPurple font-semibold flex items-center gap-1 hover:translate-x-1 transition-all cursor-pointer">
                Community Node <ExternalLink className="w-3 h-3" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
