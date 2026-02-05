import { Metadata } from 'next';
import AiTrainingLpClient from './AiTrainingLpClient';

export const metadata: Metadata = {
  title: 'AI研修ならAmber | 助成金で最大75%OFFの実践型生成AI研修',
  description: '【先着5社限定モニター募集中】知識ゼロからでも安心。現場ですぐに使えるスキルが身につく、実務直結型の生成AIリスキリング研修。人材開発支援助成金の活用でコストを大幅に削減可能です。',
  openGraph: {
    title: 'AI研修ならAmber | 現場で使える「実践力」を。',
    description: '助成金活用で最大75%OFF。知識より「使いこなし」を重視した、新しい生成AI研修プログラム。',
    images: ['/lp/ai-training/hero.png'],
  },
};

export default function AiTrainingLp() {
  return <AiTrainingLpClient />;
}
