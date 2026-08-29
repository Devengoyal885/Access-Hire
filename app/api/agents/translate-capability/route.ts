import { NextResponse } from 'next/server';
import type { MLCapability } from '@/types';

// ─── AccessHire ML Skills Discovery Agent Proxy ─────────────
// Proxies browser requests to the FastAPI + MPNet backend.
// The backend URL is configured via ACCESSHIRE_ML_API_URL.

interface MLApiResponse {
  capabilities: MLCapability[];
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { text } = body;

    if (!text || typeof text !== 'string' || !text.trim()) {
      return NextResponse.json(
        { error: 'Input text is required' },
        { status: 400 },
      );
    }

    const mlApiUrl = process.env.ACCESSHIRE_ML_API_URL;
    if (!mlApiUrl) {
      return NextResponse.json(
        { error: 'ML API URL is not configured (ACCESSHIRE_ML_API_URL)' },
        { status: 503 },
      );
    }

    const inferUrl = `${mlApiUrl}/infer-capabilities`;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000); // 15s timeout

    const mlRes = await fetch(inferUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true',
      },
      body: JSON.stringify({ text: text.trim(), top_k: 8 }),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!mlRes.ok) {
      const errText = await mlRes.text().catch(() => 'Unknown error');
      return NextResponse.json(
        {
          error: `ML API returned status ${mlRes.status}`,
          detail: errText,
        },
        { status: 502 },
      );
    }

    const mlData: MLApiResponse = await mlRes.json();

    if (!mlData.capabilities || !Array.isArray(mlData.capabilities)) {
      return NextResponse.json(
        { error: 'Invalid response format from ML API' },
        { status: 502 },
      );
    }

    // Map capabilities — preserve all ML signals, add default category
    const capabilities: MLCapability[] = mlData.capabilities.map((c) => ({
      capability: c.capability,
      confidence: Math.round(c.confidence * 10) / 10,
      semantic_score: c.semantic_score,
      keyword_score: c.keyword_score,
      evidence_score: c.evidence_score,
      evidence_snippet: c.evidence_snippet,
      category: c.category || 'AI-Inferred Capability',
    }));

    return NextResponse.json({
      capabilities,
      source: 'live',
      model: 'AccessHire MPNet',
      capability_count: capabilities.length,
    });
  } catch (error: unknown) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      return NextResponse.json(
        { error: 'ML API request timed out (15s). The backend may be starting up.' },
        { status: 504 },
      );
    }

    const message =
      error instanceof Error ? error.message : 'Unknown server error';

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
