'use server';

import fs from 'fs';
import path from 'path';

export async function addTask(formData: FormData) {
    const taskName = formData.get('task') as string;
    const priority = formData.get('priority') as string;
    const assignee = formData.get('assignee') as string;
    const dueDate = formData.get('dueDate') as string;
    const project = formData.get('project') as string;

    if (!taskName || !project) {
        return { success: false, error: 'タスク名とプロジェクトは必須です' };
    }

    // プロジェクトのtasks.mdパスを構築
    const tasksPath = path.join(process.cwd(), 'units/saas-division/projects', project, 'tasks.md');

    // ファイルが存在しない場合は作成
    if (!fs.existsSync(tasksPath)) {
        const template = `# ${project} タスク一覧

## 進行中

| ID | タスク | 優先度 | 担当 | 期日 | ステータス |
|----|--------|--------|------|------|-----------|

## 完了

| ID | タスク | 完了日 |
|----|--------|--------|
`;
        fs.mkdirSync(path.dirname(tasksPath), { recursive: true });
        fs.writeFileSync(tasksPath, template);
    }

    // 現在のファイル内容を読み込み
    let content = fs.readFileSync(tasksPath, 'utf8');

    // 新しいタスクIDを生成
    const prefix = project.substring(0, 2).toUpperCase();
    const existingIds = content.match(new RegExp(`${prefix}-\\d+`, 'g')) || [];
    const maxId = existingIds.length > 0
        ? Math.max(...existingIds.map(id => parseInt(id.split('-')[1])))
        : 0;
    const newId = `${prefix}-${String(maxId + 1).padStart(3, '0')}`;

    // 新しい行を作成
    const newRow = `| ${newId} | ${taskName} | ${priority || 'P2'} | ${assignee || '松井'} | ${dueDate || '-'} | 未着手 |`;

    // テーブルに追加（「## 進行中」セクションのテーブル末尾に）
    const tableEndPattern = /(\| ID \| タスク \| 優先度.*?\n\|[-|]+\n)([\s\S]*?)(\n\n## 完了|\n---)/;
    const match = content.match(tableEndPattern);

    if (match) {
        const tableStart = match[1];
        const existingRows = match[2].trim();
        const afterTable = match[3];

        const newRows = existingRows
            ? `${existingRows}\n${newRow}`
            : newRow;

        content = content.replace(tableEndPattern, `${tableStart}${newRows}\n${afterTable}`);
    }

    fs.writeFileSync(tasksPath, content);

    return { success: true, taskId: newId };
}

export async function completeTask(taskId: string, project: string) {
    const tasksPath = path.join(process.cwd(), 'units/saas-division/projects', project, 'tasks.md');

    if (!fs.existsSync(tasksPath)) {
        return { success: false, error: 'タスクファイルが見つかりません' };
    }

    let content = fs.readFileSync(tasksPath, 'utf8');

    // タスク行を見つけて「完了」に更新
    const taskPattern = new RegExp(`(\\| ${taskId} \\|[^|]+\\|[^|]+\\|[^|]+\\|[^|]+\\|)([^|]+)(\\|)`);
    content = content.replace(taskPattern, '$1 完了 $3');

    fs.writeFileSync(tasksPath, content);

    return { success: true };
}
