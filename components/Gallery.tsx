import React from 'react';

interface GalleryProps {
    onPromptSelect: (prompt: string) => void;
}

const galleryItems = [
    {
        prompt: "A bioluminescent jellyfish floating through a nebula, detailed, cosmic.",
        imageUrl: "https://picsum.photos/seed/jellyfish/400"
    },
    {
        prompt: "A tiny steampunk robot tending a single glowing flower in a post-apocalyptic wasteland.",
        imageUrl: "https://picsum.photos/seed/robot/400"
    },
    {
        prompt: "An ancient, moss-covered library inside a giant, hollowed-out tree, fantasy, magical.",
        imageUrl: "https://picsum.photos/seed/library/400"
    },
    {
        prompt: "A city skyline where the buildings are made of crystal and emit a soft, internal light.",
        imageUrl: "https://picsum.photos/seed/crystalcity/400"
    },
    {
        prompt: "An astronaut discovering a surreal, alien garden on a distant moon, sci-fi, vibrant.",
        imageUrl: "https://picsum.photos/seed/astronaut/400"
    },
    {
        prompt: "A clock face melting down a dream-like landscape, surrealism, soft focus.",
        imageUrl: "https://picsum.photos/seed/meltingclock/400"
    },
    {
        prompt: "A lone figure on a cliff overlooking an ocean of clouds at sunset, atmospheric.",
        imageUrl: "https://picsum.photos/seed/cliff/400"
    },
    {
        prompt: "A majestic griffin with shimmering, iridescent feathers soaring through a storm.",
        imageUrl: "https://picsum.photos/seed/griffin/400"
    }
];


export const Gallery: React.FC<GalleryProps> = ({ onPromptSelect }) => {
    return (
        <div className="w-full mt-16">
            <h2 className="text-2xl font-bold text-center text-gray-200 tracking-wide">Inspiration Gallery</h2>
            <p className="text-center text-gray-500 mt-2 mb-8">Click an image to try its prompt!</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {galleryItems.map((item, index) => (
                    <button
                        key={index}
                        onClick={() => onPromptSelect(item.prompt)}
                        className="relative group aspect-square bg-gray-900 rounded-xl overflow-hidden shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 border border-gray-700/50"
                        aria-label={`Select prompt: ${item.prompt}`}
                    >
                        <img 
                            src={item.imageUrl} 
                            alt={item.prompt} 
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                            loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                            <p className="text-white text-center text-sm font-medium">{item.prompt}</p>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};
