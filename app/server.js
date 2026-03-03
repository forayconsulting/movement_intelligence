import 'dotenv/config';
import express from 'express';
import Anthropic from '@anthropic-ai/sdk';
import { systemPrompt } from './lib/system-prompt.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(join(__dirname, 'public')));

const client = process.env.ANTHROPIC_API_KEY
  ? new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
  : null;

app.post('/api/session', async (req, res) => {
  if (!client) {
    return res.status(500).json({
      error: 'API key not configured. Copy .env.example to .env and add your Anthropic API key.'
    });
  }

  const { muscles, deviation, minutes, equipment } = req.body;

  if (!minutes || (!muscles?.length && !deviation)) {
    return res.status(400).json({
      error: 'Please select at least one muscle region or deviation, and a session duration.'
    });
  }

  const targetDescription = deviation
    ? `the "${deviation}" postural deviation pattern`
    : `these muscle groups: ${muscles.join(', ')}`;

  const equipmentList = equipment?.length
    ? equipment.join(', ')
    : 'none (bodyweight only)';

  const userMessage = `Build a ${minutes}-minute restorative movement session targeting ${targetDescription}. Available equipment: ${equipmentList}.`;

  try {
    const message = await client.messages.create({
      model: 'claude-opus-4-6',
      max_tokens: 4096,
      system: systemPrompt,
      messages: [{ role: 'user', content: userMessage }]
    });

    const text = message.content[0].text;

    // Extract JSON from the response (handle potential markdown wrapping)
    let jsonStr = text;
    const jsonMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (jsonMatch) {
      jsonStr = jsonMatch[1].trim();
    }

    const session = JSON.parse(jsonStr);
    res.json(session);
  } catch (err) {
    console.error('Session generation error:', err);

    if (err instanceof SyntaxError) {
      return res.status(502).json({
        error: 'The AI returned an unexpected format. Please try again.'
      });
    }
    if (err.status === 401) {
      return res.status(500).json({
        error: 'Invalid API key. Check your .env file.'
      });
    }
    res.status(500).json({
      error: 'Something went wrong generating your session. Please try again.'
    });
  }
});

app.listen(PORT, () => {
  console.log(`Movement Intelligence running at http://localhost:${PORT}`);
  if (!client) {
    console.warn('⚠  No ANTHROPIC_API_KEY found. Copy .env.example to .env and add your key.');
  }
});
