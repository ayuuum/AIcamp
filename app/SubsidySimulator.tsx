'use client';

import { useState } from 'react';
import styles from './styles.module.css';
import { Calculator, RefreshCcw } from 'lucide-react';

export default function SubsidySimulator() {
    const [participants, setParticipants] = useState(5);
    const [costPerPerson, setCostPerPerson] = useState(50000); // 5万円/人

    // Reskilling Support Course: 75% subsidy
    const SUBSIDY_RATE = 0.75;

    const totalCost = participants * costPerPerson;
    const subsidyAmount = totalCost * SUBSIDY_RATE;
    const realCost = totalCost - subsidyAmount;

    return (
        <div className={styles.calcBox}>
            <h3>人材開発支援助成金 シミュレーター</h3>
            <p style={{ marginBottom: '2rem' }}>
                研修費用の最大<span style={{ color: '#EA580C', fontWeight: 'bold', fontSize: '1.2em' }}>75%</span>が助成されます
            </p>

            <div style={{ textAlign: 'left', background: '#F8FAFC', padding: '1.5rem', borderRadius: '12px', marginBottom: '2rem' }}>
                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem', color: '#475569' }}>
                        受講人数: <span style={{ fontSize: '1.25rem', color: '#0F172A' }}>{participants}</span>名
                    </label>
                    <input
                        type="range"
                        min="1"
                        max="50"
                        value={participants}
                        onChange={(e) => setParticipants(parseInt(e.target.value))}
                        style={{ width: '100%', cursor: 'pointer', accentColor: '#14B8A6' }}
                    />
                </div>

                <div>
                    <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem', color: '#475569' }}>
                        研修単価（想定）: ¥{costPerPerson.toLocaleString()} / 人
                    </label>
                    <select
                        value={costPerPerson}
                        onChange={(e) => setCostPerPerson(parseInt(e.target.value))}
                        style={{
                            width: '100%',
                            padding: '0.5rem',
                            borderRadius: '6px',
                            border: '1px solid #CBD5E1',
                            fontSize: '1rem'
                        }}
                    >
                        <option value={30000}>30,000円（ライトコース）</option>
                        <option value={50000}>50,000円（スタンダード）</option>
                        <option value={100000}>100,000円（集中合宿・ハンズオン）</option>
                    </select>
                </div>
            </div>

            <div style={{ textAlign: 'center', position: 'relative' }}>
                <p style={{ color: '#64748B', fontSize: '0.875rem', marginBottom: '0.5rem' }}>総額費用: ¥{totalCost.toLocaleString()}</p>

                <div className={styles.priceStrike}>¥{totalCost.toLocaleString()}</div>
                <div style={{ color: '#14B8A6', fontWeight: 'bold', margin: '0.5rem 0' }}>
                    <Calculator size={16} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} />
                    助成金活用で -¥{subsidyAmount.toLocaleString()}
                </div>

                <div style={{ borderTop: '2px dashed #E2E8F0', margin: '1rem 0' }}></div>

                <p style={{ fontWeight: 'bold', color: '#475569' }}>実質負担額</p>
                <div className={styles.realPrice}>
                    {realCost.toLocaleString()}<span>円</span>
                </div>

                <p style={{ fontSize: '0.75rem', color: '#94A3B8', marginTop: '1rem', lineHeight: '1.4' }}>
                    ※ 「人材開発支援助成金（リスキリング支援コース）」を活用した場合の試算です。<br />
                    ※ 助成率や要件は、企業の規模や雇用形態により変動する場合があります。<br />
                    ※ 正式な受給額を保証するものではありません。詳細は無料相談にてご確認ください。
                </p>
            </div>
        </div>
    );
}
