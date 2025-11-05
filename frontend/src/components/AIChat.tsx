import { useState, useEffect, useRef } from 'react';
import { Send, Loader2, Sparkles, Volume2 } from 'lucide-react';
import { generateChatResponse } from '../services/geminiService';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  links?: { text: string; url: string }[];
}

export default function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Olá! Sou Juliette, assistente virtual da Adega Rádio Tatuapé FM. Como posso ajudar você hoje?',
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const synth = window.speechSynthesis;

  // Função para ler em voz alta com voz feminina
  const speakText = (text: string) => {
    if (synth.speaking) {
      synth.cancel();
    }

    // Remover links markdown do texto antes de falar
    const cleanText = text.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'pt-BR';
    utterance.rate = 0.9;
    utterance.pitch = 1.2;
    
    // Tentar usar voz feminina em português
    const voices = synth.getVoices();
    const femaleVoice = voices.find(voice => 
      voice.lang.startsWith('pt') && voice.name.toLowerCase().includes('fem')
    ) || voices.find(voice => 
      voice.lang.startsWith('pt')
    ) || voices[0];

    if (femaleVoice) {
      utterance.voice = femaleVoice;
    }

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    synth.speak(utterance);
  };

  // Scroll automático para última mensagem
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Extrair e processar links da resposta
  const processResponse = (text: string) => {
    const links: { text: string; url: string }[] = [];
    
    // Regex para encontrar links markdown
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    let match;
    
    while ((match = linkRegex.exec(text)) !== null) {
      links.push({
        text: match[1],
        url: match[2]
      });
    }
    
    return { text, links };
  };

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const context = `
        Você é Juliette, assistente virtual feminina da Adega Rádio Tatuapé FM Express.
        
        INFORMAÇÕES DA ADEGA:
        - Nome: Adega Rádio Tatuapé FM Express
        - Localização: Rua Dante Pellacani, 92 - Tatuapé, São Paulo/SP - CEP 03334-070
        - Horário: 24 horas, 7 dias por semana
        - Delivery: Rápido via Uber Direct
        - Produtos: Vinhos, Cervejas, Whiskies, Gin, Vodka, Energéticos, Refrigerantes, Águas
        - WhatsApp: (11) 97060-3441
        - Formas de pagamento: Dinheiro, PIX, Cartão de Crédito/Débito, Mercado Pago
        
        LINKS IMPORTANTES (use formato markdown [texto](url)):
        - Catálogo: [Ver Catálogo Completo](https://adega-24-horas-delivery.vercel.app/catalogo)
        - Sobre Nós: [Conhecer a Adega](https://adega-24-horas-delivery.vercel.app/sobre)
        - WhatsApp: [Falar no WhatsApp](https://api.whatsapp.com/send/?phone=5511970603441&text=Ol%C3%A1%2C+gostaria+de+fazer+um+pedido&type=phone_number&app_absent=0)
        - Checkout: [Finalizar Pedido](https://adega-24-horas-delivery.vercel.app/checkout)
        
        INSTRUÇÕES:
        - Seja simpática, prestativa e profissional
        - Sempre que relevante, inclua links usando formato markdown
        - Apresente-se como Juliette
        - Ajude o usuário a encontrar produtos, fazer pedidos e tirar dúvidas
        - Sugira produtos e promova a variedade da adega
        - Sempre mencione delivery rápido e atendimento 24h
      `;

      const aiResponse = await generateChatResponse(input, context);

      const { text, links } = processResponse(aiResponse);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text,
        sender: 'ai',
        timestamp: new Date(),
        links
      };

      setMessages(prev => [...prev, aiMessage]);
      
      // Ler resposta em voz alta
      speakText(aiResponse);
    } catch (error) {
      console.error('Erro ao gerar resposta:', error);
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Desculpe, ocorreu um erro. Por favor, tente novamente ou [entre em contato via WhatsApp](https://api.whatsapp.com/send/?phone=5511970603441&text=Ol%C3%A1%2C+gostaria+de+fazer+um+pedido&type=phone_number&app_absent=0).',
        sender: 'ai',
        timestamp: new Date(),
        links: [{ text: 'entre em contato via WhatsApp', url: 'https://api.whatsapp.com/send/?phone=5511970603441&text=Ol%C3%A1%2C+gostaria+de+fazer+um+pedido&type=phone_number&app_absent=0' }]
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-6 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white p-4 rounded-full shadow-lg transition z-50 animate-pulse"
        aria-label="Chat AI"
      >
        <Sparkles className="w-6 h-6" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl flex flex-col z-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-4 rounded-t-2xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Sparkles className="w-6 h-6 text-white" />
          <div>
            <h3 className="font-bold text-white">Juliette - Assistente AI</h3>
            <p className="text-xs text-purple-100">🎤 Com síntese de voz • Gemini 2.0</p>
          </div>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="text-white hover:bg-white/20 p-2 rounded-lg transition"
        >
          ✕
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(message => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                message.sender === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-100'
              }`}
            >
              {/* Renderizar texto com links clicáveis */}
              <div className="text-sm whitespace-pre-wrap">
                {message.text.split(/\[([^\]]+)\]\(([^)]+)\)/).map((part, i) => {
                  // Se o índice é ímpar, é o texto do link
                  // Se o próximo é a URL
                  if (i % 3 === 1) {
                    const url = message.text.split(/\[([^\]]+)\]\(([^)]+)\)/)[i + 1];
                    return (
                      <a
                        key={i}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 underline font-semibold"
                      >
                        {part}
                      </a>
                    );
                  } else if (i % 3 === 2) {
                    return null; // Já usado como URL
                  }
                  return <span key={i}>{part}</span>;
                })}
              </div>
              
              <div className="flex items-center justify-between mt-2">
                <p className="text-xs opacity-60">
                  {message.timestamp.toLocaleTimeString('pt-BR', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
                
                {/* Botão para ouvir novamente */}
                {message.sender === 'ai' && (
                  <button
                    onClick={() => speakText(message.text)}
                    disabled={isSpeaking}
                    className="text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1 disabled:opacity-50"
                    title="Ouvir mensagem"
                  >
                    <Volume2 className="w-3 h-3" />
                    {isSpeaking ? 'Falando...' : 'Ouvir'}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-gray-800 p-3 rounded-lg">
              <Loader2 className="w-5 h-5 animate-spin text-purple-500" />
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-700">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Digite sua mensagem..."
            className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            disabled={loading}
          />
          <button
            onClick={handleSend}
            disabled={loading || !input.trim()}
            className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white p-2 rounded-lg transition"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2 text-center">
          Respostas geradas por IA • Gemini 2.0 Flash
        </p>
      </div>
    </div>
  );
}
