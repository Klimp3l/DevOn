'use client';

import { useState, useEffect } from 'react';

export default function DebugMenu() {
    const [debugInfo, setDebugInfo] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const testDirectAPI = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/debug/menu');
            const data = await response.json();
            setDebugInfo(data);
        } catch (error) {
            setDebugInfo({ error: error instanceof Error ? error.message : 'Unknown error' });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        testDirectAPI();
    }, []);

    if (!debugInfo) return <div className="p-4 text-sm">Loading debug info...</div>;

    return (
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-sm">
            <h3 className="font-bold mb-2">🔍 Menu Debug Info</h3>
            <div className="space-y-1">
                <p><strong>Timestamp:</strong> {debugInfo.timestamp}</p>
                <p><strong>Fetch Time:</strong> {debugInfo.fetchTime}ms</p>
                <p><strong>Status:</strong> {debugInfo.responseStatus}</p>
                <p><strong>Menu Items:</strong> {debugInfo.menuItems}</p>
                <p><strong>First Item:</strong> {debugInfo.firstItem?.label}</p>
                {debugInfo.error && <p className="text-red-600"><strong>Error:</strong> {debugInfo.error}</p>}
            </div>
            <button
                onClick={testDirectAPI}
                disabled={loading}
                className="mt-2 px-3 py-1 bg-blue-500 text-white rounded text-xs disabled:opacity-50"
            >
                {loading ? 'Testing...' : 'Test Again'}
            </button>
        </div>
    );
}
