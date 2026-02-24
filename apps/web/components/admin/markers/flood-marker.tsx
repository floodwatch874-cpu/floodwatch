import { SEVERITY_COLOR_MAP } from '@/lib/utils/get-color-map';
import {
  IconAlertCircleFilled,
  IconAlertOctagonFilled,
  IconAlertTriangleFilled,
} from '@tabler/icons-react';

const SEVERITY_CONFIG = {
  critical: { icon: IconAlertOctagonFilled },
  high: { icon: IconAlertTriangleFilled },
  moderate: { icon: IconAlertCircleFilled },
  low: { icon: IconAlertCircleFilled },
};

// const SEVERITY_CONFIGs = {
//   critical: { icon: <IconAlertOctagonFilled />, bg: '#FB2C36' },
//   high: { icon: <IconAlertTriangleFilled />, bg: '#FF6900' },
//   moderate: { icon: <IconAlertCircleFilled />, bg: '#F0B204' },
//   low: { icon: <IconAlertCircleFilled />, bg: '#2B7FFF' },
// };

export const FloodMarker = ({
  severity,
}: {
  severity: 'critical' | 'high' | 'moderate' | 'low';
}) => {
  const { icon: Icon } = SEVERITY_CONFIG[severity] || SEVERITY_CONFIG.low;
  const color = SEVERITY_COLOR_MAP[severity] || SEVERITY_COLOR_MAP.low;
  const size = 32;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
      }}
    >
      {/* circle head */}
      <div
        style={{
          width: size,
          height: size,
          borderRadius: '50%',
          backgroundColor: color,
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '2.5px solid white',
          boxShadow: `0 3px 12px ${color}45, 0 2px 4px rgba(0,0,0,0.2)`,
          zIndex: 2,
        }}
      >
        <Icon size={size * 0.55} stroke={1.8} />
      </div>

      {/* tail (THIS is now the true bottom) */}
      <div
        style={{
          width: 0,
          height: 0,
          borderLeft: `${size * 0.22}px solid transparent`,
          borderRight: `${size * 0.22}px solid transparent`,
          borderTop: `${size * 0.38}px solid ${color}`,
          marginTop: -1,
          zIndex: 2,
        }}
      />

      {/* ground shadow (absolute so it doesn't affect anchor) */}
      <div
        style={{
          position: 'absolute',
          bottom: -6,
          width: size * 0.4,
          height: 4,
          borderRadius: '50%',
          background: 'rgba(0,0,0,0.25)',
          filter: 'blur(2px)',
          zIndex: 1,
        }}
      />
    </div>
  );
};
