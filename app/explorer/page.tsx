import { getDirectoryStructure, getFileContent } from '@/lib/markdown';
import { Folder, FileText, ChevronLeft, Home } from 'lucide-react';
import Link from 'next/link';

export default async function Explorer({ searchParams }: { searchParams: Promise<{ path?: string }> }) {
    const resolvedParams = await searchParams;
    const currentPath = resolvedParams.path || '.';
    const isFile = currentPath.endsWith('.md');
    const items = getDirectoryStructure(currentPath);
    const content = isFile ? getFileContent(currentPath) : null;

    const parentPath = currentPath === '.' ? null : currentPath.split('/').slice(0, -1).join('/') || '.';

    return (
        <div style={{ minHeight: '100vh', background: '#fcfcfc', color: '#1f3326', padding: '60px 80px' }}>
            <header style={{ marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <Link href="/" style={{ textDecoration: 'none', color: '#666' }}>
                        <Home size={24} />
                    </Link>
                    <h1 style={{ fontSize: '24px', fontWeight: '800' }}>Project Explorer</h1>
                </div>
                <div style={{ fontSize: '14px', color: '#999' }}>{currentPath}</div>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: content ? '300px 1fr' : '1fr', gap: '40px' }}>
                {/* Sidebar / List */}
                <section className="amber-card" style={{ padding: '0', overflow: 'hidden' }}>
                    {parentPath && (
                        <Link href={`/explorer?path=${parentPath}`} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px 20px', borderBottom: '1px solid #eee', color: '#666', textDecoration: 'none', background: '#f9f9f9', fontSize: '14px' }}>
                            <ChevronLeft size={16} /> Back to parent
                        </Link>
                    )}
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        {items.map((item, i) => (
                            <Link key={i} href={`/explorer?path=${item.path}`} style={{
                                display: 'flex', alignItems: 'center', gap: '12px', padding: '16px 24px', borderBottom: '1px solid #eee', color: '#1f3326', textDecoration: 'none',
                                background: currentPath === item.path ? 'rgba(31, 51, 38, 0.05)' : 'transparent'
                            }}>
                                {item.isDirectory ? <Folder size={18} color="#1f3326" /> : <FileText size={18} color="#666" />}
                                <span style={{ fontSize: '15px' }}>{item.name}</span>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* Content Viewer */}
                {content && (
                    <section className="amber-card" style={{ padding: '40px', background: '#fff' }}>
                        <h2 style={{ fontSize: '20px', marginBottom: '30px', borderBottom: '2px solid #1f3326', paddingBottom: '10px' }}>{currentPath.split('/').pop()}</h2>
                        <pre style={{ whiteSpace: 'pre-wrap', fontSize: '14px', lineHeight: '1.8', color: '#333', fontFamily: 'inherit' }}>
                            {content}
                        </pre>
                    </section>
                )}
            </div>
        </div>
    );
}
