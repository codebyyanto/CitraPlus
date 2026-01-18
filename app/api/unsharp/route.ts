import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();

        // Forward request to Python Flask Backend
        const flaskResponse = await fetch('http://127.0.0.1:5000/process', {
            method: 'POST',
            body: formData,
            // Note: When sending FormData with fetch, do NOT set Content-Type header manually.
            // The browser/fetch client will set it with the correct boundary.
        });

        if (!flaskResponse.ok) {
            const errorText = await flaskResponse.text();
            console.error('Flask Backend Error:', flaskResponse.status, errorText);
            return NextResponse.json(
                { error: `Backend Error: ${flaskResponse.statusText}` },
                { status: flaskResponse.status }
            );
        }

        const data = await flaskResponse.json();
        return NextResponse.json(data);

    } catch (error: any) {
        console.error('Error forwarding to backend:', error);
        return NextResponse.json(
            { error: 'Failed to connect to processing backend. Is the Python server running?' },
            { status: 500 }
        );
    }
}

