'use client';

import { useState } from 'react';
import { addTask } from './actions';
import { Plus, X } from 'lucide-react';

export function AddTaskForm({ projects }: { projects: string[] }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handleSubmit(formData: FormData) {
        setIsSubmitting(true);
        const result = await addTask(formData);
        setIsSubmitting(false);

        if (result.success) {
            setIsOpen(false);
            // ページをリロードして更新を反映
            window.location.reload();
        } else {
            alert(result.error);
        }
    }

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                    width: '100%', padding: '16px', border: '2px dashed #ccc', borderRadius: '10px',
                    background: 'transparent', cursor: 'pointer', color: '#666', fontSize: '14px',
                    transition: 'all 0.2s'
                }}
                onMouseOver={(e) => {
                    e.currentTarget.style.borderColor = '#1f3326';
                    e.currentTarget.style.color = '#1f3326';
                }}
                onMouseOut={(e) => {
                    e.currentTarget.style.borderColor = '#ccc';
                    e.currentTarget.style.color = '#666';
                }}
            >
                <Plus size={18} /> 新しいタスクを追加
            </button>
        );
    }

    return (
        <form
            action={handleSubmit}
            style={{
                padding: '20px', border: '2px solid #1f3326', borderRadius: '10px',
                background: '#fff', display: 'flex', flexDirection: 'column', gap: '16px'
            }}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: '#1f3326' }}>新しいタスクを追加</h3>
                <button type="button" onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                    <X size={20} color="#999" />
                </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '12px', fontWeight: '600', color: '#666' }}>タスク名 *</label>
                <input
                    name="task"
                    required
                    placeholder="例: 予約システムのプロトタイプ完成"
                    style={{
                        padding: '10px 12px', border: '1px solid #ddd', borderRadius: '6px',
                        fontSize: '14px', outline: 'none'
                    }}
                />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '12px', fontWeight: '600', color: '#666' }}>プロジェクト *</label>
                    <select
                        name="project"
                        required
                        style={{
                            padding: '10px 12px', border: '1px solid #ddd', borderRadius: '6px',
                            fontSize: '14px', background: '#fff'
                        }}
                    >
                        {projects.map(p => (
                            <option key={p} value={p}>{p}</option>
                        ))}
                    </select>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '12px', fontWeight: '600', color: '#666' }}>優先度</label>
                    <select
                        name="priority"
                        defaultValue="P2"
                        style={{
                            padding: '10px 12px', border: '1px solid #ddd', borderRadius: '6px',
                            fontSize: '14px', background: '#fff'
                        }}
                    >
                        <option value="P1">P1 - 最優先</option>
                        <option value="P2">P2 - 高い</option>
                        <option value="P3">P3 - 普通</option>
                        <option value="P4">P4 - 低い</option>
                    </select>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '12px', fontWeight: '600', color: '#666' }}>担当者</label>
                    <input
                        name="assignee"
                        placeholder="例: 松井"
                        defaultValue="松井"
                        style={{
                            padding: '10px 12px', border: '1px solid #ddd', borderRadius: '6px',
                            fontSize: '14px', outline: 'none'
                        }}
                    />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '12px', fontWeight: '600', color: '#666' }}>期日</label>
                    <input
                        name="dueDate"
                        type="date"
                        style={{
                            padding: '10px 12px', border: '1px solid #ddd', borderRadius: '6px',
                            fontSize: '14px', outline: 'none'
                        }}
                    />
                </div>
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                style={{
                    padding: '12px', background: '#1f3326', color: '#fff', border: 'none',
                    borderRadius: '8px', fontSize: '14px', fontWeight: '600', cursor: 'pointer',
                    opacity: isSubmitting ? 0.7 : 1
                }}
            >
                {isSubmitting ? '追加中...' : 'タスクを追加'}
            </button>
        </form>
    );
}
