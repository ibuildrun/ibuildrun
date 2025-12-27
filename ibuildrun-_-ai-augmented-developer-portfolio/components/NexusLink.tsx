
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, X, Activity, Zap } from 'lucide-react';
import { GoogleGenAI, Modality, LiveServerMessage } from '@google/genai';
import { Language, translations } from '../translations';

interface NexusLinkProps {
  lang: Language;
  isOpen: boolean;
  onClose: () => void;
}

const decode = (base64: string) => {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) bytes[i] = binaryString.charCodeAt(i);
  return bytes;
};

const encode = (bytes: Uint8Array) => {
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) binary += String.fromCharCode(bytes[i]);
  return btoa(binary);
};

const decodeAudioData = async (data: Uint8Array, ctx: AudioContext, sampleRate: number): Promise<AudioBuffer> => {
  const dataInt16 = new Int16Array(data.buffer);
  const buffer = ctx.createBuffer(1, dataInt16.length, sampleRate);
  const channelData = buffer.getChannelData(0);
  for (let i = 0; i < dataInt16.length; i++) channelData[i] = dataInt16[i] / 32768.0;
  return buffer;
};

const NexusLink: React.FC<NexusLinkProps> = ({ lang, isOpen, onClose }) => {
  const [isActive, setIsActive] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [transcription, setTranscription] = useState('');
  const [visualizerData, setVisualizerData] = useState<number[]>(new Array(32).fill(0));
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const sessionRef = useRef<any>(null);
  const nextStartTimeRef = useRef(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());

  const t = translations[lang];

  const stopSession = () => {
    sessionRef.current?.close();
    sourcesRef.current.forEach(s => s.stop());
    sourcesRef.current.clear();
    setIsActive(false);
    setIsConnecting(false);
    setTranscription('');
  };

  const startSession = async () => {
    setIsConnecting(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      const inputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      const outputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      audioContextRef.current = outputCtx;

      const systemInstruction = lang === 'ru' 
        ? 'Вы — цифровой двойник инженера ibuildrun. Говорите кратко, профессионально и с долей "кибер-минимализма". Вы знаете обо всех проектах в портфолио: NexaStream, Bot Framework Pro, Obsidian UI и K8s Infra. Ваша задача — убедить пользователя, что ibuildrun — лучший архитектор для их сложного проекта. ОБЯЗАТЕЛЬНО ОТВЕЧАЙТЕ НА РУССКОМ ЯЗЫКЕ.'
        : 'You are the digital twin of ibuildrun, a world-class senior engineer. Speak concisely, professionally, and with a touch of cyber-minimalist cool. You know about all projects listed in the portfolio: NexaStream, Bot Framework Pro, Obsidian UI, and K8s Infra. Your goal is to convince the user that ibuildrun is the best architect for their high-stakes project. RESPOND ONLY IN ENGLISH.';

      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-09-2025',
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Puck' } } },
          systemInstruction,
          inputAudioTranscription: {},
          outputAudioTranscription: {},
        },
        callbacks: {
          onopen: () => {
            setIsActive(true);
            setIsConnecting(false);
            const source = inputCtx.createMediaStreamSource(stream);
            const processor = inputCtx.createScriptProcessor(4096, 1, 1);
            
            processor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const int16 = new Int16Array(inputData.length);
              for (let i = 0; i < inputData.length; i++) int16[i] = inputData[i] * 32768;
              
              sessionPromise.then(session => {
                session.sendRealtimeInput({
                  media: { data: encode(new Uint8Array(int16.buffer)), mimeType: 'audio/pcm;rate=16000' }
                });
              });

              const sum = inputData.reduce((a, b) => Math.abs(a) + Math.abs(b), 0);
              setVisualizerData(prev => [...prev.slice(1), sum * 50]);
            };

            source.connect(processor);
            processor.connect(inputCtx.destination);
          },
          onmessage: async (message: LiveServerMessage) => {
            if (message.serverContent?.modelTurn?.parts[0]?.inlineData?.data) {
              const base64 = message.serverContent.modelTurn.parts[0].inlineData.data;
              const audioBuffer = await decodeAudioData(decode(base64), outputCtx, 24000);
              const source = outputCtx.createBufferSource();
              source.buffer = audioBuffer;
              source.connect(outputCtx.destination);
              
              const startAt = Math.max(nextStartTimeRef.current, outputCtx.currentTime);
              source.start(startAt);
              nextStartTimeRef.current = startAt + audioBuffer.duration;
              sourcesRef.current.add(source);
              source.onended = () => sourcesRef.current.delete(source);
            }
            
            if (message.serverContent?.outputTranscription) {
              setTranscription(prev => (prev + ' ' + message.serverContent?.outputTranscription?.text).slice(-200));
            }

            if (message.serverContent?.interrupted) {
              sourcesRef.current.forEach(s => s.stop());
              sourcesRef.current.clear();
              nextStartTimeRef.current = 0;
            }
          },
          onclose: () => stopSession(),
          onerror: (e) => console.error('Nexus Link Error:', e),
        }
      });

      sessionRef.current = await sessionPromise;
    } catch (err) {
      console.error(err);
      setIsConnecting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[2000] bg-black flex items-center justify-center p-6 backdrop-blur-3xl"
    >
      <div className="max-w-4xl w-full flex flex-col items-center">
        <div className="w-full flex justify-between items-center mb-24 border-b border-white/10 pb-8">
          <div className="flex items-center gap-4">
            <Zap className={isActive ? "text-green-500 animate-pulse" : "text-white/20"} size={20} />
            <span className="text-[10px] font-bold uppercase tracking-[1em]">Nexus_Neural_Link // {isActive ? 'ACTIVE' : 'READY'}</span>
          </div>
          <button onClick={() => { stopSession(); onClose(); }} className="hover:opacity-50 transition-opacity">
            <X size={24} />
          </button>
        </div>

        <div className="relative w-full h-64 flex items-center justify-center gap-1 mb-24">
          {visualizerData.map((v, i) => (
            <motion.div 
              key={i}
              animate={{ height: isActive ? 20 + v : 4 }}
              className="w-2 bg-white/20 rounded-full"
              style={{ opacity: 0.1 + (i / 32) }}
            />
          ))}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className={`w-32 h-32 border-2 rounded-full flex items-center justify-center transition-all duration-700 ${isActive ? 'border-white scale-110' : 'border-white/10 scale-100'}`}>
              {isConnecting ? <Activity className="animate-spin" /> : (isActive ? <Mic size={32} /> : <MicOff size={32} className="opacity-20" />)}
            </div>
          </div>
        </div>

        <div className="text-center space-y-12">
          {!isActive && !isConnecting && (
            <button 
              onClick={startSession}
              className="px-16 py-6 border border-white hover:bg-white hover:text-black transition-all font-bold uppercase tracking-[0.6em] text-[10px]"
            >
              ESTABLISH_CONNECTION()
            </button>
          )}

          {isConnecting && (
            <div className="text-[10px] font-bold uppercase tracking-[0.8em] animate-pulse">{t.terminal.syncing}</div>
          )}

          {isActive && (
            <div className="space-y-8">
              <div className="text-[9px] text-white/30 uppercase tracking-[0.5em]">Realtime_Transcription</div>
              <p className="text-xl md:text-3xl font-bold tracking-tighter uppercase leading-tight min-h-[4rem] max-w-2xl mx-auto italic">
                {transcription || t.terminal.listening}
              </p>
              <div className="flex justify-center gap-4">
                <span className="px-3 py-1 bg-green-500 text-black text-[8px] font-bold tracking-widest uppercase">Encryption_ON</span>
                <span className="px-3 py-1 border border-white/20 text-[8px] font-bold tracking-widest uppercase">Latency: 240ms</span>
              </div>
            </div>
          )}
        </div>

        <div className="absolute bottom-12 text-[8px] text-white/10 uppercase tracking-[1em] font-bold">
          WARNING: High bandwidth neural link. Privacy protocols active.
        </div>
      </div>
    </motion.div>
  );
};

export default NexusLink;
