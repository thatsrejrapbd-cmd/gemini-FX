import React, { useState } from 'react';
import { Header } from './components/Header';
import { Loader } from './components/Loader';
import { SparklesIcon } from './components/icons/SparklesIcon';
import { Gallery } from './components/Gallery';
import { generateImageFromPrompt } from './services/geminiService';

const App: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt) {
      setError('Please enter a prompt to generate an image.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedImageUrl(null);

    try {
      const generatedImageBase64 = await generateImageFromPrompt(prompt);
      setGeneratedImageUrl(`data:image/png;base64,${generatedImageBase64}`);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const isGenerateDisabled = !prompt || isLoading;

  return (
    <div className="min-h-screen bg-black text-gray-100 font-sans p-4 sm:p-6 lg:p-8 overflow-x-hidden">
      <div 
        className="absolute inset-0 z-0 opacity-10"
        style={{
          backgroundImage: 'radial-gradient(circle at center, rgba(118, 56, 226, 0.5) 0%, rgba(118, 56, 226, 0) 40%), radial-gradient(circle at 80% 20%, rgba(56, 189, 248, 0.4) 0%, rgba(56, 189, 248, 0) 35%), radial-gradient(circle at 20% 80%, rgba(74, 222, 128, 0.3) 0%, rgba(74, 222, 128, 0) 30%)',
        }}
      ></div>
      <div className="relative z-10 max-w-5xl mx-auto">
        <Header />
        <main className="mt-8 md:mt-16 flex flex-col items-center gap-8">
          <div className="w-full p-6 md:p-8 bg-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl shadow-2xl shadow-purple-500/10">
            <div className="flex flex-col gap-6">
                <h2 className="text-xl font-bold text-gray-200 tracking-wide text-center">Describe Your Vision</h2>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="e.g., 'A photorealistic portrait of a cyborg cat in a neon-lit alley'"
                  className="w-full h-28 p-4 bg-gray-800/60 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all duration-300 placeholder-gray-500 text-white resize-none"
                  disabled={isLoading}
                />
            </div>
            <div className="mt-6 text-center">
              <button
                onClick={handleGenerate}
                disabled={isGenerateDisabled}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-full shadow-lg shadow-purple-500/30 transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-400/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 disabled:shadow-none"
              >
                <SparklesIcon className="w-6 h-6" />
                <span>Generate Image</span>
              </button>
            </div>
             {error && <p className="mt-4 text-center text-red-400 bg-red-900/50 p-3 rounded-lg">{error}</p>}
          </div>

          <div className="w-full mt-8">
            {isLoading ? (
                <Loader />
            ) : (
                <div className="w-full max-w-2xl mx-auto aspect-square bg-gray-900/50 rounded-2xl border border-gray-700/50 flex items-center justify-center p-2 shadow-lg">
                    {generatedImageUrl ? (
                        <img src={generatedImageUrl} alt="AI generated" className="max-w-full max-h-full object-contain rounded-lg" />
                    ) : (
                        <div className="text-center text-gray-500 p-8">
                            <SparklesIcon className="w-16 h-16 mx-auto text-gray-600" />
                            <p className="mt-4 text-lg">Your generated image will appear here</p>
                            <p className="text-sm mt-1">Enter a prompt above and click generate to start.</p>
                        </div>
                    )}
                </div>
            )}
          </div>
          <Gallery onPromptSelect={setPrompt} />
        </main>
      </div>
    </div>
  );
};

export default App;
