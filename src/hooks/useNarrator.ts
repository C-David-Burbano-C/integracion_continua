// src/hooks/useNarrator.ts
import { useState, useCallback } from 'react';
import { useScore } from '../context/ScoreContext';

interface NarratorOptions {
  onComplete?: () => void;
  points?: number;
}

export const useNarrator = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentText, setCurrentText] = useState('');
  const { addScore } = useScore();

  const speak = useCallback((text: string, options: NarratorOptions = {}) => {
    if ('speechSynthesis' in window) {
      // Cancelar cualquier narración anterior
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);

      // Configurar voz en español si está disponible - PRIORIDAD MÁXIMA
      const voices = window.speechSynthesis.getVoices();

      // Buscar voces en español primero
      const spanishVoices = voices.filter((voice: SpeechSynthesisVoice) =>
        voice.lang.startsWith('es') || voice.name.toLowerCase().includes('spanish')
      );

      let selectedVoice = spanishVoices[0]; // Usar la primera voz española disponible

      // Solo si NO hay voces españolas, buscar voces alternativas más expresivas
      if (!selectedVoice) {
        const alternativeVoices = [
          'Microsoft Zira', // Voz clara y expresiva en inglés
          'Google US English', // Voz clara en inglés
          'Alex' // Voz masculina clara en macOS
        ];

        for (const voiceName of alternativeVoices) {
          const altVoice = voices.find((voice: SpeechSynthesisVoice) =>
            voice.name.includes(voiceName) || voice.name.toLowerCase().includes(voiceName.toLowerCase())
          );
          if (altVoice) {
            selectedVoice = altVoice;
            break;
          }
        }
      }

      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }

      // Configurar parámetros de voz para que sea más emocionante para niños
      utterance.rate = 0.85; // Un poco más lento para mejor comprensión
      utterance.pitch = 1.3; // Más agudo y expresivo para niños
      utterance.volume = 0.9; // Más volumen para mayor impacto

      utterance.onstart = () => {
        setIsSpeaking(true);
        setCurrentText(text);
      };

      utterance.onend = () => {
        setIsSpeaking(false);
        setCurrentText('');

        // Dar puntos cuando termine la narración
        if (options.points && options.points > 0) {
          addScore(options.points);
        }

        if (options.onComplete) {
          options.onComplete();
        }
      };

      utterance.onerror = (event) => {
        console.error('❌ Error en narración:', event);
        setIsSpeaking(false);
        setCurrentText('');
      };

      window.speechSynthesis.speak(utterance);
    } else {
      console.warn('❌ Speech synthesis not supported');
      // Fallback: mostrar alerta y dar puntos igual
      alert(`Narración: ${text}`);
      if (options.points && options.points > 0) {
        console.log(`⭐ Sumando ${options.points} puntos (fallback)`);
        addScore(options.points);
      }
      if (options.onComplete) {
        options.onComplete();
      }
    }
  }, [addScore]);

  const stop = useCallback(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
    setCurrentText('');
  }, []);

  return {
    speak,
    stop,
    isSpeaking,
    currentText
  };
};