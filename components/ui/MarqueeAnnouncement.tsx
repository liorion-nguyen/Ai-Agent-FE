import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

interface Announcement {
  text: string;
  linkText?: string;
  linkHref?: string;
}

interface MarqueeAnnouncementProps {
  announcements: Announcement[];
}

const MarqueeAnnouncement: React.FC<MarqueeAnnouncementProps> = ({
  announcements,
}) => {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [duration, setDuration] = useState('15s');

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setDuration(mobile ? '20s' : '15s'); // slower speed on mobile
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="w-full overflow-hidden">
      <div
        ref={marqueeRef}
        className="flex whitespace-nowrap animate-marquee"
        style={
          {
            '--marquee-duration': duration,
            willChange: 'transform',
          } as React.CSSProperties
        }
      >
        {announcements.map((item, index) => (
          <div
            key={index}
            className={`inline-block ${isMobile ? 'w-full' : ''} text-center mr-[100px]`}
          >
            <span>
              {item.text}
              {item.linkText && item.linkHref && (
                <Link
                  href={item.linkHref}
                  className="underline font-medium ml-1"
                >
                  {item.linkText}
                </Link>
              )}
            </span>
          </div>
        ))}
        {/* Duplicate content for seamless looping */}
        {announcements.map((item, index) => (
          <div
            key={`duplicate-${index}`}
            className={`inline-block ${isMobile ? 'w-full' : ''} text-center mr-[100px]`}
          >
            <span>
              {item.text}
              {item.linkText && item.linkHref && (
                <Link
                  href={item.linkHref}
                  className="underline font-medium ml-1"
                >
                  {item.linkText}
                </Link>
              )}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarqueeAnnouncement;
