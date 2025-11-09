
import React from 'react';

export const Loader: React.FC = () => {
  const messages = [
    "Conjuring pixels with AI magic...",
    "Reticulating splines and textures...",
    "Consulting the digital oracle...",
    "Painting with light and logic...",
    "Generating masterpiece..."
  ];
  const [message, setMessage] = React.useState(messages[0]);

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      setMessage(messages[Math.floor(Math.random() * messages.length)]);
    }, 2500);

    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-10 w-full bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl">
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-purple-500"></div>
      <p className="text-lg font-semibold text-gray-300 tracking-wide">{message}</p>
    </div>
  );
};
