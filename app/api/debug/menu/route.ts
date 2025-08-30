import { auth } from "@/auth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await auth();

    if (!session?.accessToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.log('[DEBUG-API] Testing direct API call at:', new Date().toISOString());

    const fetchStart = Date.now();
    const response = await fetch(`${process.env.API_ENDPOINT}/app/menu`, {
      headers: {
        "Authorization": `Bearer ${session.accessToken}`,
        "Cache-Control": "no-cache, no-store, must-revalidate",
        "Pragma": "no-cache",
        "Expires": "0"
      },
      cache: "no-store"
    });

    const fetchEnd = Date.now();

    const data = await response.json();

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      fetchTime: fetchEnd - fetchStart,
      responseStatus: response.status,
      menuItems: data.length,
      firstItem: data[0],
      rawData: data
    });

  } catch (error) {
    console.error('[DEBUG-API] Error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}
