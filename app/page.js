// app/page.js
'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BirthdayPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleMusic = async () => {
    if (!audioRef.current) return;

    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        // Set volume first
        audioRef.current.volume = 0.7;

        const playPromise = audioRef.current.play();

        if (playPromise !== undefined) {
          await playPromise;
          setIsPlaying(true);
        }
      }
    } catch (err) {
      console.error('Audio error:', err);
      setIsPlaying(false);
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Generate consistent random values only on client side
  const floatingHearts = mounted ? Array.from({ length: 15 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 5,
    duration: 3 + Math.random() * 4
  })) : [];

  const sparkles = mounted ? Array.from({ length: 25 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    delay: Math.random() * 3,
    size: 2 + Math.random() * 4
  })) : [];

  return (
      <div className="relative h-screen overflow-y-scroll snap-y snap-mandatory">
        {/* Background Music - No autoplay */}
        <audio
            ref={audioRef}
            loop
            preload="metadata"
        >
          <source
              src="/audio/romantic-piano.mp3"
              type="audio/mpeg"
          />
          <source
              src="/audio/romantic-piano.mp3"
              type="audio/mpeg"
          />
        </audio>

        {/* Floating Hearts Background - Only render on client */}
        {mounted && (
            <div className="fixed inset-0 pointer-events-none z-0">
              {floatingHearts.map((heart) => (
                  <motion.div
                      key={heart.id}
                      className="absolute text-pink-300 text-xl"
                      style={{ left: `${heart.left}%` }}
                      initial={{ y: '100vh', opacity: 0 }}
                      animate={{
                        y: '-100vh',
                        opacity: [0, 0.7, 0]
                      }}
                      transition={{
                        duration: heart.duration,
                        delay: heart.delay,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                  >
                    ❤️
                  </motion.div>
              ))}
            </div>
        )}

        {/* Sparkles Background - Only render on client */}
        {mounted && (
            <div className="fixed inset-0 pointer-events-none z-0">
              {sparkles.map((sparkle) => (
                  <motion.div
                      key={sparkle.id}
                      className="absolute bg-yellow-200 rounded-full"
                      style={{
                        left: `${sparkle.left}%`,
                        top: `${sparkle.top}%`,
                        width: `${sparkle.size}px`,
                        height: `${sparkle.size}px`
                      }}
                      animate={{
                        opacity: [0, 1, 0],
                        scale: [0, 1.2, 0]
                      }}
                      transition={{
                        duration: 2,
                        delay: sparkle.delay,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                  />
              ))}
            </div>
        )}

        {/* Music Control - Always visible */}
        <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            onClick={toggleMusic}
            className="fixed top-6 right-6 z-50 bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-full shadow-lg transition-all duration-300 flex items-center gap-2"
        >
          {isPlaying ? (
              <>
                <span>Pause Music</span>
                <span>⏸️</span>
              </>
          ) : (
              <>
                <span>Play Music</span>
                <span>🎵</span>
              </>
          )}
        </motion.button>

        {/* Section 1: Greeting */}
        <section className="h-screen snap-start flex items-center justify-center relative z-10 bg-gradient-to-br from-pink-100 via-purple-100 to-red-100">
          <div className="text-center px-4">
            <motion.h1
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent"
                style={{ fontFamily: 'Great Vibes, cursive' }}
            >
              Շնորհավոր ծնունդդ, գեղեցկուհի։
            </motion.h1>

            <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 1.2 }}
                className="text-4xl mb-8"
            >
              🎂💖
            </motion.div>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.8 }}
                className="text-xl md:text-2xl text-gray-700 max-w-2xl mx-auto leading-relaxed"
                style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Թող այս օրը լինի ինչպես դու՝ ժպտերես, բարի և լուսավոր։
              Թող ամեն պահ քեզ հիշեցնի, թե որքան թանկ ես դու նրանց համար,
              ովքեր քեզ իսկապես գնահատում են։ 🌷
            </motion.p>
          </div>
        </section>

        {/* Section 2: Message of Love */}
        <section className="h-screen snap-start flex items-center justify-center relative z-10 bg-gradient-to-tr from-purple-100 via-pink-100 to-yellow-50">
          <div className="text-center px-4 max-w-4xl mx-auto">
            <motion.div
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
                className="mb-8"
            >
              <span className="text-6xl mb-4 block">✨</span>
              <h2 className="text-4xl md:text-5xl font-semibold mb-6 text-purple-800"
                  style={{ fontFamily: 'Playfair Display, serif' }}>
                Դու այն մարդկանցից ես, որոնց ներկայությունը
                պարզապես դարձնում է օրը ավելի լավը։ 🌤️
              </h2>
            </motion.div>

            <motion.p
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
                viewport={{ once: true }}
                className="text-xl md:text-2xl text-gray-800 leading-relaxed mb-6"
                style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              Քո ժպիտը՝ ամենագեղեցիկը,
              քո էներգիան՝ ամենազգացմունքայինը,
              իսկ քո բարությունը՝ անկրկնելի։ 💖 <br/>

              Թող կյանքդ միշտ լցված լինի ժպիտներով և հրաշքներով։
            </motion.p>

            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6 }}
                viewport={{ once: true }}
                className="text-3xl mt-8"
            >
              💕🌹🌟
            </motion.div>
          </div>
        </section>

        {/* Section 3: Memories & Appreciation */}
        <section className="h-screen snap-start flex items-center justify-center relative z-10 bg-gradient-to-bl from-rose-50 via-amber-50 to-purple-50">
          <div className="text-center px-4 max-w-4xl mx-auto">
            <motion.h2
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-bold mb-8 text-rose-700"
                style={{ fontFamily: 'Great Vibes, cursive' }}
            >
              Երբևէ մտածե՞լ ես, թե ինչ ազդեցություն ունես մարդկանց վրա։
            </motion.h2>

            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
            >
              {['🌸', '💫', '📸'].map((icon, index) => (
                  <motion.div
                      key={icon}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.2 }}
                      viewport={{ once: true }}
                      className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50"
                  >
                    <div className="text-4xl mb-4">{icon}</div>
                    <p className="text-gray-700" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      {index === 0 && "Քո մի ժպիտը բավարար է՝ շրջապատին ջերմություն պարգևելու համար։"}
                      {index === 1 && "Քո ներկայությունը նման է արևի շողի՝ լուռ, բայց միշտ ջերմացնող։"}
                      {index === 2 && "Դու բարություն ես տարածում առանց գիտակցելու։"}
                    </p>
                  </motion.div>
              ))}
            </motion.div>

            <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1 }}
                viewport={{ once: true }}
                className="text-xl md:text-2xl text-gray-800 italic"
                style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Եվ հենց դա է քեզ առանձնացնում։
            </motion.p>
          </div>
        </section>

        {/* Section 4: Final Wish */}
        <section className="h-screen snap-start flex items-center justify-center relative z-10 bg-gradient-to-r from-purple-200 via-pink-200 to-red-200">
          <div className="text-center px-4">
            <motion.h2
                initial={{ opacity: 0, y: -50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
                className="text-4xl md:text-6xl font-bold mb-8 text-purple-900"
                style={{ fontFamily: 'Great Vibes, cursive' }}
            >
              My Wish For You
            </motion.h2>

            <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                viewport={{ once: true }}
                className="text-2xl md:text-3xl mb-8 text-gray-800 max-w-3xl mx-auto leading-relaxed"
                style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Թող այս տարին քեզ բերի ամենագեղեցիկ պահերը,
              իրականանան բոլոր երազանքներդ,
              ու երբեք չկորցնես այն փայլը, որը քեզ այդքան յուրահատուկ է դարձնում։ ✨
            </motion.p>

            <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 1 }}
                viewport={{ once: true }}
                className="text-5xl mb-8"
            >
              💫🎉🎁
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.5 }}
                viewport={{ once: true }}
                className="mb-8"
            >
              <h3 className="text-3xl md:text-4xl font-semibold bg-gradient-to-r from-pink-600 to-red-600 bg-clip-text text-transparent mb-4"
                  style={{ fontFamily: 'Great Vibes, cursive' }}>
                Մի պարզ մաղթանք՝ միշտ մնա այնպիսին, ինչպես հիմա ես։
              </h3>
              <div className="text-4xl">❤️</div>
            </motion.div>

            <motion.button
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 2 }}
                viewport={{ once: true }}
                onClick={copyLink}
                className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2 mx-auto"
                style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              {copied ? 'Copied! 💝' : 'Share this moment 💌'}
            </motion.button>
          </div>
        </section>

        {/* Custom Styles */}
        <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Poppins:wght@300;400;500;600&display=swap');
        
        html {
          scroll-behavior: smooth;
        }
        
        body {
          margin: 0;
          padding: 0;
          overflow-x: hidden;
        }
        
        /* Scroll snap */
        .snap-y {
          scroll-snap-type: y mandatory;
        }
        
        .snap-start {
          scroll-snap-align: start;
        }
        
        .snap-mandatory {
          scroll-snap-stop: always;
        }
      `}</style>
      </div>
  );
}