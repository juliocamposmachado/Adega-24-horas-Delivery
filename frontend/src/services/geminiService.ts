/**
 * Serviço de integração com Google Gemini 2.0 Flash
 * API Key: AIzaSyBYeJ6dq9Ve9H6o39VnJX1EgXprkk2uL3Y
 */

const GEMINI_API_KEY = 'AIzaSyBYeJ6dq9Ve9H6o39VnJX1EgXprkk2uL3Y';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

interface GeminiRequest {
  contents: {
    parts: {
      text: string;
    }[];
  }[];
}

interface GeminiResponse {
  candidates: {
    content: {
      parts: {
        text: string;
      }[];
    };
  }[];
}

/**
 * Gera conteúdo usando o Gemini 2.0 Flash
 */
export async function generateContent(prompt: string): Promise<string> {
  try {
    const requestBody: GeminiRequest = {
      contents: [
        {
          parts: [
            {
              text: prompt
            }
          ]
        }
      ]
    };

    const response = await fetch(GEMINI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-goog-api-key': GEMINI_API_KEY
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Gemini API Error: ${response.status} - ${error}`);
    }

    const data: GeminiResponse = await response.json();
    
    if (!data.candidates || data.candidates.length === 0) {
      throw new Error('Nenhuma resposta gerada pelo Gemini');
    }

    return data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error('Erro ao chamar Gemini API:', error);
    throw error;
  }
}

/**
 * Gera recomendações de produtos baseadas em preferências do usuário
 */
export async function getProductRecommendations(
  userPreferences: string,
  products: any[]
): Promise<string> {
  const prompt = `
Você é um sommelier especializado em bebidas. Com base nas preferências do cliente: "${userPreferences}"

Aqui está nossa lista de produtos disponíveis:
${products.map(p => `- ${p.name} (${p.category}): R$ ${p.price.toFixed(2)}`).join('\n')}

Recomende 3 produtos específicos dessa lista que melhor atendam as preferências do cliente.
Explique brevemente por que cada um é uma boa escolha.
Seja objetivo e persuasivo.
`;

  return await generateContent(prompt);
}

/**
 * Gera descrições otimizadas para produtos
 */
export async function generateProductDescription(
  productName: string,
  category: string,
  price: number
): Promise<string> {
  const prompt = `
Crie uma descrição atraente e profissional para o seguinte produto de adega:

Nome: ${productName}
Categoria: ${category}
Preço: R$ ${price.toFixed(2)}

A descrição deve ter no máximo 2 linhas, ser persuasiva e destacar as qualidades do produto.
`;

  return await generateContent(prompt);
}

/**
 * Gera respostas inteligentes para chat de atendimento
 */
export async function generateChatResponse(
  userMessage: string,
  context: string
): Promise<string> {
  const prompt = `
Você é um atendente virtual da Adega Rádio Tatuapé FM Express.
Contexto: ${context}

Cliente perguntou: "${userMessage}"

Responda de forma amigável, profissional e útil. Seja breve e objetivo.
`;

  return await generateContent(prompt);
}

/**
 * Analisa feedback de clientes e gera insights
 */
export async function analyzeFeedback(feedbacks: string[]): Promise<string> {
  const prompt = `
Analise os seguintes feedbacks de clientes da adega:

${feedbacks.map((f, i) => `${i + 1}. ${f}`).join('\n')}

Forneça:
1. Resumo dos principais pontos positivos
2. Principais áreas de melhoria
3. 3 ações recomendadas para melhorar a experiência do cliente

Seja objetivo e prático.
`;

  return await generateContent(prompt);
}

export default {
  generateContent,
  getProductRecommendations,
  generateProductDescription,
  generateChatResponse,
  analyzeFeedback
};
