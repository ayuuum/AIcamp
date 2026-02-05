'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './styles.module.css';
import ScrollReveal from './ScrollReveal';
import SubsidySimulator from './SubsidySimulator';
import { CheckCheck, TrendingUp, Cpu, XCircle, ShieldCheck, Users, ArrowRight, Clock, Award, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

export default function AiTrainingLpClient() {
    const [isHeaderVisible, setIsHeaderVisible] = useState(false);
    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            // Show header after scrolling past 300px
            setIsHeaderVisible(window.scrollY > 300);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleFaq = (index: number) => {
        setOpenFaqIndex(openFaqIndex === index ? null : index);
    };

    return (
        <div className={styles.container}>
            {/* Sticky Header */}
            <header className={`${styles.stickyHeader} ${isHeaderVisible ? styles.visible : ''} `}>
                <a href="#" className={styles.stickyLogo}>Amber AI Training</a>
                <a href="#contact" className={styles.stickyButton}>無料相談はこちら</a>
            </header>

            {/* Hero Section */}
            <section className={styles.hero}>
                <div className={styles.heroBgDecoration}></div>
                <div className={styles.heroContent}>
                    <ScrollReveal delay={100}>
                        <div className={styles.badge}>厚労省リスキリング助成金対象</div>
                        <h1 className={styles.heroHeading}>
                            AIを、<br />
                            文房具のように<br />
                            使いこなす組織へ。
                        </h1>
                        <p className={styles.heroSub}>
                            知識ゼロから始める、実務直結型の生成AI研修。<br />
                            <span style={{ color: '#F59E0B', fontWeight: 'bold' }}>先着5社限定 モニターキャンペーン実施中</span>
                        </p>
                        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                            <a href="#contact" className={styles.ctaButton}>
                                まずは無料相談・助成金診断
                            </a>
                        </div>
                    </ScrollReveal>
                </div>
                <div className={styles.heroImage}>
                    <ScrollReveal delay={300}>
                        <div style={{ position: 'relative', width: '100%', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}>
                            <Image
                                src="/hero.png"
                                alt="AI研修のイメージ"
                                width={800}
                                height={600}
                                className="object-cover"
                                style={{ width: '100%', height: 'auto', display: 'block' }}
                            />
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* Problem Section */}
            <section className={`${styles.section} ${styles.sectionGray} `}>
                <ScrollReveal>
                    <h2 className={styles.title}>こんなお悩み、ありませんか？</h2>
                </ScrollReveal>
                <div className={styles.problemGrid}>
                    {['導入したが活用されない', 'セキュリティが不安', '効果が見えない'].map((title, i) => (
                        <ScrollReveal key={i} delay={i * 100}>
                            <div className={styles.problemCard}>
                                <span className={styles.problemIcon}>{['🤔', '😰', '📉'][i]}</span>
                                <h3>{title}</h3>
                                <p>
                                    {i === 0 && 'ChatGPTを契約したが、現場社員がどう使えばいいか分からず、放置されている。'}
                                    {i === 1 && '情報漏洩が怖くて、社内での利用を禁止または厳しく制限してしまっている。'}
                                    {i === 2 && '「なんかすごそう」で終わってしまい、具体的な業務効率化や利益につながっていない。'}
                                </p>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </section>

            {/* BEFORE / AFTER Section (NEW) */}
            <section className={styles.section}>
                <ScrollReveal>
                    <h2 className={styles.title}>導入後の劇的ビフォーアフター</h2>
                </ScrollReveal>
                <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>

                    {/* Case 1 */}
                    <ScrollReveal delay={100}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', padding: '2rem', border: '1px solid #E2E8F0', borderRadius: '16px', background: 'white' }}>
                            <div style={{ flex: 1, textAlign: 'center' }}>
                                <div style={{ color: '#64748B', fontWeight: 'bold', marginBottom: '0.5rem' }}>BEFORE</div>
                                <div style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>議事録作成に<br /><span style={{ fontSize: '2rem', color: '#64748B' }}>60</span>分</div>
                            </div>
                            <div style={{ color: '#94A3B8' }}><ArrowRight size={40} /></div>
                            <div style={{ flex: 1, textAlign: 'center', color: '#0F172A' }}>
                                <div style={{ color: '#F59E0B', fontWeight: 'bold', marginBottom: '0.5rem' }}>AFTER</div>
                                <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>AI要約で<br /><span style={{ fontSize: '3rem', color: '#F59E0B' }}>10</span>分に短縮</div>
                            </div>
                        </div>
                    </ScrollReveal>

                    {/* Case 2 */}
                    <ScrollReveal delay={200}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', padding: '2rem', border: '1px solid #E2E8F0', borderRadius: '16px', background: 'white' }}>
                            <div style={{ flex: 1, textAlign: 'center' }}>
                                <div style={{ color: '#64748B', fontWeight: 'bold', marginBottom: '0.5rem' }}>BEFORE</div>
                                <div style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>メルマガ作成に<br /><span style={{ fontSize: '2rem', color: '#64748B' }}>3</span>時間</div>
                            </div>
                            <div style={{ color: '#94A3B8' }}><ArrowRight size={40} /></div>
                            <div style={{ flex: 1, textAlign: 'center', color: '#0F172A' }}>
                                <div style={{ color: '#F59E0B', fontWeight: 'bold', marginBottom: '0.5rem' }}>AFTER</div>
                                <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>構成出しアシストで<br /><span style={{ fontSize: '3rem', color: '#F59E0B' }}>30</span>分</div>
                            </div>
                        </div>
                    </ScrollReveal>

                </div>
            </section>

            {/* Features Section */}
            <section className={`${styles.section} ${styles.sectionGray} `}>
                <ScrollReveal>
                    <h2 className={styles.title}>選ばれる3つの理由</h2>
                </ScrollReveal>

                {['実務直結のカスタマイズ研修', '助成金申請フルサポート', '継続的な定着支援'].map((title, i) => (
                    <ScrollReveal key={i}>
                        <div className={styles.featureItem} style={{ marginBottom: i === 2 ? 0 : '6rem' }}>
                            <div className={styles.featureText}>
                                <div className={styles.featureNumber}>0{i + 1}</div>
                                <h3 className={styles.featureTitle}>{title}</h3>
                                <p>
                                    {i === 0 && '「AIとは何か」といった概論は最小限に。貴社の実際の業務データ（ダミー）を使い、「明日から使えるプロンプト」をその場で作るワークショップ形式です。'}
                                    {i === 1 && '「人材開発支援助成金」の対象となるプログラムです。面倒な計画届の作成から、実施後の報告まで、提携社労士と共にワンストップで支援し、導入コストを大幅に削減します。'}
                                    {i === 2 && '研修はゴールではありません。Slack/TeamsでのQ&A対応や、月1回のフォローアップ勉強会を通じ、現場での「使いこなし」が定着するまで伴走します。'}
                                </p>
                            </div>
                            <div className={styles.featureImage}>
                                {/* Feature Image Placeholder - can be polished later */}
                                <div style={{ height: '300px', background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>
                                    Image Area 0{i + 1}
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>
                ))}
            </section>

            {/* Instructor Section (NEW) */}
            <section className={styles.section}>
                <ScrollReveal>
                    <h2 className={styles.title}>講師プロフィール</h2>
                </ScrollReveal>
                <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
                    <ScrollReveal>
                        <div style={{ width: '120px', height: '120px', borderRadius: '50%', background: '#CBD5E1', margin: '0 auto 2rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Users size={40} color="white" />
                        </div>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>佐藤 航平（仮）</h3>
                        <p style={{ color: '#14B8A6', fontWeight: 'bold', marginBottom: '1.5rem' }}>AI導入コンサルタント / フルスタックエンジニア</p>
                        <p style={{ lineHeight: '1.8', color: '#475569' }}>
                            大手IT企業にて大規模システム開発に従事した後、独立。
                            生成AI黎明期より、社内業務への導入実験を繰り返し、独自のプロンプトエンジニアリング・メソッドを確立。
                            「エンジニアではない普通のビジネスパーソンが使いこなせる」ことに主眼を置いた、分かりやすい指導に定評がある。
                        </p>
                    </ScrollReveal>
                </div>
            </section>

            {/* Subsidy Section */}
            <section className={`${styles.section} ${styles.sectionGray} `}>
                <ScrollReveal>
                    <h2 className={styles.title}>導入コストシミュレーション</h2>
                </ScrollReveal>
                <ScrollReveal delay={100}>
                    <SubsidySimulator />
                </ScrollReveal>
            </section>

            {/* FAQ Section */}
            <section className={styles.section}>
                <ScrollReveal>
                    <h2 className={styles.title}>よくあるご質問</h2>
                </ScrollReveal>
                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    {[
                        { q: 'AIの知識が全くない社員ばかりですが、大丈夫ですか？', a: 'はい、全く問題ありません。むしろ「知識ゼロ」の方を対象としたカリキュラム設計になっています。専門用語を使わず、身近な業務（メール作成や要約など）からスタートしますので、パソコン操作ができる方であればどなたでも習得可能です。' },
                        { q: '助成金の受給条件を満たしているか分かりません。', a: '無料相談にて、簡単なヒアリング（雇用保険の加入状況など）をさせていただければ、受給可能性をその場で診断いたします。もし要件を満たさない場合でも、ご予算に合わせたプランをご提案可能です。' },
                        { q: '研修期間はどのくらいですか？', a: '標準的な「リスキリングコース」の場合、1回3時間の講義を全5回、約1〜2ヶ月かけて実施するのが目安です。貴社のスケジュールに合わせて柔軟に日程を調整いたします（例：週1回開催、2週に1回開催など）。' },
                        { q: 'テレワーク中の社員も参加できますか？', a: 'はい、可能です。ZoomやGoogle Meetを用いた完全オンライン開催に対応しています。また、アーカイブ動画の共有も行いますので、当日欠席された方も後から受講していただけます。' },
                    ].map((item, i) => (
                        <ScrollReveal key={i} delay={i * 50}>
                            <div className={styles.faqItem}>
                                <div className={styles.faqQuestion} onClick={() => toggleFaq(i)}>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <HelpCircle size={20} color="#14B8A6" />
                                        {item.q}
                                    </span>
                                    {openFaqIndex === i ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                </div>
                                {openFaqIndex === i && (
                                    <div className={styles.faqAnswer}>
                                        {item.a}
                                    </div>
                                )}
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className={styles.section}>
                <ScrollReveal>
                    <div style={{ background: '#0F172A', color: 'white', borderRadius: '24px', padding: '60px 20px', textAlign: 'center' }}>
                        <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'white' }}>まずは無料相談から</h2>
                        <p style={{ marginBottom: '2rem', color: '#CBD5E1' }}>
                            「自社で助成金は使える？」「どんなカリキュラムが良い？」<br />
                            些細な疑問でも構いません。お気軽にご相談ください。
                        </p>
                        <a href="https://docs.google.com/forms/..." className={styles.ctaButton}>
                            お問い合わせ・資料請求
                        </a>
                    </div>
                </ScrollReveal>
            </section>

            <footer style={{ textAlign: 'center', padding: '40px', color: '#64748b', fontSize: '0.875rem' }}>
                © 2026 Amber Inc. All rights reserved.
            </footer>
        </div>
    );
}
