import { motion } from 'framer-motion';
import stringToColor from '@/lib/stringToColor';

function FollowPointer({
  x,
  y,
  info,
}: {
  x: number;
  y: number;
  info: {
    name: string;
    email: string;
    avatar?: string;
  };
}) {
  const color = stringToColor(info.email || 'default');

  return (
    <motion.div
      className="absolute z-50 flex items-center gap-1 pointer-events-none"
      style={{
        top: y,
        left: x,
        transform: 'translate(-50%, -50%)', // moves tag closer to the cursor
      }}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {/* Pointer icon */}
      <svg
        width="20"
        height="30"
        viewBox="0 0 24 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5.65376 12.3673H5.46026L5.31717 12.4976L0.5 16.8829V1.19841L11.7841 12.3673H5.65376Z"
          fill={color}
        />
      </svg>

      {/* Name tag with avatar */}
      <motion.div
        className="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium text-black shadow-lg"
        style={{ backgroundColor: color }}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      >
        {info.avatar && (
          <img
            src={info.avatar}
            alt={info.name}
            className="w-4 h-4 rounded-full object-cover border border-white"
          />
        )}
        <span className="whitespace-nowrap">{info.name || info.email}</span>
      </motion.div>
    </motion.div>
  );
}

export default FollowPointer;
