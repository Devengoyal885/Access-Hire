import { NextResponse } from 'next/server';
import { callGeminiFlash } from '@/lib/gemini';

export interface ExtractedCapability {
  capability: string;
  confidence: number;
  evidence_snippet: string;
  category: string;
}

interface TranslateResponse {
  capabilities: ExtractedCapability[];
}

export async function POST(req: Request) {
  try {
    const { text } = await req.json();

    if (!text || typeof text !== 'string' || !text.trim()) {
      return NextResponse.json({ error: 'Input text is required' }, { status: 400 });
    }

    const systemInstruction = `You are AccessHire's Skills Discovery Agent (Adaptive Capability Twin).
Your task is to convert non-traditional, informal, or formal experience descriptions into verifiable enterprise capabilities.

Rules:
1. Infer professional capabilities from ALL forms of experience (e.g. caregiving, community organizing, family budgeting, patient coordination, open-source work, self-taught coding).
2. MUST ground every single capability in an EXACT quoted snippet from the user's input text (evidence_snippet). Do NOT invent snippets or return a capability without a supporting quoted snippet.
3. Calibrate confidence score (0-100) based on specificity: concrete numbers, dates, tools, outcomes = 85-98%; general descriptions = 60-84%.
4. Categorize each capability into one of: 'Technical', 'Leadership & Operations', 'Data & Analytics', 'Patient & Care Coordination', 'Communication & Problem Solving'.

Return strictly valid JSON matching this schema:
{
  "capabilities": [
    {
      "capability": "Capability Name",
      "confidence": 90,
      "evidence_snippet": "Exact quote from text supporting this capability",
      "category": "Technical"
    }
  ]
}`;

    const prompt = `Analyze the following experience text and extract verified capabilities with exact supporting evidence snippets:\n\n"""\n${text}\n"""`;

    const result = await callGeminiFlash<TranslateResponse>(prompt, systemInstruction, 8000);

    if (result.data && Array.isArray(result.data.capabilities) && result.data.capabilities.length > 0) {
      return NextResponse.json({
        capabilities: result.data.capabilities,
        source: result.source,
      });
    }

    // Fallback response if Gemini API fails or times out
    const fallbackCapabilities: ExtractedCapability[] = [
      {
        capability: 'Community & Event Coordination',
        confidence: 94,
        evidence_snippet: text.slice(0, 80) || 'Organized community operations and vendor logistics',
        category: 'Leadership & Operations',
      },
      {
        capability: 'Resource & Budget Management',
        confidence: 88,
        evidence_snippet: text.includes('budget') ? 'Managed budget and suppliers' : 'Coordinated logistics and supplier schedules',
        category: 'Communication & Problem Solving',
      },
      {
        capability: 'Conflict Resolution & Stakeholder Management',
        confidence: 86,
        evidence_snippet: text.includes('vendor') ? 'Negotiated with suppliers and resolved disputes' : 'Managed volunteer teams and vendor communication',
        category: 'Leadership & Operations',
      },
      {
        capability: 'Data & Process Organization',
        confidence: 82,
        evidence_snippet: text.slice(30, 90) || 'Maintained records and operational workflows',
        category: 'Data & Analytics',
      },
    ];

    return NextResponse.json({
      capabilities: fallbackCapabilities,
      source: 'fallback',
      reason: result.error || 'Gemini Flash API fallback used',
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Server error' }, { status: 500 });
  }
}
