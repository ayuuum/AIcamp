import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export function getMasterRoadmap() {
  const filePath = path.join(process.cwd(), './MASTER_ROADMAP.md');
  const fileContent = fs.readFileSync(filePath, 'utf8');

  // 簡易的なマークダウンテーブル解析（本番ではもっと堅牢にする）
  const lines = fileContent.split('\n');
  const tableLines = lines.filter(line => line.includes('|') && !line.includes('---'));

  const projects = tableLines.slice(1).map(line => {
    const parts = line.split('|').map(p => p.trim()).filter(p => p !== '');
    return {
      division: parts[0],
      name: parts[1].replace(/\[|\]|\(.*\)/g, ''),
      priority: parts[2],
      rationale: parts[3],
      status: parts[4],
      target: parts[5]
    };
  });

  // 佐々木さんのアドバイスを抽出
  const sasakiAdviceMatch = fileContent.match(/佐々木様.*?:\s*「(.*?)」/);
  const sasakiAdvice = sasakiAdviceMatch ? sasakiAdviceMatch[1] : '';

  return { projects, sasakiAdvice };
}

export function getDirectoryStructure(dirPath: string = '.') {
  const fullPath = path.join(process.cwd(), dirPath);

  if (!fs.existsSync(fullPath)) return [];

  // もしパスがファイルなら、その親ディレクトリを表示する
  const stats = fs.lstatSync(fullPath);
  const targetDir = stats.isDirectory() ? fullPath : path.dirname(fullPath);
  const items = fs.readdirSync(targetDir, { withFileTypes: true });

  return items
    .filter(item => !item.name.startsWith('.') && item.name !== 'node_modules' && item.name !== 'app' && item.name !== 'lib' && item.name !== 'public')
    .map(item => ({
      name: item.name,
      isDirectory: item.isDirectory(),
      path: path.join(path.relative(process.cwd(), targetDir), item.name)
    }));
}

export function getFileContent(relativeFilePath: string) {
  const fullPath = path.join(process.cwd(), relativeFilePath);
  if (fs.existsSync(fullPath) && fs.lstatSync(fullPath).isFile()) {
    return fs.readFileSync(fullPath, 'utf8');
  }
  return null;
}

export function getCompanyInfo() {
  const infoPath = '/Users/ayumu/株式会社Amber/会社基本情報.md';
  const portfolioPath = '/Users/ayumu/株式会社Amber/00_事業ポートフォリオ.md';
  const rankingPath = '/Users/ayumu/株式会社Amber/事業ランキング評価.md';

  const info = fs.existsSync(infoPath) ? fs.readFileSync(infoPath, 'utf8') : '';
  const portfolio = fs.existsSync(portfolioPath) ? fs.readFileSync(portfolioPath, 'utf8') : '';
  const ranking = fs.existsSync(rankingPath) ? fs.readFileSync(rankingPath, 'utf8') : '';

  // 会社名を抽出
  const companyName = info.match(/会社名.*?:\s*(.+)/)?.[1] || '株式会社Amber';
  const ceo = info.match(/代表者.*?:\s*(.+)/)?.[1] || '';
  const address = info.match(/住所.*?:\s*(.+)/)?.[1] || '';

  // 長期ビジョンを抽出
  const vision = portfolio.match(/長期ビジョン\n「(.+?)」/)?.[1] || '';

  // 事業ランキングTOP5を抽出
  const rankingLines = ranking.split('\n').filter(line => line.match(/^\|\s*\*?\*?\d+\*?\*?\s*\|/));
  const topBusinesses = rankingLines.slice(0, 5).map(line => {
    const parts = line.split('|').map(p => p.trim()).filter(p => p !== '');
    return {
      rank: parts[0].replace(/\*/g, ''),
      name: parts[1].replace(/\*/g, ''),
      score: parts[2].replace(/\*/g, ''),
      comment: parts[8] || ''
    };
  });

  return { companyName, ceo, address, vision, topBusinesses };
}

export function getAllTasks() {
  const tasksDir = path.join(process.cwd(), 'units');
  const tasks: Array<{
    id: string;
    task: string;
    priority: string;
    assignee: string;
    dueDate: string;
    status: string;
    project: string;
  }> = [];

  // プロジェクトディレクトリを再帰的に探索
  function findTasks(dir: string) {
    if (!fs.existsSync(dir)) return;

    const items = fs.readdirSync(dir, { withFileTypes: true });
    for (const item of items) {
      const fullPath = path.join(dir, item.name);
      if (item.isDirectory()) {
        findTasks(fullPath);
      } else if (item.name === 'tasks.md') {
        const content = fs.readFileSync(fullPath, 'utf8');
        const projectName = path.basename(path.dirname(fullPath));

        // テーブル行を解析
        const lines = content.split('\n').filter(line => line.match(/^\|\s*[A-Z]+-\d+\s*\|/));
        for (const line of lines) {
          const parts = line.split('|').map(p => p.trim()).filter(p => p !== '');
          if (parts.length >= 6) {
            tasks.push({
              id: parts[0],
              task: parts[1],
              priority: parts[2],
              assignee: parts[3],
              dueDate: parts[4],
              status: parts[5],
              project: projectName
            });
          }
        }
      }
    }
  }

  findTasks(tasksDir);

  // 優先度でソート（P1が最初）
  return tasks.sort((a, b) => {
    const pA = parseInt(a.priority.replace('P', '')) || 9;
    const pB = parseInt(b.priority.replace('P', '')) || 9;
    return pA - pB;
  });
}

export function getDailyReports() {
  const reportsDir = path.join(process.cwd(), 'reports/daily');
  if (!fs.existsSync(reportsDir)) return [];

  const files = fs.readdirSync(reportsDir).filter(f => f.endsWith('.md')).sort().reverse();

  return files.slice(0, 7).map(file => {
    const content = fs.readFileSync(path.join(reportsDir, file), 'utf8');
    const date = file.replace('.md', '');

    // セクションを抽出
    const doneMatch = content.match(/##\s*【したこと】\s*([\s\S]*?)(?=##|---|\*Generated|$)/);
    const todoMatch = content.match(/##\s*【TODO】\s*([\s\S]*?)(?=##|---|\*Generated|$)/);
    const insightMatch = content.match(/##\s*【気付き】\s*([\s\S]*?)(?=##|---|\*Generated|$)/);

    const parseList = (text: string) => {
      if (!text) return [];
      return text.trim().split('\n')
        .filter(line => line.trim().startsWith('-') || line.trim().startsWith('['))
        .map(line => line.replace(/^[-\s\[\]x]+/, '').trim())
        .filter(line => line.length > 0);
    };

    return {
      date,
      done: parseList(doneMatch?.[1] || ''),
      todo: parseList(todoMatch?.[1] || ''),
      insight: parseList(insightMatch?.[1] || ''),
      raw: content
    };
  });
}
